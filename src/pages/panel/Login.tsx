import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/panel", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    api
      .get<{ needsSetup: boolean }>("/api/auth/check")
      .then((res) => setIsSetup(res.needsSetup));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      } else {
        await login(username, password);
        toast.success("Giriş başarılı!");
        navigate("/panel", { replace: true });
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Giriş başarısız",
      );
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
              {isSetup
                ? "İlk admin kullanıcınızı oluşturun"
                : "Devam etmek için giriş yapın"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Kullanıcı Adı
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                placeholder="admin"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Şifre
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••"
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
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
