import { useState, useEffect, useRef } from "react";

const ALL_QUESTIONS = {
  white: [
    { q: "What do we call the place where we train?", a: "Dojang", options: ["Dojang", "Dobok", "Sogi", "Ti"], emoji: "🏠" },
    { q: "What is the Korean word for KICK?", a: "Chagi", options: ["Makgi", "Chagi", "Sogi", "Ti"], emoji: "🦵" },
    { q: "What is the Korean word for PUNCH?", a: "Jirugi", options: ["Chagi", "Jirugi", "Makgi", "Sogi"], emoji: "👊" },
    { q: "What is the Korean word for BLOCK?", a: "Makgi", options: ["Jirugi", "Chagi", "Makgi", "Sogi"], emoji: "🛡️" },
    { q: "What do you wear to training?", a: "Dobok", options: ["Ti", "Dobok", "Dojang", "Sogi"], emoji: "👘" },
    { q: "What country does Taekwondo come from?", a: "Korea", options: ["Japan", "China", "Korea", "Thailand"], emoji: "🌏" },
    { q: "White belt means you are...", a: "A brand new beginner!", options: ["The best fighter", "A brand new beginner!", "Ready to grade", "A black belt"], emoji: "⬜" },
    { q: "How many tenets of TaeKwon-Do are there?", a: "5", options: ["3", "4", "5", "7"], emoji: "✋" },
    { q: "What is the Korean for the number 1?", a: "Hanna", options: ["Hanna", "Dool", "Set", "Net"], emoji: "1️⃣" },
    { q: "What is the Korean for the number 2?", a: "Dool", options: ["Hanna", "Dool", "Set", "Net"], emoji: "2️⃣" },
    { q: "What is the Korean for the number 3?", a: "Set", options: ["Dool", "Set", "Net", "Hanna"], emoji: "3️⃣" },
    { q: "Which of these is a tenet of TaeKwon-Do?", a: "Courtesy", options: ["Courage", "Courtesy", "Cleverness", "Calmness"], emoji: "🤝" },
    { q: "Which of these is a tenet of TaeKwon-Do?", a: "Perseverance", options: ["Patience", "Power", "Perseverance", "Practice"], emoji: "💪" },
    { q: "What is the Korean word for BELT?", a: "Ti", options: ["Ti", "Tul", "Sogi", "Dobok"], emoji: "🥋" },
  ],
  yellowStripe: [
    { q: "What is the Korean word for PATTERN?", a: "Tul", options: ["Tul", "Sogi", "Makgi", "Matsoki"], emoji: "⭐" },
    { q: "What does OMA stand for?", a: "One Martial Arts", options: ["Oriental Martial Arts", "One Martial Arts", "Official Masters", "Open Martial Academy"], emoji: "🥋" },
    { q: "What is the Korean for SITTING STANCE?", a: "Annun Sogi", options: ["Niunja Sogi", "Annun Sogi", "Junbi Sogi", "Gunnan Sogi"], emoji: "🧘" },
    { q: "What is the sitting stance weight split?", a: "50/50 — same on both legs", options: ["70/30", "60/40", "50/50 — same on both legs", "80/20"], emoji: "⚖️" },
    { q: "What is the Korean for WALKING STANCE?", a: "Gunnan Sogi", options: ["Niunja Sogi", "Annun Sogi", "Gunnan Sogi", "Junbi Sogi"], emoji: "🚶" },
    { q: "What is the Korean for READY STANCE?", a: "Junbi Sogi", options: ["Annun Sogi", "Niunja Sogi", "Junbi Sogi", "Gunnan Sogi"], emoji: "🟢" },
    { q: "What is the Korean for L-STANCE?", a: "Niunja Sogi", options: ["Annun Sogi", "Gunnan Sogi", "Niunja Sogi", "Junbi Sogi"], emoji: "🔤" },
    { q: "What does CHON-JI mean?", a: "Heaven and Earth", options: ["Fire and Water", "Heaven and Earth", "Light and Shadow", "Mountain and River"], emoji: "🌍" },
    { q: "How many moves in Chon-Ji?", a: "19", options: ["16", "19", "21", "24"], emoji: "🔢" },
    { q: "What is the Korean for FRONT RISING KICK?", a: "Ap Cha Olligi", options: ["Ap Chagi", "Ap Cha Olligi", "Bandae Jirugi", "Baro Jirugi"], emoji: "🦵" },
    { q: "What does Tae Kwon Do mean?", a: "Foot Fist Art", options: ["Way of the warrior", "Foot Fist Art", "Art of peace", "Hand and mind"], emoji: "🤜" },
  ],
  yellow: [
    { q: "What is the Korean for TWIN FOREARM BLOCK?", a: "Sang Palmok Makgi", options: ["Daebi Makgi", "An Palmok Makgi", "Sang Palmok Makgi", "Ap Joomuk"], emoji: "🛡️" },
    { q: "What is the L-Stance weight split?", a: "70/30 — more on the back leg", options: ["50/50", "60/40 front", "70/30 — more on the back leg", "80/20 back"], emoji: "⚖️" },
    { q: "What does YELLOW BELT mean?", a: "Like a plant growing from the earth", options: ["You are the best", "Like a plant growing from the earth", "You are brand new", "Ready for black belt"], emoji: "🌱" },
    { q: "What is the Korean for STRIKE?", a: "Taerigi", options: ["Jirugi", "Chagi", "Makgi", "Taerigi"], emoji: "👊" },
    { q: "What is the Korean for 3-STEP SPARRING?", a: "Sambo Matsoki", options: ["Sambo Matsoki", "Ilbo Matsoki", "Ibo Matsoki", "Tul Matsoki"], emoji: "👥" },
    { q: "How many moves in Dan-Gun?", a: "21", options: ["18", "19", "21", "24"], emoji: "🔢" },
    { q: "What is the Korean for REVERSE PUNCH?", a: "Bandae Jirugi", options: ["Baro Jirugi", "Bandae Jirugi", "Ap Joomuk", "Jirugi"], emoji: "👊" },
    { q: "What is the Korean for FRONT KICK?", a: "Ap Chagi", options: ["Ap Cha Olligi", "Ap Chagi", "Chagi", "Dollyo Chagi"], emoji: "🦵" },
    { q: "What is the Korean for GUARDING BLOCK?", a: "Daebi Makgi", options: ["An Palmok Makgi", "Sang Palmok Makgi", "Daebi Makgi", "Makgi"], emoji: "🛡️" },
    { q: "What is the Korean for FOREFIST?", a: "Ap Joomuk", options: ["Ap Chagi", "Ap Joomuk", "Baro Jirugi", "Jirugi"], emoji: "✊" },
  ],
};

