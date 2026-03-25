import { Hono } from "hono";
import xmlrpc from "xmlrpc";

const APPOINTMENT_TZ = "Europe/Istanbul";

interface ContactFormBody {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface AppointmentBody {
  start: string;
  name: string;
  email: string;
  phone?: string;
  note?: string;
}

function getOdooConfig() {
  const host = process.env.ODOO_HOST || "localhost";
  const port = Number(process.env.ODOO_PORT) || 8069;
  const db = process.env.ODOO_DB || "";
  const username = process.env.ODOO_USERNAME || "";
  const password = process.env.ODOO_PASSWORD || "";

  return { host, port, db, username, password };
}

function getAppointmentDurationHours(): number {
  const n = Number(process.env.APPOINTMENT_DURATION_HOURS);
  return Number.isFinite(n) && n > 0 ? n : 2;
}

function getAppointmentHoursConfig() {
  return {
    weekdayStart: Number(process.env.APPOINTMENT_WEEKDAY_START) || 9,
    weekdayEnd: Number(process.env.APPOINTMENT_WEEKDAY_END) || 18,
    saturdayStart: Number(process.env.APPOINTMENT_SATURDAY_START) || 10,
    saturdayEnd: Number(process.env.APPOINTMENT_SATURDAY_END) || 14,
  };
}

/** Odoo datetime string in Europe/Istanbul wall time (naive local). */
function formatOdooDateTimeInIstanbul(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: APPOINTMENT_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const pick = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? "00";
  const y = pick("year");
  const m = pick("month");
  const d = pick("day");
  const h = pick("hour");
  const min = pick("minute");
  const s = pick("second");
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

function parseIsoToDate(iso: string): Date | null {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Istanbul wall-clock: weekday 0 = Sunday */
function getIstanbulWallParts(date: Date): {
  y: number;
  m: number;
  d: number;
  hour: number;
  minute: number;
  dow: number;
} {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: APPOINTMENT_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(date);

  const pick = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? "";
  const y = Number(pick("year"));
  const m = Number(pick("month"));
  const d = Number(pick("day"));
  const hour = Number(pick("hour"));
  const minute = Number(pick("minute"));
  const wd = pick("weekday");
  const dowMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const dow = dowMap[wd] ?? 0;
  return { y, m, d, hour, minute, dow };
}

function getDayWindowMinutes(dow: number, cfg: ReturnType<typeof getAppointmentHoursConfig>): {
  startMin: number;
  endMin: number;
} | null {
  if (dow === 0) return null;
  if (dow === 6) {
    return {
      startMin: cfg.saturdayStart * 60,
      endMin: cfg.saturdayEnd * 60,
    };
  }
  return {
    startMin: cfg.weekdayStart * 60,
    endMin: cfg.weekdayEnd * 60,
  };
}

function isWithinBusinessHours(
  start: Date,
  stop: Date,
  cfg: ReturnType<typeof getAppointmentHoursConfig>,
): boolean {
  const s = getIstanbulWallParts(start);
  const e = getIstanbulWallParts(stop);
  if (s.y !== e.y || s.m !== e.m || s.d !== e.d) return false;

  const window = getDayWindowMinutes(s.dow, cfg);
  if (!window) return false;

  const startMin = s.hour * 60 + s.minute;
  const endMin = e.hour * 60 + e.minute;
  if (startMin < window.startMin || endMin > window.endMin) return false;
  return true;
}

function odooAuthenticate(config: ReturnType<typeof getOdooConfig>): Promise<number> {
  const client = xmlrpc.createClient({
    host: config.host,
    port: config.port,
    path: "/xmlrpc/2/common",
  });

  return new Promise((resolve, reject) => {
    client.methodCall(
      "authenticate",
      [config.db, config.username, config.password, {}],
      (error: object, uid: number) => {
        if (error) return reject(new Error("Odoo authentication failed"));
        if (!uid) return reject(new Error("Invalid Odoo credentials"));
        resolve(uid);
      },
    );
  });
}

function odooExecuteKw<T>(
  config: ReturnType<typeof getOdooConfig>,
  uid: number,
  model: string,
  method: string,
  args: unknown[],
  kwargs: Record<string, unknown> = {},
): Promise<T> {
  const client = xmlrpc.createClient({
    host: config.host,
    port: config.port,
    path: "/xmlrpc/2/object",
  });

  return new Promise((resolve, reject) => {
    client.methodCall(
      "execute_kw",
      [config.db, uid, config.password, model, method, args, kwargs],
      (error: unknown, value: T) => {
        if (error) {
          const msg =
            typeof error === "object" && error !== null && "faultString" in error
              ? String((error as { faultString: string }).faultString)
              : String(error);
          return reject(new Error(msg));
        }
        resolve(value);
      },
    );
  });
}

function odooCreateLead(
  config: ReturnType<typeof getOdooConfig>,
  uid: number,
  leadData: Record<string, string>,
): Promise<number> {
  return odooExecuteKw<number>(config, uid, "crm.lead", "create", [leadData]);
}

function getOrganizerUserId(uid: number): number {
  const raw = process.env.ODOO_APPOINTMENT_USER_ID?.trim();
  if (raw) {
    const n = Number(raw);
    if (Number.isInteger(n) && n > 0) return n;
  }
  return uid;
}

function overlapDomain(
  organizerId: number,
  startStr: string,
  stopStr: string,
): unknown[] {
  return [
    "&",
    "&",
    "&",
    ["user_id", "=", organizerId],
    ["start", "<", stopStr],
    ["stop", ">", startStr],
  ];
}

const odooRoutes = new Hono();

odooRoutes.post("/contact", async (c) => {
  const config = getOdooConfig();

  if (!config.db || !config.username || !config.password) {
    return c.json({ error: "Odoo configuration is incomplete" }, 500);
  }

  let body: ContactFormBody;
  try {
    body = await c.req.json<ContactFormBody>();
  } catch {
    return c.json({ error: "Invalid request body" }, 400);
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return c.json({ error: "Name, email, and message are required" }, 400);
  }

  const leadData: Record<string, string> = {
    name: `Web İletişim Formu - ${body.subject?.trim() || "Yeni Mesaj"}`,
    contact_name: body.name.trim(),
    email_from: body.email.trim(),
    phone: body.phone?.trim() || "",
    description: body.message.trim(),
  };

  try {
    const uid = await odooAuthenticate(config);
    const recordId = await odooCreateLead(config, uid, leadData);

    return c.json({ success: true, recordId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Odoo connection failed";
    console.error("[Odoo CRM Error]", message);
    return c.json({ error: message }, 502);
  }
});

odooRoutes.get("/appointment/availability", async (c) => {
  const config = getOdooConfig();

  if (!config.db || !config.username || !config.password) {
    return c.json({ error: "Odoo configuration is incomplete" }, 500);
  }

  const fromQ = c.req.query("from")?.trim();
  const toQ = c.req.query("to")?.trim();
  if (!fromQ || !toQ) {
    return c.json({ error: "from ve to sorgu parametreleri gerekli (YYYY-MM-DD)" }, 400);
  }

  const fromDate = parseIsoToDate(fromQ.includes("T") ? fromQ : `${fromQ}T00:00:00+03:00`);
  const toDate = parseIsoToDate(toQ.includes("T") ? toQ : `${toQ}T23:59:59+03:00`);
  if (!fromDate || !toDate || fromDate >= toDate) {
    return c.json({ error: "Geçersiz tarih aralığı" }, 400);
  }

  const rangeStartStr = formatOdooDateTimeInIstanbul(fromDate);
  const rangeEndStr = formatOdooDateTimeInIstanbul(toDate);

  try {
    const uid = await odooAuthenticate(config);
    const organizerId = getOrganizerUserId(uid);

    const domain: unknown[] = [
      "&",
      "&",
      ["user_id", "=", organizerId],
      ["start", "<", rangeEndStr],
      ["stop", ">", rangeStartStr],
    ];

    const records = await odooExecuteKw<{ start: string; stop: string }[]>(
      config,
      uid,
      "calendar.event",
      "search_read",
      [domain, ["start", "stop"]],
      { limit: 500 },
    );

    const busy = (records || []).map((r) => ({
      start: r.start,
      stop: r.stop,
    }));

    return c.json({ busy });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Odoo connection failed";
    console.error("[Odoo appointment availability]", message);
    return c.json({ error: message }, 502);
  }
});

odooRoutes.post("/appointment", async (c) => {
  const config = getOdooConfig();

  if (!config.db || !config.username || !config.password) {
    return c.json({ error: "Odoo configuration is incomplete" }, 500);
  }

  let body: AppointmentBody;
  try {
    body = await c.req.json<AppointmentBody>();
  } catch {
    return c.json({ error: "Invalid request body" }, 400);
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.start?.trim()) {
    return c.json({ error: "Ad, e-posta ve başlangıç zamanı zorunludur" }, 400);
  }

  const start = parseIsoToDate(body.start.trim());
  if (!start) {
    return c.json({ error: "Geçersiz başlangıç tarihi" }, 400);
  }

  const durationH = getAppointmentDurationHours();
  const stop = new Date(start.getTime() + durationH * 60 * 60 * 1000);

  const hoursCfg = getAppointmentHoursConfig();
  if (!isWithinBusinessHours(start, stop, hoursCfg)) {
    return c.json(
      {
        error:
          "Seçilen saat çalışma saatleri dışında veya randevu süresi gün sonunu aşıyor.",
      },
      400,
    );
  }

  const startStr = formatOdooDateTimeInIstanbul(start);
  const stopStr = formatOdooDateTimeInIstanbul(stop);

  const descLines = [
    `Web randevu talebi`,
    `E-posta: ${body.email.trim()}`,
    body.phone?.trim() ? `Telefon: ${body.phone.trim()}` : "",
    body.note?.trim() ? `Not: ${body.note.trim()}` : "",
  ].filter(Boolean);

  try {
    const uid = await odooAuthenticate(config);
    const organizerId = getOrganizerUserId(uid);

    const existing = await odooExecuteKw<number[]>(config, uid, "calendar.event", "search", [
      overlapDomain(organizerId, startStr, stopStr),
      { limit: 1 },
    ]);

    if (existing.length > 0) {
      return c.json(
        { error: "Bu saat aralığı dolu. Lütfen başka bir zaman seçin." },
        409,
      );
    }

    const eventVals: Record<string, unknown> = {
      name: `Randevu: ${body.name.trim()}`,
      start: startStr,
      stop: stopStr,
      description: descLines.join("\n"),
      allday: false,
      user_id: organizerId,
    };

    const recordId = await odooExecuteKw<number>(
      config,
      uid,
      "calendar.event",
      "create",
      [eventVals],
    );

    return c.json({ success: true, recordId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Odoo connection failed";
    console.error("[Odoo appointment create]", message);
    return c.json({ error: message }, 502);
  }
});

export default odooRoutes;
