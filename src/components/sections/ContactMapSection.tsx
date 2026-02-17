interface ContactMapSectionProps {
  mapSrc: string;
  title: string;
  heightClassName?: string;
}

export default function ContactMapSection({
  mapSrc,
  title,
  heightClassName = "h-64 md:h-80 lg:h-96",
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
    </section>
  );
}
