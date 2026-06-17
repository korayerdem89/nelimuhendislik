export const SITE_ADMIN_USERNAME = "admin";
export const SITE_ADMIN_PASSWORD = "Neli5921";

export function isSiteAdminLogin(username: string, password: string): boolean {
  return (
    username.trim() === SITE_ADMIN_USERNAME &&
    password === SITE_ADMIN_PASSWORD
  );
}
