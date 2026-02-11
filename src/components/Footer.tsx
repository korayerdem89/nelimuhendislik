import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from 'lucide-react';

const footerLinks = [
  {
    title: 'Kurumsal',
    links: [
      { name: 'Hakkımızda', href: '/kurumsal' },
      { name: 'Değerlerimiz', href: '/kurumsal' },
      { name: 'Kilometre Taşları', href: '/kurumsal' },
    ],
  },
  {
    title: 'Projeler',
    links: [
      { name: 'Valorya Serisi', href: '/projeler' },
      { name: 'Serenità Projeleri', href: '/projeler' },
      { name: 'Tüm Projeler', href: '/projeler' },
    ],
  },
  {
    title: 'Hizmetler',
    links: [
      { name: 'İnşaat', href: '/projeler' },
      { name: 'Restorasyon', href: '/restorasyon' },
      { name: 'Danışmanlık', href: '/iletisim' },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/neli_muhendislik', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/neli-mühendislik', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com/profile.php?id=100087358753242', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="bg-cream-100">
      {/* Main Footer */}
      <div className="container-padding py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-neli-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl md:text-2xl font-serif">N</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-foreground font-serif text-xl md:text-2xl">Neli</span>
                  <span className="text-foreground/60 text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em]">MÜHENDİSLİK</span>
                </div>
              </Link>
              <p className="text-foreground/60 text-sm leading-relaxed max-w-sm mb-4 md:mb-6">
                Özel hissettiren tasarımlara giden yolda hep biz varız. 
                Kalite, konfor ve estetiği bir araya getirerek 
                ayrıcalıklı yaşam alanları oluşturuyoruz.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-start gap-2 md:gap-3 text-sm text-foreground/60">
                  <MapPin className="w-4 h-4 mt-0.5 text-neli-600 flex-shrink-0" />
                  <span>Dedebaşı Mah. 6131 Sok. No:39/A<br />Karşıyaka, İzmir</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-sm text-foreground/60">
                  <Phone className="w-4 h-4 text-neli-600 flex-shrink-0" />
                  <span>+90 554 704 90 74</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-sm text-foreground/60">
                  <Mail className="w-4 h-4 text-neli-600 flex-shrink-0" />
                  <span>info@nelimuhendislik.com</span>
                </div>
              </div>
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-foreground font-serif text-base md:text-lg mb-3 md:mb-5">{group.title}</h4>
                <ul className="space-y-2 md:space-y-3">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-foreground/60 hover:text-neli-600 text-sm transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream-300">
        <div className="container-padding py-4 md:py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="text-foreground/50 text-xs md:text-sm text-center sm:text-left">
              © 2024 Neli Mühendislik. Tüm hakları saklıdır.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 md:gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white hover:bg-neli-600 flex items-center justify-center transition-all duration-300 group shadow-soft"
                  aria-label={social.label}
                >
                  <social.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/60 group-hover:text-white transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
