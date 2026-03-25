import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarClock, CheckCircle2, Loader2 } from "lucide-react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHero from "@/components/sections/PageHero";
import ContactMapSection from "@/components/sections/ContactMapSection";
import ContactInfoCards from "@/components/sections/ContactInfoCards";
import SEO from "@/components/SEO";
import { useContactSectionData } from "@/hooks/use-contact-section-data";
import {
  filterPastSlots,
  formatSlotRangeLabel,
  generateSlotStartsForDate,
  isSelectableCalendarDate,
  slotOverlapsBusy,
} from "@/lib/appointment-slots";
import { cn } from "@/lib/utils";

type BusyInterval = { start: string; stop: string };

export default function Randevu() {
  const { contactInfo, contactMapEmbedUrl } = useContactSectionData();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-80px" });

  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [busy, setBusy] = useState<BusyInterval[]>([]);
  const [busyLoading, setBusyLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchBusy = useCallback(async (m: Date) => {
    const from = format(startOfMonth(m), "yyyy-MM-dd");
    const to = format(endOfMonth(m), "yyyy-MM-dd");
    setBusyLoading(true);
    try {
      const res = await fetch(
        `/api/odoo/appointment/availability?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
      );
      const data = (await res.json()) as {
        busy?: BusyInterval[];
        error?: string;
      };
      if (!res.ok) {
        setBusy([]);
        if (res.status !== 500) return;
        return;
      }
      setBusy(Array.isArray(data.busy) ? data.busy : []);
    } catch {
      setBusy([]);
    } finally {
      setBusyLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBusy(month);
  }, [month, fetchBusy]);

  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    const raw = generateSlotStartsForDate(selectedDate);
    const open = filterPastSlots(raw);
    return open.filter((iso) => !slotOverlapsBusy(iso, busy));
  }, [selectedDate, busy]);

  useEffect(() => {
    if (selectedSlot && selectedDate) {
      const still = availableSlots.includes(selectedSlot);
      if (!still) setSelectedSlot(null);
    }
  }, [availableSlots, selectedDate, selectedSlot]);

  const handleSelectDate = (d: Date | undefined) => {
    setSelectedDate(d);
    setSelectedSlot(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast.error("Lütfen bir saat seçin");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/odoo/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedSlot,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          note: form.note.trim() || undefined,
        }),
      });
      const data = (await res.json()) as {
        success?: boolean;
        error?: string;
      };
      if (res.status === 409) {
        toast.error("Bu saat dolu", {
          description: data.error || "Başka bir zaman seçin.",
        });
        void fetchBusy(month);
        return;
      }
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Randevu oluşturulamadı");
      }
      toast.success("Randevunuz alındı", {
        description: "Ekibimiz onay için sizinle iletişime geçebilir.",
      });
      setForm({ name: "", email: "", phone: "", note: "" });
      setSelectedSlot(null);
      void fetchBusy(month);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.";
      toast.error("Randevu gönderilemedi", { description: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 md:pt-24 lg:pt-28">
      <SEO
        title="Randevu"
        description="Neli Mühendislik ile yüz yüze veya online görüşme için randevu alın. Uygun gün ve saati seçin, talebiniz takvimimize işlensin."
        keywords="neli mühendislik randevu, izmir danışmanlık randevu, ofis görüşmesi"
        url="https://neli.tr/randevu"
      />
      <PageHero
        currentPage="Randevu"
        title={
          <>
            Sizin için <span className="text-neli-600">zaman ayıralım</span>
          </>
        }
        description="Takvimden uygun gün ve saati seçin; randevunuz doğrudan ekibimizin takvimine kaydedilir."
        bgImage="https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1920&q=75"
        bgPosition="center"
      />

      <section ref={sectionRef} className="section-padding bg-gradient-to-b from-white via-cream-50/80 to-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
            >
              <p className="text-sm font-medium tracking-wide text-neli-600 uppercase mb-2">
                Online randevu
              </p>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Görüşme süresi varsayılan olarak{" "}
                <span className="text-neli-600">2 saat</span> ayrılır
              </h2>
              <p className="text-foreground/60 text-sm md:text-base mt-3">
                Hafta içi 09:00–18:00, cumartesi 10:00–14:00 (Türkiye saati).
                Pazar kapalıdır.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Calendar + slots */}
              <motion.div
                className="lg:col-span-7 space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.05 }}
              >
                <div className="rounded-2xl p-[1px] bg-gradient-to-br from-neli-600/35 via-neli-600/10 to-transparent shadow-lg shadow-neli-900/5">
                  <div className="rounded-2xl bg-white/95 backdrop-blur-sm p-5 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-11 h-11 rounded-xl bg-neli-600/10 flex items-center justify-center">
                        <CalendarClock className="w-5 h-5 text-neli-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Tarih ve saat
                        </h3>
                        <p className="text-xs text-foreground/55">
                          Önce günü seçin, ardından başlangıç saatini işaretleyin.
                        </p>
                      </div>
                      {busyLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-neli-600/60 ml-auto shrink-0" />
                      ) : null}
                    </div>

                    {/* Dikey akış: takvim tam genişlikte büyük hücreler; saatler altında — yan yana sıkışmayı önler */}
                    <div className="flex flex-col gap-10">
                      <div className="w-full">
                        <Calendar
                          mode="single"
                          month={month}
                          onMonthChange={setMonth}
                          selected={selectedDate}
                          onSelect={handleSelectDate}
                          disabled={(date) => !isSelectableCalendarDate(date)}
                          className="w-full rounded-2xl border border-cream-200/90 bg-gradient-to-b from-white to-cream-50/90 p-4 sm:p-5 md:p-7 shadow-sm [--cell-size:clamp(3rem,6vw,4.5rem)]"
                          classNames={{
                            root: "w-full max-w-[min(100%,36rem)] mx-auto",
                            caption_label:
                              "select-none font-serif font-semibold text-foreground text-base sm:text-lg md:text-xl",
                            weekday:
                              "text-foreground/50 text-[0.65rem] sm:text-xs md:text-sm font-semibold uppercase tracking-widest",
                            month_caption: "mb-1",
                          }}
                        />
                      </div>

                      <div className="w-full min-h-[8rem] rounded-xl border border-dashed border-cream-300/80 bg-cream-50/40 p-4 sm:p-6 md:p-8">
                        {!selectedDate ? (
                          <div className="flex flex-col items-center justify-center gap-3 py-4 text-center max-w-md mx-auto">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neli-600/10 text-neli-600">
                              <CalendarClock className="h-6 w-6" />
                            </div>
                            <p className="text-sm sm:text-base text-foreground/55 leading-relaxed">
                              Müsait saatleri görmek için yukarıdaki takvimden bir
                              gün seçin.
                            </p>
                          </div>
                        ) : availableSlots.length === 0 ? (
                          <p className="text-sm sm:text-base text-foreground/60 text-center md:text-left py-2">
                            Bu gün için uygun slot kalmadı veya çalışma saatleri
                            dışında. Başka bir gün seçebilirsiniz.
                          </p>
                        ) : (
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-foreground/50 uppercase tracking-wide mb-4">
                              Başlangıç saati
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                              {availableSlots.map((iso) => {
                                const active = selectedSlot === iso;
                                return (
                                  <button
                                    key={iso}
                                    type="button"
                                    onClick={() => setSelectedSlot(iso)}
                                    className={cn(
                                      "rounded-xl border px-3 py-3 sm:py-3.5 text-left text-sm sm:text-base transition-all duration-200 min-h-[3.25rem]",
                                      active
                                        ? "border-neli-600 bg-neli-600 text-white shadow-md shadow-neli-600/25"
                                        : "border-cream-200 bg-white hover:border-neli-600/40 hover:bg-cream-50 text-foreground",
                                    )}
                                  >
                                    <span className="font-semibold tabular-nums">
                                      {formatSlotRangeLabel(iso)}
                                    </span>
                                    <span
                                      className={cn(
                                        "block text-[10px] mt-0.5 opacity-80",
                                        active ? "text-white/90" : "text-foreground/45",
                                      )}
                                    >
                                      2 saat
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Booking form */}
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.12 }}
              >
                <div className="rounded-2xl border border-cream-200/80 bg-cream-100/60 p-5 md:p-8 h-full shadow-inner">
                  <h3 className="text-xl font-serif font-medium text-foreground mb-1">
                    Bilgileriniz
                  </h3>
                  <p className="text-foreground/55 text-sm mb-6">
                    Randevuyu takvimde size bağlamak için iletişim bilgilerinizi
                    girin.
                  </p>

                  {selectedSlot ? (
                    <div className="flex items-start gap-2 rounded-xl bg-white border border-neli-600/15 px-4 py-3 mb-6">
                      <CheckCircle2 className="w-5 h-5 text-neli-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wide">
                          Seçilen aralık
                        </p>
                        <p className="font-semibold text-foreground tabular-nums">
                          {formatSlotRangeLabel(selectedSlot)}
                        </p>
                        <p className="text-xs text-foreground/50 mt-0.5">
                          Türkiye saati (UTC+3)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-cream-300 bg-white/50 px-4 py-3 mb-6 text-sm text-foreground/45">
                      Henüz saat seçilmedi.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-foreground/70 text-sm mb-1.5 block">
                        Ad Soyad *
                      </label>
                      <Input
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="Adınız"
                        className="bg-white border-cream-300"
                      />
                    </div>
                    <div>
                      <label className="text-foreground/70 text-sm mb-1.5 block">
                        E-posta *
                      </label>
                      <Input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        placeholder="ornek@email.com"
                        className="bg-white border-cream-300"
                      />
                    </div>
                    <div>
                      <label className="text-foreground/70 text-sm mb-1.5 block">
                        Telefon
                      </label>
                      <Input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        placeholder="+90 5XX XXX XX XX"
                        className="bg-white border-cream-300"
                      />
                    </div>
                    <div>
                      <label className="text-foreground/70 text-sm mb-1.5 block">
                        Not (isteğe bağlı)
                      </label>
                      <Textarea
                        value={form.note}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, note: e.target.value }))
                        }
                        rows={3}
                        placeholder="Görüşme konusu kısaca..."
                        className="bg-white border-cream-300 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting || !selectedSlot}
                      className="w-full bg-neli-600 hover:bg-neli-700 text-white font-semibold py-6 rounded-xl disabled:opacity-50"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Gönderiliyor…
                        </span>
                      ) : (
                        "Randevuyu onayla"
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section ref={contactRef} className="section-padding bg-white border-t border-cream-100">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Ofis ve <span className="text-neli-600">iletişim</span>
              </h2>
              <p className="text-foreground/55 text-sm md:text-base mt-2 max-w-xl mx-auto">
                Randevunuzu ofiste veya uzaktan gerçekleştirmek için bize bu
                kanallardan da ulaşabilirsiniz.
              </p>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={contactInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 }}
              >
                <ContactInfoCards items={contactInfo} inView={contactInView} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={contactInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="rounded-2xl overflow-hidden border border-cream-200 shadow-lg h-72 md:h-96 lg:h-[420px]"
              >
                <ContactMapSection
                  mapSrc={contactMapEmbedUrl}
                  title="Neli Mühendislik Konum"
                  heightClassName="h-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
