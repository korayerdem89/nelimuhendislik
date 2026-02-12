import { MapPin } from 'lucide-react';

interface ContactMapSectionProps {
  mapSrc: string;
  title: string;
  heightClassName?: string;
}

export default function ContactMapSection({
  mapSrc,
  title,
  heightClassName = 'h-64 md:h-80 lg:h-96',
}: ContactMapSectionProps) {
  return (
    <section className={`relative ${heightClassName} bg-cream-100`}>
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="grayscale-[30%] contrast-[1.1]"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10">
        <div className="relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-sm" />
          <div className="relative flex flex-col items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-neli-600 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-neli-600 -mt-1" />
          </div>
        </div>
      </div>
    </section>
  );
}
