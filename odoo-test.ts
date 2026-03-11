import xmlrpc from "xmlrpc";

// 1. KENDİ BİLGİLERİNİ GİR
const host = "localhost";
const port = 8069;
const db = "testdb"; // Örn: odoo_test
const username = "info@neli.tr";
const password = "Neli5921";

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
  (error: object, uid: number) => {
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
      (err: object, recordId: number) => {
        if (err) return console.error("Kayıt eklenemedi:", err);

        console.log("BAŞARILI! Odoo CRM'e kayıt düştü. Kayıt ID:", recordId);
      },
    );
  },
);
