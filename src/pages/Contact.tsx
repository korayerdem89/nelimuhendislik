import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import SocialLinks from '@/components/SocialLinks';
import PageHero from '@/components/sections/PageHero';
import ContactMapSection from '@/components/sections/ContactMapSection';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adres',
    content: 'Dedebaşı Mah. 6131 Sok. No:39/A\nKarşıyaka, İzmir',
    href: 'https://maps.google.com/?q=Karşıyaka,İzmir',
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: '+90 554 704 90 74\n+90 232 441 44 42',
    href: 'tel:+905547049074',
  },
  {
    icon: Mail,
    title: 'E-posta',
    content: 'info@nelimuhendislik.com',
    href: 'mailto:info@nelimuhendislik.com',
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    content: 'Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 10:00 - 14:00',
    href: null,
  },
];

const contactMapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1562.7!2d27.1057313!3d38.4680346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd9dd2adbb0b9%3A0x6988352d26352bc!2zRGVkZWJhxZ_EsSwgNjEzMS4gU2suIE5vOjM5L0EsIDM1NTYwIEthcsWfxLF5YWthL8Swem1pcg!5e0!3m2!1str!2str!4v1707000000000!5m2!1str!2str';

export default function Contact() {
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
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success('Mesajınız Gönderildi', {
      description: 'En kısa sürede size dönüş yapacağız.',
    });
    
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen pt-20 md:pt-24 lg:pt-28">
      <PageHero
        currentPage="İletişim"
        title={
          <>
            Bize <span className="text-neli-600">Ulaşın</span>
          </>
        }
        description="Projeleriniz için bizimle iletişime geçin. Size özel çözümler sunmak için bekliyoruz."
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
                className="space-y-4 md:space-y-6"
              >
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl bg-cream-100 hover:bg-neli-600/5 transition-colors duration-300"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-neli-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-neli-600 group-hover:scale-110 transition-all duration-300">
                          <info.icon className="w-4 h-4 md:w-5 md:h-5 text-neli-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <h4 className="text-foreground font-medium mb-0.5 md:mb-1">{info.title}</h4>
                          <p className="text-foreground/60 text-sm whitespace-pre-line">{info.content}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl bg-cream-100">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-neli-600/10 flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-4 h-4 md:w-5 md:h-5 text-neli-600" />
                        </div>
                        <div>
                          <h4 className="text-foreground font-medium mb-0.5 md:mb-1">{info.title}</h4>
                          <p className="text-foreground/60 text-sm whitespace-pre-line">{info.content}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="pt-2 md:pt-4"
                >
                  <p className="text-foreground/60 text-sm mb-3 md:mb-4">Bizi Takip Edin</p>
                  <SocialLinks variant="default" />
                </motion.div>
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
