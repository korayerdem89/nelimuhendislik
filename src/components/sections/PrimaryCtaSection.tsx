import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PrimaryCtaSectionProps {
  title: ReactNode;
  highlightText: string;
  description: ReactNode;
  buttonText?: string;
  to?: string;
}

export default function PrimaryCtaSection({
  title,
  highlightText,
  description,
  buttonText = 'İletişime Geçin',
  to = '/iletisim',
}: PrimaryCtaSectionProps) {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-foreground">
      <div className="container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-white mb-4 md:mb-6">
              {title}
              <span className="block text-neli-500 mt-1 md:mt-2">{highlightText}</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4 md:px-0">
              {description}
            </p>
            <Link
              to={to}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-neli-600 hover:bg-neli-700 text-white font-semibold rounded-full transition-colors duration-300"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
