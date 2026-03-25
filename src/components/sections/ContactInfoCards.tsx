import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import type { ContactInfoItem } from "@/hooks/use-contact-section-data";

interface ContactInfoCardsProps {
  items: ContactInfoItem[];
  inView: boolean;
  showSocial?: boolean;
  className?: string;
}

export default function ContactInfoCards({
  items,
  inView,
  showSocial = true,
  className = "",
}: ContactInfoCardsProps) {
  return (
    <div className={`space-y-4 md:space-y-6 ${className}`}>
      {items.map((info, index) => (
        <motion.div
          key={info.title}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          {info.href ? (
            <a
              href={info.href}
              target={info.href.startsWith("http") ? "_blank" : undefined}
              rel={
                info.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl bg-cream-100 hover:bg-neli-600/5 transition-colors duration-300"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-neli-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-neli-600 group-hover:scale-110 transition-all duration-300">
                <info.icon className="w-4 h-4 md:w-5 md:h-5 text-neli-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h4 className="text-foreground font-medium mb-0.5 md:mb-1">
                  {info.title}
                </h4>
                <p className="text-foreground/60 text-sm whitespace-pre-line">
                  {info.content}
                </p>
              </div>
            </a>
          ) : (
            <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl bg-cream-100">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-neli-600/10 flex items-center justify-center flex-shrink-0">
                <info.icon className="w-4 h-4 md:w-5 md:h-5 text-neli-600" />
              </div>
              <div>
                <h4 className="text-foreground font-medium mb-0.5 md:mb-1">
                  {info.title}
                </h4>
                <p className="text-foreground/60 text-sm whitespace-pre-line">
                  {info.content}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      ))}

      {showSocial ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="pt-2 md:pt-4"
        >
          <p className="text-foreground/60 text-sm mb-3 md:mb-4">
            Bizi Takip Edin
          </p>
          <SocialLinks variant="default" />
        </motion.div>
      ) : null}
    </div>
  );
}
