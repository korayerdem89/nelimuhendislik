import { useMemo } from "react";
import { MapPin, Phone, Mail, Clock, type LucideIcon } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";

export interface ContactInfoItem {
  icon: LucideIcon;
  title: string;
  content: string;
  href: string | null;
}

const DEFAULT_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1562.7!2d27.1057313!3d38.4680346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd9dd2adbb0b9%3A0x6988352d26352bc!2zRGVkZWJhxZ_EsSwgNjEzMS4gU2suIE5vOjM5L0EsIDM1NTYwIEthcsWfxLF5YWthL8Swem1pcg!5e0!3m2!1str!2str!4v1707000000000!5m2!1str!2str";

export function useContactSectionData(): {
  contactInfo: ContactInfoItem[];
  contactMapEmbedUrl: string;
} {
  const { settings } = useSiteSettings();

  const contactInfo = useMemo(
    () =>
      [
        {
          icon: MapPin,
          title: "Adres",
          content:
            settings.address ||
            "Dedebaşı Mah. 6131 Sok. No:39/A\nKarşıyaka, İzmir",
          href: "https://maps.google.com/?q=Karşıyaka,İzmir",
        },
        {
          icon: Phone,
          title: "Telefon",
          content:
            [settings.phone, settings.phone2].filter(Boolean).join("\n") ||
            "+90 554 704 90 74",
          href: `tel:${(settings.phone || "+905547049074").replace(/\s/g, "")}`,
        },
        {
          icon: Mail,
          title: "E-posta",
          content: settings.email || "info@neli.tr",
          href: `mailto:${settings.email || "info@neli.tr"}`,
        },
        {
          icon: Clock,
          title: "Çalışma Saatleri",
          content:
            settings.working_hours ||
            "Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 10:00 - 14:00",
          href: null as string | null,
        },
      ] satisfies ContactInfoItem[],
    [settings],
  );

  const contactMapEmbedUrl = settings.maps_embed_url || DEFAULT_MAP_EMBED;

  return { contactInfo, contactMapEmbedUrl };
}