const HEROES = [
  { name: "SPIDER-KID", icon: "🕷️", color: "#e63946", bg: "#1a0a0a", accent: "#ff4757", web: true },
  { name: "THUNDER FIST", icon: "⚡", color: "#ffd60a", bg: "#0a0a1a", accent: "#ffe566", web: false },
  { name: "IRON GUARD", icon: "🦾", color: "#48cae4", bg: "#0a1a1a", accent: "#90e0ef", web: false },
  { name: "SHADOW KICK", icon: "🌑", color: "#9b5de5", bg: "#0d0a1a", accent: "#c77dff", web: false },
];

const BELTS = [
  { key: "white", label: "White Belt", color: "#f0f0ea", textColor: "#111", desc: "Begin your hero origin story", icon: "🤍" },
  { key: "yellowStripe", label: "Yellow Stripe", color: "#fde74c", textColor: "#111", desc: "Your powers are growing!", icon: "⚡" },
  { key: "yellow", label: "Yellow Belt", color: "#f5c800", textColor: "#111", desc: "A true hero in training", icon: "🌟" },
];

const RIGHT_SFX = ["KAPOW!", "WHAM!", "ZAP!", "BOOM!", "POW!", "BAM!", "SMASH!", "CRACK!"];
const WRONG_SFX = ["OOPS!", "DOH!", "WHOOPS!", "UH-OH!"];
const RIGHT_MSG = ["Superhero move! 🦸", "You're UNSTOPPABLE!", "Hero brain activated! 🧠", "LEGENDARY answer!", "Your powers grow stronger! ⚡"];
const WRONG_MSG = ["Even heroes miss sometimes!", "Training makes perfect! 💪", "You'll get it next time!", "Heroes never give up! 🛡️"];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function HalftoneBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ opacity: 0.04 }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      {/* Comic speed lines */}
      <svg width="100%" height="100%" style={{ opacity: 0.03, position: "absolute", inset: 0 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="50%" y1="50%" x2={`${(i / 12) * 200 - 50}%`} y2={i % 2 === 0 ? "-10%" : "110%"} stroke="white" strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}

function ComicText({ children, size = 48, color = "#ffd60a", outline = "#000", style = {} }) {
  return (
    <div style={{
      fontFamily: "'Bangers', 'Impact', cursive",
      fontSize: size,
      color,
      WebkitTextStroke: `3px ${outline}`,
      textShadow: `4px 4px 0 ${outline}`,
      letterSpacing: "3px",
      lineHeight: 1,
      ...style,
    }}>{children}</div>
  );
}

function SpeechBubble({ text, color = "#fff", bg = "#1a1a2e", style = {} }) {
  return (
    <div style={{
      background: bg,
      border: `3px solid ${color}`,
      borderRadius: "16px",
      padding: "12px 18px",
      position: "relative",
      color,
      fontFamily: "'Bangers', Impact, cursive",
      fontSize: "18px",
      letterSpacing: "1px",
      ...style,
    }}>
      {text}
      <div style={{
        position: "absolute", bottom: "-14px", left: "24px",
        width: 0, height: 0,
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderTop: `14px solid ${color}`,
      }} />
      <div style={{
        position: "absolute", bottom: "-10px", left: "26px",
        width: 0, height: 0,
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderTop: `12px solid ${bg}`,
      }} />
    </div>
  );
}

function ZapEffect({ word, color }) {
  return (
    <div style={{
      fontFamily: "'Bangers', Impact, cursive",
      fontSize: "clamp(36px, 10vw, 64px)",
      color,
      WebkitTextStroke: "3px #000",
      textShadow: `3px 3px 0 #000, -1px -1px 0 #000`,
      letterSpacing: "4px",
      textAlign: "center",
      animation: "zapIn 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
      transform: `rotate(${Math.random() > 0.5 ? "-" : ""}${3 + Math.random() * 5}deg)`,
    }}>{word}</div>
  );
}

function PowerBar({ current, total, color }) {
  const pct = (current / total) * 100;
  return (
    <div style={{ width: "100%", height: "14px", background: "rgba(0,0,0,0.4)", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.2)", overflow: "hidden" }}>
      <div style={{
        height: "100%",
        width: `${pct}%`,
        background: `linear-gradient(90deg, ${color}, ${color}dd)`,
        borderRadius: "6px",
        transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: `0 0 8px ${color}`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shimmer 1.5s infinite" }} />
      </div>
    </div>
  );
}

function HeroCard({ hero, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: selected ? hero.bg : "rgba(255,255,255,0.05)",
      border: `3px solid ${selected ? hero.color : "rgba(255,255,255,0.1)"}`,
      borderRadius: "16px",
      padding: "16px 12px",
      cursor: "pointer",
      transition: "all 0.2s",
      transform: selected ? "scale(1.05)" : "scale(1)",
      boxShadow: selected ? `0 0 20px ${hero.color}66` : "none",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
    }}>
      <div style={{ fontSize: "36px", filter: selected ? "none" : "grayscale(0.5)" }}>{hero.icon}</div>
      <div style={{
        fontFamily: "'Bangers', Impact, cursive",
        fontSize: "13px",
        color: selected ? hero.color : "#888",
        letterSpacing: "1px",
      }}>{hero.name}</div>
    </button>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes zapIn {
    0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
    60% { transform: scale(1.2) rotate(3deg); opacity: 1; }
    100% { transform: scale(1) rotate(var(--rot, -3deg)); opacity: 1; }
  }
  @keyframes heroFloat {
    0%,100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-12px) rotate(2deg); }
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 0 0 currentColor; }
    50% { box-shadow: 0 0 20px 4px currentColor; }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    25% { transform: translateX(-10px) rotate(-2deg); }
    75% { transform: translateX(10px) rotate(2deg); }
  }
  @keyframes popUp {
    0% { transform: scale(0) translateY(20px); opacity: 0; }
    70% { transform: scale(1.1) translateY(-4px); opacity: 1; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes powerUp {
    0% { transform: scale(1); }
    50% { transform: scale(1.08); filter: brightness(1.3); }
    100% { transform: scale(1); }
  }
  @keyframes starSpin {
    0% { transform: scale(0) rotate(0deg); opacity: 0; }
    60% { transform: scale(1.3) rotate(200deg); opacity: 1; }
    100% { transform: scale(1) rotate(360deg); opacity: 1; }
  }
  @keyframes comicSlide {
    0% { transform: translateX(-30px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  .opt-btn { transition: all 0.15s !important; }
  .opt-btn:hover:not(:disabled) { transform: scale(1.04) translateY(-2px) !important; }
  .opt-btn:active:not(:disabled) { transform: scale(0.96) !important; }
  .cta-btn:hover { transform: scale(1.04) translateY(-2px) !important; filter: brightness(1.1); }
  .cta-btn:active { transform: scale(0.97) !important; }
  .belt-btn:hover { transform: translateY(-4px) scale(1.02) !important; }
`;

function Explosion({ active, color }) {
  if (!active) return null;
  const particles = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {particles.map(i => {
        const angle = (i / 16) * 360;
        const dist = 80 + Math.random() * 60;
        return (
          <div key={i} style={{
            position: "absolute",
            width: "12px", height: "12px",
            borderRadius: i % 3 === 0 ? "50%" : "2px",
            background: [color, "#fff", "#ffd60a"][i % 3],
            animation: `explode${i % 4} 0.6s ease-out forwards`,
          }} />
        );
      })}
      <style>{`
        @keyframes explode0 { to { transform: translate(80px, -60px) scale(0); opacity: 0; } }
        @keyframes explode1 { to { transform: translate(-80px, -60px) scale(0); opacity: 0; } }
        @keyframes explode2 { to { transform: translate(40px, 90px) scale(0); opacity: 0; } }
        @keyframes explode3 { to { transform: translate(-40px, 90px) scale(0); opacity: 0; } }
      `}</style>
    </div>
  );
}

export default function TKDHeroQuiz() {
  const [screen, setScreen] = useState("hero-select");
  const [hero, setHero] = useState(null);
  const [belt, setBelt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [zapWord, setZapWord] = useState("");
  const [zapColor, setZapColor] = useState("#ffd60a");
  const [msg, setMsg] = useState("");
  const [showExplosion, setShowExplosion] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [powerLevel, setPowerLevel] = useState(0);

  const heroData = hero !== null ? HEROES[hero] : HEROES[0];

  function startQuiz(beltKey) {
    const pool = beltKey === "mixed"
      ? shuffle([...ALL_QUESTIONS.white, ...ALL_QUESTIONS.yellowStripe, ...ALL_QUESTIONS.yellow]).slice(0, 10)
      : shuffle(ALL_QUESTIONS[beltKey]).slice(0, 8);
    const q = pool.map(item => ({ ...item, options: shuffle([...new Set(item.options)].slice(0, 4)) }));
    setBelt(beltKey);
    setQuestions(q);
    setCurrent(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setRevealed(false);
    setZapWord("");
    setMsg("");
    setPowerLevel(0);
    setScreen("quiz");
  }

  function handleAnswer(opt) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    const correct = opt === questions[current].a;
    if (correct) {
      setScore(s => s + 1);
      setPowerLevel(p => Math.min(100, p + Math.floor(100 / questions.length)));
      setZapWord(pick(RIGHT_SFX));
      setZapColor(heroData.color);
      setMsg(pick(RIGHT_MSG));
      setShowExplosion(true);
      setTimeout(() => setShowExplosion(false), 700);
    } else {
      setZapWord(pick(WRONG_SFX));
      setZapColor("#ff6b6b");
      setMsg(pick(WRONG_MSG));
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
    setAnswers(a => [...a, { isCorrect: correct, correct: questions[current].a }]);
  }

  function next() {
    if (current + 1 >= questions.length) {
      setScreen("result");
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
      setZapWord("");
      setMsg("");
    }
  }

  const q = questions[current];
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const heroStars = pct === 100 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0;

  // SCREEN: Hero Select
  if (screen === "hero-select") return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: "#0d0d1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
        <HalftoneBackground />

        {/* Comic panel border */}
        <div style={{ position: "fixed", inset: "8px", border: "4px solid rgba(255,255,255,0.08)", borderRadius: "12px", pointerEvents: "none", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "420px", textAlign: "center" }}>
          <div style={{ marginBottom: "8px", fontSize: "14px", fontFamily: "'Bangers', Impact, cursive", color: "#666", letterSpacing: "4px" }}>ONE MARTIAL ARTS PRESENTS</div>
          <ComicText size="clamp(40px, 11vw, 60px)" color="#ffd60a" style={{ marginBottom: "4px" }}>HERO TRAINING</ComicText>
          <ComicText size="clamp(28px, 7vw, 40px)" color="#fff" style={{ marginBottom: "24px" }}>ACADEMY</ComicText>

          <div style={{ fontSize: "72px", animation: "heroFloat 2.5s ease-in-out infinite", marginBottom: "16px" }}>🦸</div>

          <SpeechBubble
            text="Choose your hero to begin your mission!"
            color="#ffd60a"
            bg="#1a1800"
            style={{ marginBottom: "28px", textAlign: "left" }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
            {HEROES.map((h, i) => (
              <HeroCard key={i} hero={h} selected={hero === i} onClick={() => setHero(i)} />
            ))}
          </div>

          <button className="cta-btn" onClick={() => hero !== null && setScreen("belt-select")}
            disabled={hero === null}
            style={{
              width: "100%",
              background: hero !== null ? `linear-gradient(135deg, ${heroData.color}, ${heroData.accent})` : "#333",
              border: "none", borderRadius: "14px",
              padding: "18px",
              fontFamily: "'Bangers', Impact, cursive",
              fontSize: "22px", letterSpacing: "3px",
              color: hero !== null ? "#000" : "#666",
              cursor: hero !== null ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              boxShadow: hero !== null ? `0 4px 24px ${heroData.color}55` : "none",
              WebkitTextStroke: hero !== null ? "1px rgba(0,0,0,0.3)" : "none",
            }}>
            {hero !== null ? `ACTIVATE ${heroData.name} →` : "PICK YOUR HERO FIRST"}
          </button>
        </div>
      </div>
    </>
  );

  // SCREEN: Belt Select
  if (screen === "belt-select") return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: heroData.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
        <HalftoneBackground />
        <div style={{ position: "fixed", inset: "8px", border: `4px solid ${heroData.color}22`, borderRadius: "12px", pointerEvents: "none", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "420px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ fontSize: "48px" }}>{heroData.icon}</div>
            <div>
              <div style={{ fontFamily: "'Bangers', Impact, cursive", fontSize: "13px", color: heroData.color, letterSpacing: "3px" }}>HERO SELECTED</div>
              <ComicText size="28px" color="#fff">{heroData.name}</ComicText>
            </div>
          </div>

          <SpeechBubble
            text="Choose your belt mission, hero!"
            color={heroData.color}
            bg={heroData.bg}
            style={{ marginBottom: "24px" }}
          />

          <div style={{ display: "grid", gap: "12px", marginBottom: "16px" }}>
            {BELTS.map(b => (
              <button key={b.key} className="belt-btn" onClick={() => startQuiz(b.key)}
                style={{ background: b.color, border: "3px solid #000", borderRadius: "14px", padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", boxShadow: "4px 4px 0 #000", transition: "all 0.2s", textAlign: "left" }}>
                <div style={{ fontSize: "32px" }}>{b.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Bangers', Impact, cursive", fontSize: "20px", color: b.textColor, letterSpacing: "1px" }}>{b.label}</div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "12px", color: b.textColor, opacity: 0.7, fontWeight: 700 }}>{b.desc}</div>
                </div>
                <div style={{ marginLeft: "auto", fontFamily: "'Bangers', Impact, cursive", fontSize: "28px", color: b.textColor }}>→</div>
              </button>
            ))}
            <button className="belt-btn" onClick={() => startQuiz("mixed")}
              style={{ background: "linear-gradient(135deg, #f0f0ea, #fde74c, #f5c800)", border: "3px solid #000", borderRadius: "14px", padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", boxShadow: "4px 4px 0 #000", transition: "all 0.2s", textAlign: "left" }}>
              <div style={{ fontSize: "32px" }}>🏆</div>
              <div>
                <div style={{ fontFamily: "'Bangers', Impact, cursive", fontSize: "20px", color: "#111", letterSpacing: "1px" }}>ALL BELTS CHALLENGE</div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "12px", color: "#111", opacity: 0.7, fontWeight: 700 }}>Ultimate hero test — all questions!</div>
              </div>
              <div style={{ marginLeft: "auto", fontFamily: "'Bangers', Impact, cursive", fontSize: "28px", color: "#111" }}>→</div>
            </button>
          </div>

          <button onClick={() => setScreen("hero-select")} style={{ background: "transparent", border: `2px solid ${heroData.color}44`, borderRadius: "10px", padding: "10px 20px", color: heroData.color, fontFamily: "'Bangers', Impact, cursive", fontSize: "16px", letterSpacing: "2px", cursor: "pointer", width: "100%" }}>
            ← CHANGE HERO
          </button>
        </div>
      </div>
    </>
  );

  // SCREEN: Quiz
  if (screen === "quiz" && q) {
    const totalQ = questions.length;
    return (
      <>
        <style>{CSS}</style>
        <Explosion active={showExplosion} color={heroData.color} />
        <div style={{ minHeight: "100vh", background: heroData.bg, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px", position: "relative", overflow: "hidden", fontFamily: "'Nunito', sans-serif" }}>
          <HalftoneBackground />

          {/* Top bar */}
          <div style={{ width: "100%", maxWidth: "480px", position: "relative", zIndex: 2, marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ fontSize: "28px" }}>{heroData.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Bangers', Impact, cursive", fontSize: "11px", color: heroData.color, letterSpacing: "2px" }}>POWER LEVEL</div>
                  <PowerBar current={powerLevel} total={100} color={heroData.color} />
                </div>
              </div>
              <div style={{ background: `${heroData.color}22`, border: `2px solid ${heroData.color}`, borderRadius: "10px", padding: "6px 14px", fontFamily: "'Bangers', Impact, cursive", fontSize: "20px", color: heroData.color, letterSpacing: "2px" }}>
                ⚡ {score}
              </div>
            </div>

            {/* Question dots */}
            <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
              {Array.from({ length: totalQ }, (_, i) => (
                <div key={i} style={{
                  width: i === current ? "20px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: i < answers.length ? (answers[i].isCorrect ? "#6ab04c" : "#eb4d4b") : i === current ? heroData.color : "rgba(255,255,255,0.15)",
                  transition: "all 0.3s",
                  boxShadow: i === current ? `0 0 8px ${heroData.color}` : "none",
                }} />
              ))}
            </div>
          </div>

          {/* Question panel — comic style */}
          <div style={{
            width: "100%", maxWidth: "480px",
            background: "rgba(255,255,255,0.06)",
            border: `3px solid ${heroData.color}44`,
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "14px",
            position: "relative",
            zIndex: 2,
            animation: "comicSlide 0.3s ease",
            boxShadow: `inset 0 0 40px rgba(0,0,0,0.3)`,
          }}>
            {/* Question number tag */}
            <div style={{
              position: "absolute", top: "-14px", left: "20px",
              background: heroData.color,
              color: "#000",
              fontFamily: "'Bangers', Impact, cursive",
              fontSize: "14px",
              letterSpacing: "2px",
              padding: "2px 12px",
              borderRadius: "6px",
              border: "2px solid #000",
              boxShadow: "2px 2px 0 #000",
            }}>QUESTION {current + 1} OF {totalQ}</div>

            <div style={{ textAlign: "center", fontSize: "48px", marginBottom: "10px", marginTop: "8px" }}>{q.emoji}</div>
            <p style={{ color: "#fff", fontSize: "clamp(16px, 4.5vw, 21px)", fontWeight: 800, textAlign: "center", lineHeight: 1.3 }}>{q.q}</p>
          </div>

          {/* Answer options */}
          <div style={{
            width: "100%", maxWidth: "480px",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            position: "relative", zIndex: 2,
            animation: shaking ? "shake 0.4s ease" : "none",
          }}>
            {q.options.map((opt, i) => {
              const isCorrect = opt === q.a;
              const isSelected = opt === selected;
              const labels = ["A", "B", "C", "D"];
              let bg = "rgba(255,255,255,0.08)";
              let border = `2px solid rgba(255,255,255,0.15)`;
              let color = "#fff";
              let labelBg = heroData.color;
              let labelColor = "#000";
              let glow = "none";

              if (revealed) {
                if (isCorrect) {
                  bg = "rgba(106,176,76,0.25)";
                  border = "3px solid #6ab04c";
                  color = "#a8e890";
                  labelBg = "#6ab04c";
                  glow = "0 0 16px #6ab04c88";
                } else if (isSelected) {
                  bg = "rgba(235,77,75,0.25)";
                  border = "3px solid #eb4d4b";
                  color = "#ffaaaa";
                  labelBg = "#eb4d4b";
                  glow = "0 0 16px #eb4d4b88";
                } else {
                  bg = "rgba(255,255,255,0.03)";
                  border = "2px solid rgba(255,255,255,0.05)";
                  color = "rgba(255,255,255,0.25)";
                  labelBg = "#444";
                }
              }

              return (
                <button key={opt} className="opt-btn" disabled={revealed} onClick={() => handleAnswer(opt)}
                  style={{
                    background: bg,
                    border,
                    borderRadius: "14px",
                    padding: "14px 10px",
                    cursor: revealed ? "default" : "pointer",
                    color,
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "clamp(13px, 3.2vw, 15px)",
                    fontWeight: 800,
                    lineHeight: 1.3,
                    textAlign: "center",
                    boxShadow: glow,
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                    animation: revealed && isCorrect ? "powerUp 0.5s ease" : "none",
                  }}>
                  <div style={{
                    width: "28px", height: "28px",
                    borderRadius: "50%",
                    background: labelBg,
                    color: labelColor,
                    fontFamily: "'Bangers', Impact, cursive",
                    fontSize: "16px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "2px solid rgba(0,0,0,0.3)",
                    flexShrink: 0,
                  }}>{revealed && isCorrect ? "✓" : revealed && isSelected && !isCorrect ? "✗" : labels[i]}</div>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Zap + message + next */}
          {revealed && (
            <div style={{ width: "100%", maxWidth: "480px", marginTop: "14px", position: "relative", zIndex: 2, animation: "popUp 0.35s ease" }}>
              <div style={{ textAlign: "center", marginBottom: "8px" }}>
                <ZapEffect word={zapWord} color={zapColor} />
              </div>
              <div style={{ textAlign: "center", fontFamily: "'Bangers', Impact, cursive", fontSize: "18px", color: "#ccc", letterSpacing: "1px", marginBottom: selected !== q.a ? "8px" : "12px" }}>{msg}</div>

              {selected !== q.a && (
                <div style={{
                  background: "rgba(106,176,76,0.12)",
                  border: "2px solid rgba(106,176,76,0.4)",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  textAlign: "center",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: "14px",
                  color: "#a8e890",
                  marginBottom: "12px",
                }}>✅ Right answer: <span style={{ color: "#ffd60a" }}>{q.a}</span></div>
              )}

              <button className="cta-btn" onClick={next}
                style={{
                  width: "100%",
                  background: `linear-gradient(135deg, ${heroData.color}, ${heroData.accent})`,
                  border: "3px solid #000",
                  borderRadius: "14px",
                  padding: "16px",
                  fontFamily: "'Bangers', Impact, cursive",
                  fontSize: "22px",
                  letterSpacing: "3px",
                  color: "#000",
                  cursor: "pointer",
                  boxShadow: `4px 4px 0 #000, 0 4px 20px ${heroData.color}44`,
                  transition: "all 0.2s",
                }}>
                {current + 1 >= totalQ ? "🏆 SEE MY SCORE!" : "NEXT MISSION →"}
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  // SCREEN: Result
  if (screen === "result") {
    const rank = pct === 100 ? { title: "LEGENDARY HERO", icon: "🏆", desc: "Perfect score! You're ready for ANYTHING.", color: "#ffd60a" }
      : pct >= 70 ? { title: "MIGHTY HERO", icon: "⚡", desc: "Brilliant effort! Keep training!", color: heroData.color }
      : pct >= 40 ? { title: "HERO IN TRAINING", icon: "💪", desc: "Good work! More practice and you'll be unstoppable.", color: "#48cae4" }
      : { title: "ROOKIE HERO", icon: "🌱", desc: "Every hero starts somewhere. Go again!", color: "#a8e890" };

    return (
      <>
        <style>{CSS}</style>
        <div style={{ minHeight: "100vh", background: heroData.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
          <HalftoneBackground />
          <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "420px", textAlign: "center" }}>

            {/* Hero icon animated */}
            <div style={{ fontSize: "80px", animation: "heroFloat 2s ease-in-out infinite", marginBottom: "8px" }}>{rank.icon}</div>

            <ComicText size="clamp(28px, 8vw, 44px)" color={rank.color} style={{ marginBottom: "4px" }}>{rank.title}</ComicText>
            <div style={{ fontFamily: "'Nunito', sans-serif", color: "#aaa", fontSize: "15px", fontWeight: 700, marginBottom: "24px" }}>{rank.desc}</div>

            {/* Score card */}
            <div style={{
              background: "rgba(255,255,255,0.06)",
              border: `3px solid ${rank.color}44`,
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "20px",
              boxShadow: `0 0 40px ${rank.color}22`,
            }}>
              {/* Big score */}
              <div style={{ fontFamily: "'Bangers', Impact, cursive", fontSize: "clamp(60px, 16vw, 80px)", color: rank.color, lineHeight: 1, textShadow: `3px 3px 0 #000` }}>
                {score}<span style={{ fontSize: "0.45em", color: "#555" }}>/{questions.length}</span>
              </div>

              {/* Stars */}
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "12px 0" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    fontSize: "36px",
                    filter: i < heroStars ? "none" : "grayscale(1) opacity(0.2)",
                    animation: i < heroStars ? `starSpin 0.5s ease ${i * 0.15}s both` : "none",
                  }}>⭐</div>
                ))}
              </div>

              {/* Answer trail */}
              <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap", marginTop: "8px" }}>
                {answers.map((a, i) => (
                  <div key={i} style={{
                    width: "32px", height: "32px",
                    borderRadius: "50%",
                    background: a.isCorrect ? "rgba(106,176,76,0.3)" : "rgba(235,77,75,0.3)",
                    border: `2px solid ${a.isCorrect ? "#6ab04c" : "#eb4d4b"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "14px",
                    fontFamily: "'Bangers', Impact, cursive",
                    color: a.isCorrect ? "#6ab04c" : "#eb4d4b",
                  }}>{i + 1}</div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "grid", gap: "10px" }}>
              <button className="cta-btn" onClick={() => startQuiz(belt)}
                style={{
                  background: `linear-gradient(135deg, ${heroData.color}, ${heroData.accent})`,
                  border: "3px solid #000", borderRadius: "14px", padding: "16px",
                  fontFamily: "'Bangers', Impact, cursive", fontSize: "22px", letterSpacing: "3px",
                  color: "#000", cursor: "pointer",
                  boxShadow: `4px 4px 0 #000`,
                  transition: "all 0.2s",
                }}>🔄 PLAY AGAIN!</button>
              <button className="cta-btn" onClick={() => setScreen("belt-select")}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: `2px solid ${heroData.color}44`, borderRadius: "14px", padding: "14px",
                  fontFamily: "'Bangers', Impact, cursive", fontSize: "18px", letterSpacing: "2px",
                  color: heroData.color, cursor: "pointer",
                  transition: "all 0.2s",
                }}>⚔️ NEW MISSION</button>
              <button className="cta-btn" onClick={() => setScreen("hero-select")}
                style={{
                  background: "transparent",
                  border: "2px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "12px",
                  fontFamily: "'Bangers', Impact, cursive", fontSize: "16px", letterSpacing: "2px",
                  color: "#666", cursor: "pointer",
                  transition: "all 0.2s",
                }}>🦸 CHANGE HERO</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
