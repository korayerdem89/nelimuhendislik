import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import SocialLinks from "./SocialLinks";

const navLinks = [
  { name: "Anasayfa", href: "/" },
  { name: "Projeler", href: "/projeler" },
  { name: "Restorasyon", href: "/restorasyon" },
  { name: "Kurumsal", href: "/kurumsal" },
  { name: "İletişim", href: "/iletisim" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft"
            : "bg-white/50"
        }`}
      >
        <div className="w-full container-padding">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 md:gap-3"
            >
              <img
                src="/site-logo.webp"
                alt="Neli Mühendislik"
                className="w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 py-2 ${
                    isActive(link.href)
                      ? "text-neli-600"
                      : isScrolled
                        ? "text-foreground/50 hover:text-neli-500"
                        : "text-foreground/70 hover:text-neli-500"
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neli-600"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button & Social Links */}
            <div className="hidden lg:flex items-center gap-3">
              <SocialLinks variant="navbar" showAnimation={false} />
              <a
                href="tel:+905547049074"
                className="flex items-center gap-2 px-4 xl:px-5 py-2 md:py-2.5 bg-neli-600 hover:bg-neli-700 text-white font-medium text-sm rounded-full transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>0554 704 90 74</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-cream-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 md:w-80 bg-white shadow-soft-lg p-6 pt-20 md:pt-24"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive(link.href)
                          ? "bg-neli-600/10 text-neli-600 font-medium"
                          : "text-foreground/70 hover:bg-cream-100 hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.a
                href="tel:+905547049074"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex items-center justify-center gap-2 px-5 py-3 bg-neli-600 text-white font-medium rounded-lg"
              >
                <Phone className="w-4 h-4" />
                <span>+90 554 704 90 74</span>
              </motion.a>

              {/* Mobile Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 flex justify-center"
              >
                <SocialLinks variant="default" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
