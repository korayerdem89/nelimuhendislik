import { Hono } from "hono";
import xmlrpc from "xmlrpc";

interface ContactFormBody {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

function getOdooConfig() {
  const host = process.env.ODOO_HOST || "localhost";
  const port = Number(process.env.ODOO_PORT) || 8069;
  const db = process.env.ODOO_DB || "";
  const username = process.env.ODOO_USERNAME || "";
  const password = process.env.ODOO_PASSWORD || "";

  return { host, port, db, username, password };
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

function odooCreateLead(
  config: ReturnType<typeof getOdooConfig>,
  uid: number,
  leadData: Record<string, string>,
): Promise<number> {
  const client = xmlrpc.createClient({
    host: config.host,
    port: config.port,
    path: "/xmlrpc/2/object",
  });

  return new Promise((resolve, reject) => {
    client.methodCall(
      "execute_kw",
      [config.db, uid, config.password, "crm.lead", "create", [leadData]],
      (error: object, recordId: number) => {
        if (error) return reject(new Error("Failed to create CRM lead"));
        resolve(recordId);
      },
    );
  });
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

export default odooRoutes;
