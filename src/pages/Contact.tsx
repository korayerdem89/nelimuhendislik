import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import PageHero from '@/components/sections/PageHero';
import ContactMapSection from '@/components/sections/ContactMapSection';
import ContactInfoCards from '@/components/sections/ContactInfoCards';
import SEO from '@/components/SEO';
import { useContactSectionData } from '@/hooks/use-contact-section-data';

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? "";

export default function Contact() {
  const { contactInfo, contactMapEmbedUrl } = useContactSectionData();
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error('Form yapılandırması eksik. Lütfen yönetici ile iletişime geçin.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `İletişim Formu - ${formData.subject.trim() || 'Yeni Mesaj'}`,
      from_name: 'Neli Mühendislik İletişim Formu',
      replyto: formData.email.trim(),
      botcheck: '',
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || '-',
      topic: formData.subject.trim() || '-',
      message: formData.message.trim(),
    };

    try {
      const [web3Response, odooResponse] = await Promise.allSettled([
        fetch(WEB3FORMS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        }).then(async (res) => {
          const result = (await res.json()) as { success?: boolean; message?: string };
          if (!res.ok || !result.success) throw new Error(result.message || 'Web3Forms hatası');
          return result;
        }),
        fetch('/api/odoo/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
          }),
        }).then(async (res) => {
          const result = (await res.json()) as { success?: boolean; error?: string };
          if (!res.ok || !result.success) throw new Error(result.error || 'Odoo CRM hatası');
          return result;
        }),
      ]);

      const web3Ok = web3Response.status === 'fulfilled';
      const odooOk = odooResponse.status === 'fulfilled';

      if (!web3Ok && !odooOk) {
        throw new Error('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
      }

      if (!odooOk) {
        console.warn('[Odoo CRM]', (odooResponse as PromiseRejectedResult).reason);
      }

      toast.success('Mesajınız Gönderildi', {
        description: 'En kısa sürede size dönüş yapacağız.',
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
      toast.error('Mesaj gönderilemedi', { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 md:pt-24 lg:pt-28">
      <SEO
        title="İletişim"
        description="Neli Mühendislik ile iletişime geçin. İzmir Karşıyaka'daki ofisimizi ziyaret edin veya bize ulaşın. Telefon: +90 554 704 90 74"
        keywords="neli mühendislik iletişim, izmir inşaat iletişim, konut projesi danışma, karşıyaka ofis"
        url="https://neli.tr/iletisim"
      />
      <PageHero
        currentPage="İletişim"
        title={
          <>
            Bize <span className="text-neli-600">Ulaşın</span>
          </>
        }
        description="Projeleriniz için bizimle iletişime geçin. Size özel çözümler sunmak için bekliyoruz."
        bgImage="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=75"
        bgPosition="center"
      />

      {/* Contact Content */}
      <section ref={formRef} className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-cream-100 rounded-2xl p-5 md:p-8">
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-2">
                    Bize Yazın
                  </h3>
                  <p className="text-foreground/60 text-sm md:text-base mb-6 md:mb-8">
                    Formu doldurun, en kısa sürede size dönüş yapalım.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                      <div>
                        <label className="text-foreground/70 text-sm mb-1.5 md:mb-2 block">Adınız *</label>
                        <Input
                          type="text"
                          placeholder="Ad Soyad"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-white border-cream-300 text-foreground placeholder:text-foreground/40 focus:border-neli-600 focus:ring-neli-600/20"
                        />
                      </div>
                      <div>
                        <label className="text-foreground/70 text-sm mb-1.5 md:mb-2 block">E-posta *</label>
                        <Input
                          type="email"
                          placeholder="ornek@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-white border-cream-300 text-foreground placeholder:text-foreground/40 focus:border-neli-600 focus:ring-neli-600/20"
                        />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                      <div>
                        <label className="text-foreground/70 text-sm mb-1.5 md:mb-2 block">Telefon</label>
                        <Input
                          type="tel"
                          placeholder="+90 5XX XXX XX XX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-white border-cream-300 text-foreground placeholder:text-foreground/40 focus:border-neli-600 focus:ring-neli-600/20"
                        />
                      </div>
                      <div>
                        <label className="text-foreground/70 text-sm mb-1.5 md:mb-2 block">Konu</label>
                        <Input
                          type="text"
                          placeholder="Proje/Danışmanlık"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="bg-white border-cream-300 text-foreground placeholder:text-foreground/40 focus:border-neli-600 focus:ring-neli-600/20"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-foreground/70 text-sm mb-1.5 md:mb-2 block">Mesajınız *</label>
                      <Textarea
                        placeholder="Projeniz hakkında bilgi verin..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={4}
                        className="bg-white border-cream-300 text-foreground placeholder:text-foreground/40 focus:border-neli-600 focus:ring-neli-600/20 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-neli-600 hover:bg-neli-700 text-white font-semibold py-5 md:py-6 rounded-xl transition-colors duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Gönderiliyor...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Mesaj Gönder
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ContactInfoCards items={contactInfo} inView={isFormInView} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ContactMapSection
        mapSrc={contactMapEmbedUrl}
        title="Neli Mühendislik Konum"
      />
    </main>
  );
}
