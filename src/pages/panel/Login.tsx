import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [checkLoading, setCheckLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/panel", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setCheckLoading(true);
    api
      .get<{ needsSetup: boolean }>("/api/auth/check")
      .then((res) => setIsSetup(res.needsSetup))
      .catch((err) => {
        const message =
          err instanceof Error
            ? err.message
            : "Sunucu durumu kontrol edilemedi.";
        setError(message);
      })
      .finally(() => setCheckLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isSetup) {
        const res = await api.post<{ token: string; username: string }>(
          "/api/auth/setup",
          { username, password },
        );
        localStorage.setItem("admin_token", res.token);
        localStorage.setItem("admin_username", res.username);
        toast.success("Admin hesabı oluşturuldu!");
        window.location.href = "/panel";
        return;
      }

      await login(username, password);
      toast.success("Giriş başarılı!");
      window.location.href = "/panel";
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Giriş başarısız oldu.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <img
              src="/site-logo.webp"
              alt="Neli"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h1 className="text-xl font-semibold text-gray-900">
              {isSetup ? "Admin Hesabı Oluştur" : "Yönetim Paneli"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {checkLoading
                ? "Bağlantı kontrol ediliyor..."
                : isSetup
                  ? "İlk admin kullanıcınızı oluşturun"
                  : "Devam etmek için giriş yapın"}
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Kullanıcı Adı
              </label>
              <Input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError(null);
                }}
                required
                autoFocus
                placeholder="admin"
                disabled={checkLoading}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Şifre
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                required
                placeholder="••••••"
                minLength={6}
                disabled={checkLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading || checkLoading}
            >
              {loading
                ? "Bekleyin..."
                : isSetup
                  ? "Hesap Oluştur"
                  : "Giriş Yap"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
