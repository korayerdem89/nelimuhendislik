import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, FileText, GraduationCap, Send } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import PageHero from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CareerFormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
  cvUrl: string;
}

const initialFormData: CareerFormData = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  message: "",
  cvUrl: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\-\s()]{10,20}$/;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? "";

export default function Career() {
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-120px" });
  const [formData, setFormData] = useState<CareerFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const updateField = <K extends keyof CareerFormData>(
    key: K,
    value: CareerFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedPosition = formData.position.trim();
    const trimmedMessage = formData.message.trim();
    const trimmedCvUrl = formData.cvUrl.trim();

    if (!trimmedName || trimmedName.length < 3) {
      toast.error("Lütfen geçerli bir ad soyad girin.");
      return false;
    }

    if (!emailPattern.test(trimmedEmail)) {
      toast.error("Lütfen geçerli bir e-posta adresi girin.");
      return false;
    }

    if (!phonePattern.test(trimmedPhone)) {
      toast.error("Lütfen geçerli bir telefon numarası girin.");
      return false;
    }

    if (!trimmedPosition) {
      toast.error("Başvurduğunuz pozisyon bilgisini girin.");
      return false;
    }

    if (!trimmedMessage || trimmedMessage.length < 20) {
      toast.error("Ön yazı en az 20 karakter olmalıdır.");
      return false;
    }

    if (trimmedCvUrl && !URL.canParse(trimmedCvUrl)) {
      toast.error("CV linki için geçerli bir URL girin.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error(
        "Form yapılandırması eksik. Lütfen yönetici ile iletişime geçin.",
      );
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Kariyer Basvurusu - ${formData.position.trim()}`,
      from_name: "Neli Muhendislik Kariyer Formu",
      replyto: formData.email.trim(),
      botcheck: "",
      full_name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      position: formData.position.trim(),
      experience: formData.experience.trim() || "-",
      cv_url: formData.cvUrl.trim() || "-",
      message: formData.message.trim(),
    };

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Basvuru gonderimi basarisiz oldu.");
      }

      toast.success("Başvurunuz alındı", {
        description:
          "İnsan kaynakları ekibimiz en kısa sürede sizinle iletişime geçecek.",
      });
      setFormData(initialFormData);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.";
      toast.error("Başvuru gönderilemedi", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-20">
      <SEO
        title="Kariyer"
        description="Neli Mühendislik kariyer sayfası. Açık pozisyonlara başvurun, ekibimize katılın."
        keywords="neli mühendislik kariyer, inşaat kariyer, iş başvurusu, izmir iş ilanı"
        url="https://nelimuhendislik.com/kariyer"
      />

      <PageHero
        currentPage="Kariyer"
        title={
          <>
            Bizimle <span className="text-neli-600">Çalışın</span>
          </>
        }
        description="Açık pozisyonlarımız için başvurunuzu iletin. Teknik ve idari ekiplerimiz düzenli olarak yeni yetenekler arıyor."
      />

      <section ref={formRef} className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="rounded-2xl bg-cream-100 p-5 md:p-8 shadow-soft"
            >
              <h2 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-2">
                İş Başvuru Formu
              </h2>
              <p className="text-sm md:text-base text-foreground/65 mb-6 md:mb-8">
                Formu eksiksiz doldurun. Başvurunuz doğrudan insan kaynakları
                ekibimize iletilir.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label
                      htmlFor="career-full-name"
                      className="text-sm text-foreground/70 mb-2 block"
                    >
                      Ad Soyad *
                    </label>
                    <Input
                      id="career-full-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Ad Soyad"
                      value={formData.fullName}
                      onChange={(event) =>
                        updateField("fullName", event.target.value)
                      }
                      className="bg-white border-cream-300 focus:border-neli-600 focus:ring-neli-600/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="career-email"
                      className="text-sm text-foreground/70 mb-2 block"
                    >
                      E-posta *
                    </label>
                    <Input
                      id="career-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      className="bg-white border-cream-300 focus:border-neli-600 focus:ring-neli-600/20"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label
                      htmlFor="career-phone"
                      className="text-sm text-foreground/70 mb-2 block"
                    >
                      Telefon *
                    </label>
                    <Input
                      id="career-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+90 5XX XXX XX XX"
                      value={formData.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      className="bg-white border-cream-300 focus:border-neli-600 focus:ring-neli-600/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="career-position"
                      className="text-sm text-foreground/70 mb-2 block"
                    >
                      Başvurulan Pozisyon *
                    </label>
                    <Input
                      id="career-position"
                      type="text"
                      required
                      placeholder="Örn: İnşaat Mühendisi"
                      value={formData.position}
                      onChange={(event) =>
                        updateField("position", event.target.value)
                      }
                      className="bg-white border-cream-300 focus:border-neli-600 focus:ring-neli-600/20"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label
                      htmlFor="career-experience"
                      className="text-sm text-foreground/70 mb-2 block"
                    >
                      Deneyim (yıl)
                    </label>
                    <Input
                      id="career-experience"
                      type="text"
                      inputMode="numeric"
                      placeholder="Örn: 5"
                      value={formData.experience}
                      onChange={(event) =>
                        updateField("experience", event.target.value)
                      }
                      className="bg-white border-cream-300 focus:border-neli-600 focus:ring-neli-600/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="career-cv-url"
                      className="text-sm text-foreground/70 mb-2 block"
                    >
                      CV Linki (opsiyonel)
                    </label>
                    <Input
                      id="career-cv-url"
                      type="url"
                      placeholder="https://..."
                      value={formData.cvUrl}
                      onChange={(event) =>
                        updateField("cvUrl", event.target.value)
                      }
                      className="bg-white border-cream-300 focus:border-neli-600 focus:ring-neli-600/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="career-message"
                    className="text-sm text-foreground/70 mb-2 block"
                  >
                    Ön Yazı *
                  </label>
                  <Textarea
                    id="career-message"
                    required
                    rows={5}
                    placeholder="Kendinizi ve uzmanlık alanlarınızı kısaca anlatın..."
                    value={formData.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    className="bg-white border-cream-300 focus:border-neli-600 focus:ring-neli-600/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-neli-600 hover:bg-neli-700 text-white rounded-xl font-semibold disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full"
                      />
                      Gönderiliyor...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Başvuru Gönder
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="space-y-4 md:space-y-5"
            >
              <div className="rounded-2xl border border-cream-300 bg-white p-5 md:p-6 shadow-soft">
                <div className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-neli-600/10 mb-4">
                  <Briefcase className="w-5 h-5 text-neli-600" />
                </div>
                <h3 className="text-lg font-serif font-medium text-foreground mb-2">
                  Açık Pozisyonlar
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  Şantiye, ofis ve teknik ekiplerimizde değerlendirilecek genel
                  başvurularınızı bu form üzerinden iletebilirsiniz.
                </p>
              </div>

              <div className="rounded-2xl border border-cream-300 bg-white p-5 md:p-6 shadow-soft">
                <div className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-neli-600/10 mb-4">
                  <GraduationCap className="w-5 h-5 text-neli-600" />
                </div>
                <h3 className="text-lg font-serif font-medium text-foreground mb-2">
                  Değerlendirme Süreci
                </h3>
                <ul className="space-y-2.5 text-sm text-foreground/70">
                  <li>1. Başvuru alımı ve ön değerlendirme</li>
                  <li>2. Uygun profiller için insan kaynakları görüşmesi</li>
                  <li>3. Teknik değerlendirme ve geri bildirim</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-cream-300 bg-white p-5 md:p-6 shadow-soft">
                <div className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-neli-600/10 mb-4">
                  <FileText className="w-5 h-5 text-neli-600" />
                </div>
                <h3 className="text-lg font-serif font-medium text-foreground mb-2">
                  Önemli Not
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  Form gönderimi iletilmediğinde lütfen doğrudan{" "}
                  <a
                    href="mailto:info@neli.tr"
                    className="font-medium text-neli-600 hover:text-neli-700 transition-colors"
                  >
                    info@neli.tr
                  </a>{" "}
                  adresine CV ve ön yazınızı gönderin.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
