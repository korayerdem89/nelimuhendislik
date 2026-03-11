import * as xmlrpc from "xmlrpc";

// 1. KENDİ BİLGİLERİNİ GİR
const host = "localhost";
const port = 8069;
const db = "veritabani_adin"; // Örn: odoo_test
const username = "senin_odoo_mailin@ornek.com";
const password = "senin_odoo_sifren";

const commonClient = xmlrpc.createClient({
  host,
  port,
  path: "/xmlrpc/2/common",
});
const modelsClient = xmlrpc.createClient({
  host,
  port,
  path: "/xmlrpc/2/object",
});

// 2. GİRİŞ YAP VE CRM'E KAYIT EKLE
commonClient.methodCall(
  "authenticate",
  [db, username, password, {}],
  (error: any, uid: number) => {
    if (error || !uid) {
      return console.error("Giriş hatası! Bilgilerini kontrol et:", error);
    }

    console.log("Bağlandı! Kullanıcı ID:", uid);

    const yeniMesaj = [
      {
        name: "TS Web Sitesi İletişim Formu (TEST)",
        contact_name: "Ahmet Yılmaz",
        email_from: "ahmet@deneme.com",
        description: "Bu mesaj TypeScript & Node.js üzerinden geldi!",
      },
    ];

    modelsClient.methodCall(
      "execute_kw",
      [db, uid, password, "crm.lead", "create", yeniMesaj],
      (err: any, recordId: number) => {
        if (err) return console.error("Kayıt eklenemedi:", err);

        console.log("BAŞARILI! Odoo CRM'e kayıt düştü. Kayıt ID:", recordId);
      },
    );
  },
);
