import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

const HERO_BG = '/images/hero3.webp';
const HERO_PLAN = '/images/hero2.webp';
const HERO_MAKET = '/images/hero1.webp';

// Original LayerSlider canvas dimensions
const DESKTOP_W = 1410;
const DESKTOP_H = 850;
const MOBILE_W = 850;
const MOBILE_H = 1410;
const MOBILE_BP = 975;

// Easing curves matching LayerSlider
type Bezier = [number, number, number, number];
const EASE_OUT_BACK: Bezier = [0.34, 1.56, 0.64, 1];
const EASE_IN_OUT_BACK: Bezier = [0.68, -0.6, 0.32, 1.6];

// Text positions and sizes for desktop (canvas space: 1410x850)
const DESKTOP_TEXT = {
  neli: { top: 348, left: 300, fontSize: 127 },
  muhendislik: { top: 385, left: 541, fontSize: 89 },
  tagline1: { top: 485, left: 328, fontSize: 23 },
  tagline2: { top: 482, left: 908, fontSize: 23 },
};

// Text positions and sizes for mobile (canvas space: 850x1410)
const MOBILE_TEXT = {
  neli: { top: 520, left: 80, fontSize: 95 },
  muhendislik: { top: 580, left: 80, fontSize: 65 },
  tagline1: { top: 660, left: 80, fontSize: 20 },
  tagline2: { top: 695, left: 80, fontSize: 20},
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  const canvasW = isMobile ? MOBILE_W : DESKTOP_W;
  const canvasH = isMobile ? MOBILE_H : DESKTOP_H;
  const textPos = isMobile ? MOBILE_TEXT : DESKTOP_TEXT;

  // Mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  // Parallax transforms per LayerSlider level
  const maketPX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const maketPY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const planPX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const planPY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);
  const textPX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const textPY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  // Image preloading
  useEffect(() => {
    let loaded = 0;
    const srcs = [HERO_BG, HERO_PLAN, HERO_MAKET];
    const onLoad = () => {
      loaded++;
      if (loaded >= srcs.length) setReady(true);
    };
    srcs.forEach((src) => {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = src;
    });
    const timeout = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  // Responsive scale via ResizeObserver
  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    const mobile = w < MOBILE_BP;
    setIsMobile(mobile);
    setScale(w / (mobile ? MOBILE_W : DESKTOP_W));
  }, []);

  useEffect(() => {
    updateLayout();
    const ro = new ResizeObserver(updateLayout);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateLayout]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Image height: much larger than canvas to match original site
  const imgHeight = canvasH


  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: canvasH * scale }}
    >
      {/* ===== LOADER ===== */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-[60] bg-black flex items-center justify-center"
          >
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== SCALED CANVAS ===== */}
      <div
        className="relative"
        style={{
          width: canvasW,
          height: canvasH,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          overflow: 'hidden',
        }}
      >
        {/* === LAYER 0: Background with Ken Burns zoom === */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={ready ? { scale: 1.1 } : {}}
          transition={{
            duration: 7,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>

        {/* === LAYER 1: Plan image (blueprint) — slides from left === */}
        <motion.div
          style={{ x: planPX, y: planPY, zIndex: 20 }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <motion.img
            src={HERO_PLAN}
            alt=""
            draggable={false}
            loading="eager"
            decoding="async"
            initial={{ x: -600, opacity: 0 }}
            animate={ready ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            style={{
              height: imgHeight,
              width: 'auto',
              maxWidth: 'none',
              marginLeft: -100, // Slightly left of center
            }}
          />
        </motion.div>

        {/* === LAYER 2: Maket image (3D model) — slides from right === */}
        <motion.div
          style={{ x: maketPX, y: maketPY, zIndex: 10 }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <motion.img
            src={HERO_MAKET}
            alt=""
            draggable={false}
            loading="eager"
            decoding="async"
            initial={{ x: 600, opacity: 0 }}
            animate={ready ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT_BACK }}
            style={{
              height: imgHeight,
              width: 'auto',
              maxWidth: 'none',
              marginLeft: -100, // Slightly left of center
            }}
          />
        </motion.div>

        {/* === LAYER 3: Dark overlay — matches original rgba(0,0,0,0.6) at 0.8 opacity === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 0.8 } : {}}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 25,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />

        {/* === LAYER 4: Text elements === */}
        {isMobile ? (
          /* ===== MOBILE/TABLET: Centered layout ===== */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ zIndex: 40 }}
          >
            {/* "NeliMühendislik" on same line */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex items-baseline"
            >
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: textPos.neli.fontSize,
                  fontWeight: 'normal',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: 1,
                }}
              >
                Neli
              </span>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: textPos.muhendislik.fontSize,
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: 1,
                }}
              >
                Mühendislik
              </span>
            </motion.div>

            {/* Tagline row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex items-center gap-2 mt-3"
              style={{ flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: textPos.tagline1.fontSize,
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                }}
              >
                Özel hİssettİren tasarımlara gİden yolda
              </span>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: textPos.tagline2.fontSize,
                  textTransform: 'uppercase',
                  color: 'rgba(0, 0, 0, 0.6)',
                  backgroundColor: '#ffffff',
                  padding: '2px 4px 1px 4px',
                  whiteSpace: 'nowrap',
                }}
              >
                hep bİz varız
              </span>
            </motion.div>
          </div>
        ) : (
          /* ===== DESKTOP: Absolute positioned layout ===== */
          <motion.div
            style={{ x: textPX, y: textPY, zIndex: 40 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* "Neli" */}
            <div
              style={{
                position: 'absolute',
                top: textPos.neli.top,
                left: textPos.neli.left,
                perspective: 1200,
              }}
            >
              <motion.h1
                initial={{ rotateX: 90, opacity: 0 }}
                animate={ready ? { rotateX: 0, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.9, ease: EASE_IN_OUT_BACK }}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: textPos.neli.fontSize,
                  fontWeight: 'normal',
                  color: 'rgba(255, 255, 255, 0.6)',
                  transformOrigin: '50% 0%',
                  lineHeight: 1,
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                Neli
              </motion.h1>
            </div>

            {/* "Mühendislik" */}
            <div
              style={{
                position: 'absolute',
                top: textPos.muhendislik.top,
                left: textPos.muhendislik.left,
                perspective: 1200,
              }}
            >
              <motion.h1
                initial={{ rotateY: 90, opacity: 0 }}
                animate={ready ? { rotateY: 0, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 1.3, ease: EASE_IN_OUT_BACK }}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: textPos.muhendislik.fontSize,
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.6)',
                  transformOrigin: '0% 50%',
                  lineHeight: 1,
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                Mühendislik
              </motion.h1>
            </div>

            {/* Tagline 1 */}
            <div
              style={{
                position: 'absolute',
                top: textPos.tagline1.top,
                left: textPos.tagline1.left,
                perspective: 1200,
              }}
            >
              <motion.p
                initial={{ rotateX: -90, opacity: 0 }}
                animate={ready ? { rotateX: 0, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 2.2, ease: EASE_IN_OUT_BACK }}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: textPos.tagline1.fontSize,
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  transformOrigin: '0% 0%',
                  lineHeight: 1,
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                Özel hİssettİren tasarımlara gİden yolda
              </motion.p>
            </div>

            {/* Tagline 2 — highlighted */}
            <div
              style={{
                position: 'absolute',
                top: textPos.tagline2.top,
                left: textPos.tagline2.left,
                perspective: 1200,
              }}
            >
              <motion.p
                initial={{ rotateX: -90, opacity: 0 }}
                animate={ready ? { rotateX: 0, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 2.8, ease: EASE_IN_OUT_BACK }}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: textPos.tagline2.fontSize,
                  textTransform: 'uppercase',
                  color: 'rgba(0, 0, 0, 0.6)',
                  backgroundColor: '#ffffff',
                  padding: '3px 3px 1px 3px',
                  transformOrigin: '0% 0%',
                  lineHeight: 1,
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                hep bİz varız
              </motion.p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
