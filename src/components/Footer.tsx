import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import SocialLinks from './SocialLinks';

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
                
                <img src="/site-logo.png" alt="Neli Mühendislik" className="w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18" />
              
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
            <SocialLinks variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
