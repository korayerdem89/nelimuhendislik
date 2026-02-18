import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface PageHeroProps {
  currentPage: string;
  title: ReactNode;
  description: ReactNode;
}

export default function PageHero({
  currentPage,
  title,
  description,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 lg:py-24 bg-cream-100"
    >
      <div className="container-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm text-foreground/50 mb-4 md:mb-6">
              <span>Anasayfa</span>
              <span>/</span>
              <span className="text-neli-600">{currentPage}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-3 md:mb-4">
              {title}
            </h1>
            <p className="text-foreground/60 max-w-2xl text-sm md:text-base">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
