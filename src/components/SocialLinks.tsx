import { motion } from 'framer-motion';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

// X (Twitter) custom icon - lucide doesn't have the new X logo
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const socialLinks = [
  { 
    icon: Instagram, 
    href: 'https://www.instagram.com/neli_muhendislik/', 
    label: 'Instagram' 
  },
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/company/neli-m%C3%BChendislik', 
    label: 'LinkedIn' 
  },
  { 
    icon: XIcon, 
    href: 'https://x.com/nelimuhendislik', 
    label: 'X (Twitter)',
    isCustomIcon: true
  },
  { 
    icon: Facebook, 
    href: 'https://www.facebook.com/profile.php?id=100089633642677', 
    label: 'Facebook' 
  },
];

interface SocialLinksProps {
  variant?: 'default' | 'navbar' | 'footer';
  className?: string;
  showAnimation?: boolean;
}

export default function SocialLinks({ 
  variant = 'default', 
  className = '',
  showAnimation = true 
}: SocialLinksProps) {
  const getContainerStyles = () => {
    switch (variant) {
      case 'navbar':
        return 'flex items-center gap-1';
      case 'footer':
        return 'flex items-center gap-2 md:gap-3';
      default:
        return 'flex gap-2 md:gap-3';
    }
  };

  const getButtonStyles = () => {
    switch (variant) {
      case 'navbar':
        return 'w-8 h-8 rounded-full bg-cream-100 hover:bg-neli-600 flex items-center justify-center transition-all duration-300 group';
      case 'footer':
        return 'w-9 h-9 md:w-10 md:h-10 rounded-full bg-white hover:bg-neli-600 flex items-center justify-center transition-all duration-300 group shadow-soft';
      default:
        return 'w-10 h-10 md:w-11 md:h-11 rounded-lg bg-cream-100 hover:bg-neli-600 flex items-center justify-center transition-all duration-300 group';
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'navbar':
        return 'w-3.5 h-3.5 text-foreground/60 group-hover:text-white transition-colors duration-300';
      case 'footer':
        return 'w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/60 group-hover:text-white transition-colors duration-300';
      default:
        return 'w-4 h-4 md:w-5 md:h-5 text-foreground/60 group-hover:text-white transition-colors duration-300';
    }
  };

  const buttonStyles = getButtonStyles();
  const iconStyles = getIconStyles();

  return (
    <div className={`${getContainerStyles()} ${className}`}>
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        
        if (showAnimation) {
          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={buttonStyles}
              aria-label={social.label}
            >
              <IconComponent className={iconStyles} />
            </motion.a>
          );
        }

        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles}
            aria-label={social.label}
          >
            <IconComponent className={iconStyles} />
          </a>
        );
      })}
    </div>
  );
}
