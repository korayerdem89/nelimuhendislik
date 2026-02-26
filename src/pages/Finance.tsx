import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  Calculator,
  CreditCard,
  ExternalLink,
  Percent,
  TrendingDown,
  Wallet,
} from "lucide-react";
import SEO from "@/components/SEO";
import PageHero from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
  termMonths: number;
}

interface NeliFinanceOption {
  downPaymentPercent: number;
  installmentMonths: number;
  interestRate: number;
}

const CURRENT_INTEREST_RATE = 2.6;

const PARTICIPATION_BANKS = [
  {
    name: "Eminevim",
    logo: "/finance/eminevim.png",
    url: "https://www.eminevim.com",
    description: "1991'den beri faizsiz ev finansmanı",
  },
  {
    name: "Katılımevim",
    logo: "/finance/katilimevim.png",
    url: "https://www.katilimevim.com.tr",
    description: "Faizsiz tasarruf finansmanı",
  },
  {
    name: "Birevim",
    logo: "/finance/birevim.png",
    url: "https://www.birevim.com",
    description: "BDDK lisanslı tasarruf finansmanı",
  },
  {
    name: "Fuzulev",
    logo: "/finance/fuzulev.png",
    url: "https://www.fuzulev.com.tr",
    description: "Çekilişli ve çekilişsiz modeller",
  },
];

const NELI_FINANCE_OPTIONS: NeliFinanceOption[] = [
  { downPaymentPercent: 30, installmentMonths: 24, interestRate: 2.79 },
  { downPaymentPercent: 50, installmentMonths: 24, interestRate: 1.99 },
  { downPaymentPercent: 70, installmentMonths: 24, interestRate: 0 },
];

function calculateLoan(
  principal: number,
  monthlyRatePercent: number,
  termMonths: number,
): LoanResult {
  const r = monthlyRatePercent / 100;

  if (r === 0) {
    const monthlyPayment = principal / termMonths;
    return {
      monthlyPayment,
      totalPayment: principal,
      totalInterest: 0,
      loanAmount: principal,
      termMonths,
    };
  }

  const numerator = r * Math.pow(1 + r, termMonths);
  const denominator = Math.pow(1 + r, termMonths) - 1;
  const monthlyPayment = principal * (numerator / denominator);
  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    loanAmount: principal,
    termMonths,
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(value);
}

