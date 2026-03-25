import { format, parseISO } from "date-fns";

/** Sunucu `.env` varsayılanlarıyla aynı (Türkiye saati). */
export const APPOINTMENT_DURATION_HOURS = 2;
export const APPOINTMENT_SLOT_STEP_MINUTES = 30;

const WEEKDAY_START_H = 9;
const WEEKDAY_END_H = 18;
const SATURDAY_START_H = 10;
const SATURDAY_END_H = 14;

export function turkeyDowFromYmd(y: number, m: number, d: number): number {
  const s = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T12:00:00+03:00`;
  const short = new Date(s).toLocaleDateString("en-US", {
    timeZone: "Europe/Istanbul",
    weekday: "short",
  });
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[short] ?? 0;
}

export function ymdFromLocalDate(date: Date): { y: number; m: number; d: number } {
  return {
    y: Number(format(date, "yyyy")),
    m: Number(format(date, "MM")),
    d: Number(format(date, "dd")),
  };
}

export function slotIsoTurkey(
  y: number,
  m: number,
  d: number,
  hh: number,
  mm: number,
): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00+03:00`;
}

function dayWindowMinutes(dow: number): { startMin: number; endMin: number } | null {
  if (dow === 0) return null;
  if (dow === 6) {
    return {
      startMin: SATURDAY_START_H * 60,
      endMin: SATURDAY_END_H * 60,
    };
  }
  return {
    startMin: WEEKDAY_START_H * 60,
    endMin: WEEKDAY_END_H * 60,
  };
}

export function generateSlotStartsForDate(date: Date): string[] {
  const { y, m, d } = ymdFromLocalDate(date);
  const dow = turkeyDowFromYmd(y, m, d);
  const win = dayWindowMinutes(dow);
  if (!win) return [];

  const durationMin = APPOINTMENT_DURATION_HOURS * 60;
  const slots: string[] = [];
  for (let t = win.startMin; t + durationMin <= win.endMin; t += APPOINTMENT_SLOT_STEP_MINUTES) {
    const hh = Math.floor(t / 60);
    const mm = t % 60;
    slots.push(slotIsoTurkey(y, m, d, hh, mm));
  }
  return slots;
}

export function parseOdooDateTime(s: string): Date {
  const normalized = s.includes("T") ? s.trim() : s.trim().replace(" ", "T");
  if (!/[zZ]|[+-]\d{2}:?\d{2}$/.test(normalized)) {
    return new Date(`${normalized}+03:00`);
  }
  return new Date(normalized);
}

export function slotOverlapsBusy(
  slotStartIso: string,
  busy: { start: string; stop: string }[],
): boolean {
  const a = parseISO(slotStartIso).getTime();
  const b = a + APPOINTMENT_DURATION_HOURS * 60 * 60 * 1000;
  for (const row of busy) {
    const bs = parseOdooDateTime(row.start).getTime();
    const be = parseOdooDateTime(row.stop).getTime();
    if (bs < b && be > a) return true;
  }
  return false;
}

function getTurkeyYmdNow(): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const pick = (t: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { y: pick("year"), m: pick("month"), d: pick("day") };
}

export function filterPastSlots(slotIsos: string[]): string[] {
  const now = Date.now();
  return slotIsos.filter((iso) => parseISO(iso).getTime() > now - 60 * 1000);
}

export function isSelectableCalendarDate(date: Date): boolean {
  const { y, m, d } = ymdFromLocalDate(date);
  const dow = turkeyDowFromYmd(y, m, d);
  if (dow === 0) return false;
  const dayStart = parseISO(slotIsoTurkey(y, m, d, 0, 0)).getTime();
  const t = getTurkeyYmdNow();
  const todayStart = parseISO(slotIsoTurkey(t.y, t.m, t.d, 0, 0)).getTime();
  return dayStart >= todayStart;
}

export function formatSlotRangeLabel(slotStartIso: string): string {
  const start = parseISO(slotStartIso);
  const end = new Date(start.getTime() + APPOINTMENT_DURATION_HOURS * 60 * 60 * 1000);
  const opts: Intl.DateTimeFormatOptions = {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const a = start.toLocaleTimeString("tr-TR", opts);
  const b = end.toLocaleTimeString("tr-TR", opts);
  return `${a} – ${b}`;
}
