import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineMilestonesProps {
  eyebrow: string;
  title: string;
  milestones: MilestoneItem[];
  sectionClassName?: string;
}

export default function TimelineMilestones({
  eyebrow,
  title,
  milestones,
  sectionClassName = 'section-padding bg-white',
}: TimelineMilestonesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <div className="container-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-neli-600 text-sm font-medium tracking-wider uppercase mb-2 md:mb-4 block">
              {eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground">
              {title}
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-cream-300 -translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${milestone.title}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  className="relative md:grid md:grid-cols-[1fr_60px_1fr] md:items-start"
                >
                  <div className={`hidden md:block ${index % 2 === 0 ? 'text-right pr-4' : ''}`}>
                    {index % 2 === 0 && (
                      <>
                        <span className="text-neli-600 font-serif text-xl md:text-2xl font-bold">{milestone.year}</span>
                        <h3 className="text-base md:text-lg lg:text-xl font-serif font-medium text-foreground mt-1 md:mt-2 mb-1 md:mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-foreground/60 text-sm leading-relaxed">{milestone.description}</p>
                      </>
                    )}
                  </div>

                  <div className="hidden md:flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-neli-600 flex-shrink-0" />
                  </div>

                  <div className={`hidden md:block ${index % 2 !== 0 ? 'text-left pl-4' : ''}`}>
                    {index % 2 !== 0 && (
                      <>
                        <span className="text-neli-600 font-serif text-xl md:text-2xl font-bold">{milestone.year}</span>
                        <h3 className="text-base md:text-lg lg:text-xl font-serif font-medium text-foreground mt-1 md:mt-2 mb-1 md:mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-foreground/60 text-sm leading-relaxed">{milestone.description}</p>
                      </>
                    )}
                  </div>

                  <div className="md:hidden">
                    <span className="text-neli-600 font-serif text-xl font-bold">{milestone.year}</span>
                    <h3 className="text-base font-serif font-medium text-foreground mt-1 mb-1">{milestone.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