export default function Finance() {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const participationRef = useRef<HTMLDivElement>(null);
  const neliRef = useRef<HTMLDivElement>(null);

  const isCalculatorInView = useInView(calculatorRef, {
    once: true,
    margin: "-100px",
  });
  const isParticipationInView = useInView(participationRef, {
    once: true,
    margin: "-100px",
  });
  const isNeliInView = useInView(neliRef, { once: true, margin: "-100px" });

  const [loanAmount, setLoanAmount] = useState(2000000);
  const [interestRate, setInterestRate] = useState(CURRENT_INTEREST_RATE);
  const [termMonths, setTermMonths] = useState(120);
  const [neliPropertyPrice, setNeliPropertyPrice] = useState(3000000);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const loanResult = useMemo(
    () => calculateLoan(loanAmount, interestRate, termMonths),
    [loanAmount, interestRate, termMonths],
  );

  const handleLoanAmountChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, ""), 10) || 0;
    setLoanAmount(Math.min(Math.max(numValue, 0), 50000000));
  };

  const yearlyRate = ((Math.pow(1 + interestRate / 100, 12) - 1) * 100).toFixed(
    2,
  );

  return (
    <main className="min-h-screen pt-20 md:pt-24 lg:pt-28">
      <SEO
        title="Finans"
        description="Neli Mühendislik konut finansman seçenekleri. Konut kredisi hesaplama, katılım bankası ortaklıkları ve Neli Finans taksit seçenekleri."
        keywords="konut kredisi, ev kredisi hesaplama, faizsiz ev, katılım bankası, neli finans, taksitli konut"
        url="https://nelimuhendislik.com/finans"
      />

      <PageHero
        currentPage="Finans"
        title={
          <>
            Konut <span className="text-neli-600">Finansman</span> Seçenekleri
          </>
        }
        description="Hayalinizdeki eve ulaşmanız için farklı finansman alternatifleri sunuyoruz. Konut kredisi, katılım bankası veya Neli Finans ile ev sahibi olun."
      />

      {/* Konut Kredisi Section */}
      <section ref={calculatorRef} className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isCalculatorInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 md:mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neli-600/10 text-neli-600 text-sm font-medium mb-4">
                <CreditCard className="w-4 h-4" />
                <span>Konut Kredisi</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-foreground mb-3">
                İş Bankası Konut Kredisi
              </h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                Anlaşmalı bankamız İş Bankası ile %90'a varan oranda konut
                kredisi kullanabilirsiniz. Güncel faiz oranlarıyla kredinizi
                hesaplayın.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Calculator Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isCalculatorInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl bg-cream-100 p-5 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-neli-600/10 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-neli-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-medium text-foreground">
                      Kredi Hesaplama
                    </h3>
                    <p className="text-sm text-foreground/60">
                      Aylık taksitinizi hesaplayın
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Loan Amount */}
                  <div>
                    <label className="text-sm font-medium text-foreground/70 mb-2 block">
                      Kredi Tutarı
                    </label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={formatNumber(loanAmount)}
                      onChange={(e) => handleLoanAmountChange(e.target.value)}
                      className="bg-white border-cream-300 text-lg font-medium"
                    />
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(val) => setLoanAmount(val[0])}
                      min={100000}
                      max={20000000}
                      step={100000}
                      className="mt-3"
                    />
                    <div className="flex justify-between text-xs text-foreground/50 mt-1">
                      <span>100.000 ₺</span>
                      <span>20.000.000 ₺</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-foreground/70">
                        Aylık Faiz Oranı
                      </label>
                      <span className="text-xs text-neli-600 font-medium">
                        Yıllık: %{yearlyRate}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        step="0.01"
                        min="0.1"
                        max="10"
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(parseFloat(e.target.value) || 0)
                        }
                        className="bg-white border-cream-300 w-24 text-center font-medium"
                      />
                      <span className="text-foreground/60">%</span>
                      <Slider
                        value={[interestRate]}
                        onValueChange={(val) => setInterestRate(val[0])}
                        min={1}
                        max={5}
                        step={0.01}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-foreground/50 mt-2">
                      İş Bankası güncel oran: %{CURRENT_INTEREST_RATE} (Şubat
                      2026)
                    </p>
                  </div>

                  {/* Term */}
                  <div>
                    <label className="text-sm font-medium text-foreground/70 mb-2 block">
                      Vade (Ay)
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {[36, 60, 84, 120, 180].map((term) => (
                        <Button
                          key={term}
                          type="button"
                          variant={termMonths === term ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTermMonths(term)}
                          className={
                            termMonths === term
                              ? "bg-neli-600 hover:bg-neli-700"
                              : "border-cream-300 hover:bg-cream-200"
                          }
                        >
                          {term} Ay
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isCalculatorInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                {loanResult && (
                  <>
                    {/* Monthly Payment - Hero */}
                    <div className="rounded-2xl bg-gradient-to-br from-neli-600 to-neli-700 p-6 md:p-8 text-white">
                      <p className="text-white/70 text-sm mb-1">Aylık Taksit</p>
                      <p className="text-3xl md:text-4xl font-serif font-medium">
                        {formatCurrency(loanResult.monthlyPayment)}
                      </p>
                      <p className="text-white/60 text-sm mt-2">
                        {termMonths} ay boyunca ödenecek
                      </p>
                    </div>

                    {/* Other Results */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="rounded-xl bg-cream-100 p-5">
                        <div className="flex items-center gap-2 text-foreground/60 text-sm mb-2">
                          <Wallet className="w-4 h-4" />
                          <span>Çekilen Kredi</span>
                        </div>
                        <p className="text-xl font-serif font-medium text-foreground">
                          {formatCurrency(loanResult.loanAmount)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-cream-100 p-5">
                        <div className="flex items-center gap-2 text-foreground/60 text-sm mb-2">
                          <TrendingDown className="w-4 h-4" />
                          <span>Vade Sayısı</span>
                        </div>
                        <p className="text-xl font-serif font-medium text-foreground">
                          {loanResult.termMonths} Ay
                        </p>
                      </div>

                      <div className="rounded-xl bg-cream-100 p-5">
                        <div className="flex items-center gap-2 text-foreground/60 text-sm mb-2">
                          <Percent className="w-4 h-4" />
                          <span>Toplam Faiz</span>
                        </div>
                        <p className="text-xl font-serif font-medium text-foreground">
                          {formatCurrency(loanResult.totalInterest)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-cream-100 p-5">
                        <div className="flex items-center gap-2 text-foreground/60 text-sm mb-2">
                          <CreditCard className="w-4 h-4" />
                          <span>Toplam Geri Ödeme</span>
                        </div>
                        <p className="text-xl font-serif font-medium text-foreground">
                          {formatCurrency(loanResult.totalPayment)}
                        </p>
                      </div>
                    </div>

                    {/* Bank Info */}
                    <div className="rounded-xl border border-cream-300 p-5 flex items-center gap-4">
                      <img
                        src="/finance/isbank-logo.png"
                        alt="İş Bankası"
                        className="w-14 h-14 object-contain"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          Türkiye İş Bankası
                        </p>
                        <p className="text-sm text-foreground/60">
                          Anlaşmalı bankamız ile %90'a varan kredi imkanı
                        </p>
                      </div>
                      <a
                        href="https://www.isbank.com.tr/ev-kredisi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neli-600 hover:text-neli-700"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Katılım Bankaları Section */}
      <section ref={participationRef} className="section-padding bg-cream-100">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isParticipationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 md:mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neli-600/10 text-neli-600 text-sm font-medium mb-4">
                <Building2 className="w-4 h-4" />
                <span>Katılım Bankaları</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-foreground mb-3">
                Faizsiz Konut Finansmanı
              </h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                Faizsiz ev sahibi olmak isteyenler için BDDK lisanslı katılım
                bankalarıyla işbirliği yapıyoruz. Tasarruf finansmanı ile ev
                sahibi olabilirsiniz.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {PARTICIPATION_BANKS.map((bank, index) => (
                <motion.a
                  key={bank.name}
                  href={bank.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isParticipationInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="group rounded-2xl bg-white p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-16 mb-4 flex items-center justify-center">
                    <img
                      src={bank.logo}
                      alt={bank.name}
                      className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-16 h-16 rounded-xl bg-cream-200 flex items-center justify-center"><span class="text-xl font-bold text-foreground/40">${bank.name.charAt(0)}</span></div>`;
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-foreground text-center mb-1">
                    {bank.name}
                  </h3>
                  <p className="text-sm text-foreground/60 text-center mb-3">
                    {bank.description}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-sm text-neli-600 group-hover:text-neli-700">
                    <span>Siteye Git</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isParticipationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 rounded-2xl bg-white border border-cream-300 p-6 md:p-8"
            >
              <h3 className="text-lg font-serif font-medium text-foreground mb-3">
                Katılım Finansmanı Nasıl Çalışır?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-foreground/70">
                <div>
                  <p className="font-medium text-foreground mb-1">
                    1. Gruba Katılım
                  </p>
                  <p>
                    Belirli bir ev fiyatı ve vade seçerek tasarruf grubuna
                    katılırsınız. Aylık taksit ödemelerine başlarsınız.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    2. Çekiliş veya Sıra
                  </p>
                  <p>
                    Noter huzurunda yapılan çekilişle veya taksit ödeme sıranıza
                    göre ev teslim hakkı kazanırsınız.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    3. Ev Teslimi
                  </p>
                  <p>
                    Sıranız geldiğinde evinizi teslim alırsınız. Kalan
                    taksitleri ödemeye devam edersiniz. Faiz ödemezsiniz.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Neli Finans Section */}
      <section ref={neliRef} className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isNeliInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 md:mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neli-600/10 text-neli-600 text-sm font-medium mb-4">
                <img
                  src="/site-logo.webp"
                  alt="Neli"
                  className="w-5 h-5 object-contain"
                />
                <span>Neli Finans</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-foreground mb-3">
                Doğrudan Bizden Taksitle
              </h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                Banka kredisi veya katılım bankası olmadan, doğrudan Neli
                Mühendislik güvencesiyle taksitli ödeme seçeneği.
              </p>
            </motion.div>

            {/* Property Price Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isNeliInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-md mx-auto mb-10"
            >
              <label className="text-sm font-medium text-foreground/70 mb-2 block text-center">
                Konut Fiyatı
              </label>
              <Input
                type="text"
                inputMode="numeric"
                value={formatNumber(neliPropertyPrice)}
                onChange={(e) => {
                  const val =
                    parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
                  setNeliPropertyPrice(Math.min(Math.max(val, 0), 50000000));
                }}
                className="bg-cream-100 border-cream-300 text-center text-xl font-medium"
              />
              <Slider
                value={[neliPropertyPrice]}
                onValueChange={(val) => setNeliPropertyPrice(val[0])}
                min={500000}
                max={20000000}
                step={100000}
                className="mt-3"
              />
            </motion.div>

            {/* Finance Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isNeliInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-x-auto"
            >
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-cream-300">
                    <th className="text-left py-4 px-4 text-sm font-medium text-foreground/60">
                      Peşinat Oranı
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-foreground/60">
                      Peşinat Tutarı
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-foreground/60">
                      Kalan Tutar
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-foreground/60">
                      Vade
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-foreground/60">
                      Aylık Taksit
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-foreground/60">
                      Faiz Oranı
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {NELI_FINANCE_OPTIONS.map((option, index) => {
                    const downPayment =
                      (neliPropertyPrice * option.downPaymentPercent) / 100;
                    const remaining = neliPropertyPrice - downPayment;
                    const monthlyInstallment = calculateLoan(
                      remaining,
                      option.interestRate,
                      option.installmentMonths,
                    ).monthlyPayment;

                    return (
                      <motion.tr
                        key={option.downPaymentPercent}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isNeliInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="border-b border-cream-200 hover:bg-cream-50 transition-colors"
                      >
                        <td className="py-5 px-4">
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                                option.downPaymentPercent === 70
                                  ? "bg-neli-600 text-white"
                                  : option.downPaymentPercent === 50
                                    ? "bg-neli-600/20 text-neli-700"
                                    : "bg-cream-200 text-foreground/70"
                              }`}
                            >
                              %{option.downPaymentPercent}
                            </span>
                          </span>
                        </td>
                        <td className="py-5 px-4 font-medium text-foreground">
                          {formatCurrency(downPayment)}
                        </td>
                        <td className="py-5 px-4 text-foreground/80">
                          {formatCurrency(remaining)}
                        </td>
                        <td className="py-5 px-4 text-foreground/80">
                          {option.installmentMonths} Ay
                        </td>
                        <td className="py-5 px-4 font-medium text-neli-600">
                          {formatCurrency(monthlyInstallment)}
                        </td>
                        <td className="py-5 px-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                            %{option.interestRate}
                            <span className="text-xs">
                              {option.interestRate === 0
                                ? "(Faizsiz)"
                                : "(Aylık)"}
                            </span>
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isNeliInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 rounded-2xl bg-gradient-to-r from-neli-600 to-neli-700 p-6 md:p-8 text-center text-white"
            >
              <h3 className="text-xl md:text-2xl font-serif font-medium mb-2">
                Neli Finans ile Ev Sahibi Olun
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Banka kredisi gerektirmeden, faizsiz taksit seçenekleriyle
                hayalinizdeki eve kavuşun. Detaylı bilgi için bizimle iletişime
                geçin.
              </p>
              <a
                href="/iletisim"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neli-600 font-medium rounded-xl hover:bg-cream-100 transition-colors"
              >
                İletişime Geç
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
