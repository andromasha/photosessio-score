import { useState, useEffect, useRef, useCallback } from "react";

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const T = {
  en: {
    brand: "photosessio",
    tagline: "Visual Identity Intelligence",
    langPrompt: "Choose your language",
    heroTitle: "How does your brand look to the world?",
    heroSub: "Upload your profiles or share your links. Get a professional AI audit of your visual identity — free, in 3 minutes.",
    startBtn: "Start My Audit →",
    free: "Free · No login · 3 minutes",
    step1: "Your Business",
    step2: "Your Channels",
    step3: "Analysis",
    step4: "Your Results",
    bizName: "Business / Brand Name",
    bizType: "Type of Business",
    bizCity: "City",
    bizNamePh: "e.g. Mimis Optics",
    bizTypePh: "e.g. Hair salon, Restaurant, Photographer...",
    bizCityPh: "e.g. Athens",
    nextBtn: "Continue →",
    backBtn: "← Back",
    channelTitle: "Add at least one channel",
    channelSub: "Upload a screenshot, paste a link, or skip. The more you share, the richer your report.",
    upload: "Upload screenshot",
    orLink: "or paste link / handle",
    skip: "Skip this channel",
    skipDone: "Skipped",
    uploaded: "Screenshot ready",
    analyzeBtn: "Analyze My Brand →",
    analyzing: "Analyzing your visual identity...",
    analyzeSteps: [
      "Reading your visual content...",
      "Evaluating brand consistency...",
      "Measuring emotional impact...",
      "Detecting authenticity signals...",
      "Checking strategic presence...",
      "Building your profile...",
    ],
    previewTitle: "Your Visual Identity Archetype",
    unlockBtn: "Unlock My Full Report →",
    emailPh: "your@email.com",
    emailNote: "No spam. Unsubscribe anytime.",
    reportTitle: "Your Full Visual Identity Report",
    channelBreakdown: "Channel Breakdown",
    topIssues: "Critical Issues",
    quickWins: "Quick Wins This Week",
    expertTeam: "Your Recommended Expert Team",
    ctaTitle: "Ready to transform your visual identity?",
    ctaSub: "Find vetted professionals matched to your needs on Photosessio.",
    ctaBtn: "Find My Expert Team →",
    analyzeAnother: "Analyze Another Brand",
    notAnalyzed: "Not provided — missed opportunity",
    overallScore: "Overall Score",
    dimensions: {
      technical: "Technical Presence",
      branding: "Brand Consistency",
      visual: "Visual Quality",
      emotional: "Emotional Impact",
      strategic: "Strategic Use",
      authenticity: "Human Authenticity",
    },
    theories: {
      technical: "A brand that cannot be found does not exist. Technical presence — whether your profiles are complete, active, and discoverable — is the foundation everything else builds on.",
      branding: "Consistency is the silent language of professionalism. Research shows brands with consistent visual identity are 3.5x more likely to be remembered and trusted by new audiences.",
      visual: "Visual quality communicates competence before a single word is read. Lighting, composition, and editing consistency signal to the viewer whether you take your own brand seriously.",
      emotional: "95% of purchasing decisions are emotional, not rational (Harvard Business School). Your visual tone — warm, bold, calm, energetic — either resonates or is ignored.",
      strategic: "Beautiful content that doesn't convert is decoration. Strategic use of bio, CTAs, highlights, and posting consistency determines whether your presence generates business.",
      authenticity: "In 2026, 71% of consumers can identify AI-generated or inauthentic content and trust it 40% less (Edelman Trust Barometer). Human authenticity is now a competitive advantage.",
    },
    archetypes: {
      visual_leader: { name: "The Visual Leader", emoji: "🌟", desc: "Your brand communicates with authority and intention. Strong across all dimensions — you've built something people trust on sight." },
      creative_soul: { name: "The Creative Soul", emoji: "🎨", desc: "Your aesthetic instinct is exceptional. Your visuals have soul — but the strategy and technical foundation need to match your creative energy." },
      digital_ghost: { name: "The Digital Ghost", emoji: "👻", desc: "You're present but invisible. Your profiles exist but don't communicate who you are or why someone should choose you." },
      ai_trap: { name: "The AI Trap", emoji: "🤖", desc: "Your content looks polished but feels robotic. In an era where authenticity wins, this is a silent trust-killer." },
      hidden_gem: { name: "The Hidden Gem", emoji: "💎", desc: "The quality is there — but no one can see it. Your visual presentation is underselling what you actually offer." },
      rising_brand: { name: "The Rising Brand", emoji: "🚀", desc: "Good bones, clear direction. You're building something real — focused effort on 2-3 dimensions will unlock significant growth." },
    },
    channels: {
      instagram: "Instagram",
      google: "Google Business",
      website: "Website",
      facebook: "Facebook",
      linkedin: "LinkedIn",
    },
    required: "Please fill in all required fields.",
    atLeastOne: "Please add at least one channel.",
    validEmail: "Please enter a valid email.",
  },
  gr: {
    brand: "photosessio",
    tagline: "Visual Identity Intelligence",
    langPrompt: "Επίλεξε γλώσσα",
    heroTitle: "Πώς φαίνεται το brand σου στον κόσμο;",
    heroSub: "Ανέβασε τα profiles σου ή μοιράσου τα links. Πάρε ένα επαγγελματικό AI audit της οπτικής σου ταυτότητας — δωρεάν, σε 3 λεπτά.",
    startBtn: "Ξεκίνα το Audit →",
    free: "Δωρεάν · Χωρίς εγγραφή · 3 λεπτά",
    step1: "Η Επιχείρησή σου",
    step2: "Τα Κανάλια σου",
    step3: "Ανάλυση",
    step4: "Τα Αποτελέσματά σου",
    bizName: "Όνομα Επιχείρησης / Brand",
    bizType: "Τύπος Επιχείρησης",
    bizCity: "Πόλη",
    bizNamePh: "π.χ. Mimis Optics",
    bizTypePh: "π.χ. Κομμωτήριο, Εστιατόριο, Φωτογράφος...",
    bizCityPh: "π.χ. Αθήνα",
    nextBtn: "Συνέχεια →",
    backBtn: "← Πίσω",
    channelTitle: "Πρόσθεσε τουλάχιστον ένα κανάλι",
    channelSub: "Ανέβασε screenshot, βάλε link ή παράλειψε. Όσα περισσότερα μοιραστείς, τόσο πλουσιότερη η ανάλυση.",
    upload: "Ανέβασε screenshot",
    orLink: "ή βάλε link / handle",
    skip: "Παράλειψη",
    skipDone: "Παραλείφθηκε",
    uploaded: "Screenshot έτοιμο",
    analyzeBtn: "Ανάλυσε το Brand μου →",
    analyzing: "Αναλύω την οπτική σου ταυτότητα...",
    analyzeSteps: [
      "Διαβάζω το οπτικό σου περιεχόμενο...",
      "Αξιολογώ τη συνέπεια του brand...",
      "Μετρώ τη συναισθηματική επίδραση...",
      "Ανιχνεύω σήματα αυθεντικότητας...",
      "Ελέγχω τη στρατηγική παρουσία...",
      "Χτίζω το προφίλ σου...",
    ],
    previewTitle: "Ο Αρχέτυπος της Οπτικής σου Ταυτότητας",
    unlockBtn: "Ξεκλείδωσε την Πλήρη Ανάλυση →",
    emailPh: "email@sou.gr",
    emailNote: "Χωρίς spam. Διαγραφή οποτεδήποτε.",
    reportTitle: "Η Πλήρης Ανάλυση Οπτικής Ταυτότητας",
    channelBreakdown: "Ανάλυση ανά Κανάλι",
    topIssues: "Κρίσιμα Προβλήματα",
    quickWins: "Γρήγορες Βελτιώσεις αυτή την Εβδομάδα",
    expertTeam: "Η Ομάδα Ειδικών που Χρειάζεσαι",
    ctaTitle: "Έτοιμος να μεταμορφώσεις την οπτική σου ταυτότητα;",
    ctaSub: "Βρες επαγγελματίες που ταιριάζουν στις ανάγκες σου στο Photosessio.",
    ctaBtn: "Βρες την Ομάδα μου →",
    analyzeAnother: "Ανάλυσε Άλλο Brand",
    notAnalyzed: "Δεν παρασχέθηκε — χαμένη ευκαιρία",
    overallScore: "Συνολικό Score",
    dimensions: {
      technical: "Τεχνική Παρουσία",
      branding: "Συνέπεια Brand",
      visual: "Οπτική Ποιότητα",
      emotional: "Συναισθηματική Επίδραση",
      strategic: "Στρατηγική Χρήση",
      authenticity: "Ανθρώπινη Αυθεντικότητα",
    },
    theories: {
      technical: "Ένα brand που δεν βρίσκεται, δεν υπάρχει. Η τεχνική παρουσία — αν τα profiles σου είναι πλήρη, ενεργά και εντοπίσιμα — είναι το θεμέλιο πάνω στο οποίο χτίζεται τα πάντα.",
      branding: "Η συνέπεια είναι η σιωπηλή γλώσσα του επαγγελματισμού. Έρευνες δείχνουν ότι brands με συνεκτική οπτική ταυτότητα θυμούνται και εμπιστεύονται 3,5 φορές περισσότερο.",
      visual: "Η οπτική ποιότητα επικοινωνεί επάρκεια πριν διαβαστεί μια λέξη. Φωτισμός, σύνθεση και συνέπεια επεξεργασίας σηματοδοτούν αν παίρνεις σοβαρά το δικό σου brand.",
      emotional: "Το 95% των αποφάσεων αγοράς είναι συναισθηματικές, όχι λογικές (Harvard Business School). Ο οπτικός τόνος σου — ζεστός, τολμηρός, ήρεμος, δυναμικός — ή αγγίζει ή αγνοείται.",
      strategic: "Ωραίο περιεχόμενο που δεν μετατρέπεται είναι διακόσμηση. Η στρατηγική χρήση bio, CTAs, highlights και συνέπεια δημοσίευσης καθορίζει αν η παρουσία σου παράγει επιχείρηση.",
      authenticity: "Το 2026, το 71% των καταναλωτών αναγνωρίζει AI-generated ή ανόθευτο περιεχόμενο και το εμπιστεύεται 40% λιγότερο (Edelman Trust Barometer). Η αυθεντικότητα είναι πλέον ανταγωνιστικό πλεονέκτημα.",
    },
    archetypes: {
      visual_leader: { name: "Ο Οπτικός Ηγέτης", emoji: "🌟", desc: "Το brand σου επικοινωνεί με εξουσία και πρόθεση. Δυνατό σε όλες τις διαστάσεις — έχεις χτίσει κάτι που οι άνθρωποι εμπιστεύονται με την πρώτη ματιά." },
      creative_soul: { name: "Η Δημιουργική Ψυχή", emoji: "🎨", desc: "Η αισθητική σου ένστικτο είναι εξαιρετικό. Τα visuals σου έχουν ψυχή — αλλά η στρατηγική και η τεχνική βάση πρέπει να ανταποκριθούν στη δημιουργική σου ενέργεια." },
      digital_ghost: { name: "Το Ψηφιακό Φάντασμα", emoji: "👻", desc: "Είσαι παρών αλλά αόρατος. Τα profiles σου υπάρχουν αλλά δεν επικοινωνούν ποιος είσαι ή γιατί κάποιος να σε επιλέξει." },
      ai_trap: { name: "Η Παγίδα του AI", emoji: "🤖", desc: "Το περιεχόμενό σου φαίνεται γυαλιστερό αλλά νιώθεται ρομποτικό. Σε μια εποχή που κερδίζει η αυθεντικότητα, αυτό είναι ένας σιωπηλός δολοφόνος εμπιστοσύνης." },
      hidden_gem: { name: "Το Κρυφό Διαμάντι", emoji: "💎", desc: "Η ποιότητα υπάρχει — αλλά κανείς δεν την βλέπει. Η οπτική σου παρουσίαση υποτιμά αυτό που πραγματικά προσφέρεις." },
      rising_brand: { name: "Το Ανερχόμενο Brand", emoji: "🚀", desc: "Καλή βάση, σαφής κατεύθυνση. Χτίζεις κάτι πραγματικό — εστιασμένη προσπάθεια σε 2-3 διαστάσεις θα ξεκλειδώσει σημαντική ανάπτυξη." },
    },
    channels: {
      instagram: "Instagram",
      google: "Google Business",
      website: "Website",
      facebook: "Facebook",
      linkedin: "LinkedIn",
    },
    required: "Παρακαλώ συμπλήρωσε όλα τα υποχρεωτικά πεδία.",
    atLeastOne: "Παρακαλώ πρόσθεσε τουλάχιστον ένα κανάλι.",
    validEmail: "Παρακαλώ εισάγαγε έγκυρο email.",
  },
};

// ─── AI PROMPT ───────────────────────────────────────────────────────────────
const buildPrompt = (lang, biz, channels) => {
  const provided = Object.entries(channels)
    .filter(([, v]) => v.link || v.hasImage)
    .map(([k, v]) => `${k}: ${v.link || "screenshot provided"}`)
    .join(", ");

  return `You are a world-class visual brand strategist and image consultant specializing in digital presence for small businesses and personal brands.

Analyze this brand's visual identity:
- Name: ${biz.name}
- Type: ${biz.type}
- City: ${biz.city}
- Channels provided: ${provided || "none specified"}
- Language requested: ${lang === "gr" ? "Greek" : "English"}

Score across 6 dimensions (each 0-100):
1. technical - Profile completeness, discoverability, consistency across platforms
2. branding - Color harmony, logo use, visual consistency, font/style cohesion
3. visual - Photo quality, lighting, composition, editing consistency, image professionalism
4. emotional - Emotional tone clarity, warmth/energy/trust signals, human connection
5. strategic - Bio quality, CTA presence, posting consistency, engagement strategy
6. authenticity - Human vs AI-generated feel, genuine voice, real people shown, organic vs robotic content

Also evaluate these image-specific parameters:
- Color harmony and palette intentionality
- Lighting quality (natural/studio/harsh/flat)
- Composition and framing
- Authenticity feel (real vs staged/stock)
- Emotional tone (warm/cold/energetic/calm — is it intentional?)
- Human presence in imagery
- Background quality
- Editing consistency across posts
- Visual storytelling coherence
- Brand confidence in imagery
- AI/robotic content detection (over-perfect symmetry, unnatural skin, generic stock feel, buzzword-heavy captions, exact posting intervals, no personality)

Determine the archetype (one of: visual_leader, creative_soul, digital_ghost, ai_trap, hidden_gem, rising_brand)

For channels NOT provided, note them as missed opportunities.

Return ONLY valid JSON (no markdown, no extra text):
{
  "overallScore": <0-100>,
  "archetype": "<archetype_key>",
  "archetypeReason": "<2 sentences why this archetype fits, in ${lang === "gr" ? "Greek" : "English"}>",
  "dimensions": {
    "technical": <0-100>,
    "branding": <0-100>,
    "visual": <0-100>,
    "emotional": <0-100>,
    "strategic": <0-100>,
    "authenticity": <0-100>
  },
  "channelScores": {
    "instagram": <0-100 or null if not provided>,
    "google": <0-100 or null>,
    "website": <0-100 or null>,
    "facebook": <0-100 or null>,
    "linkedin": <0-100 or null>
  },
  "channelInsights": {
    "instagram": "<specific finding or null>",
    "google": "<specific finding or null>",
    "website": "<specific finding or null>",
    "facebook": "<specific finding or null>",
    "linkedin": "<specific finding or null>"
  },
  "aiAuthenticityVerdict": {
    "overall": "<green|yellow|red>",
    "detail": "<1-2 sentences about authenticity in ${lang === "gr" ? "Greek" : "English"}>"
  },
  "criticalIssues": ["<issue 1>", "<issue 2>", "<issue 3>"],
  "quickWins": ["<win 1>", "<win 2>", "<win 3>"],
  "expertsNeeded": ["<expert type 1>", "<expert type 2>", "<expert type 3>"],
  "summary": "<3 sentence overall assessment in ${lang === "gr" ? "Greek" : "English"}>"
}`;
};

// ─── COLORS ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#0e0818",
  card: "#160d24",
  cardBorder: "#2a1545",
  accent: "#f5a623",
  accentDim: "#f5a62322",
  purple: "#8b5cf6",
  purpleDim: "#8b5cf622",
  purpleLight: "#c4b5fd",
  pink: "#ec4899",
  white: "#ffffff",
  muted: "#8b7aa8",
  mutedDim: "#8b7aa822",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  text: "#f1ecff",
};

const scoreColor = (s) => s >= 70 ? C.success : s >= 45 ? C.warning : C.danger;
const scoreLabel = (s, t) => {
  if (t === "gr") return s >= 70 ? "Δυνατό" : s >= 45 ? "Χρειάζεται Δουλειά" : "Κρίσιμο";
  return s >= 70 ? "Strong" : s >= 45 ? "Needs Work" : "Critical";
};

// ─── RADAR CHART ─────────────────────────────────────────────────────────────
function RadarChart({ scores, labels, size = 260 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const keys = Object.keys(scores);
  const n = keys.length;
  const pts = (scale) => keys.map((_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return [cx + Math.cos(angle) * r * scale, cy + Math.sin(angle) * r * scale];
  });
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = pts(1).map(([x, y], i) => {
    const val = Object.values(scores)[i] / 100;
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return [cx + Math.cos(angle) * r * val, cy + Math.sin(angle) * r * val];
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + "Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {gridLevels.map((level) => (
        <polygon key={level} points={pts(level).map(p => p.join(",")).join(" ")}
          fill="none" stroke={C.cardBorder} strokeWidth="1" />
      ))}
      {pts(1).map(([x, y], i) => (
        <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={C.cardBorder} strokeWidth="1" />
      ))}
      <path d={dataPath} fill={`${C.purple}33`} stroke={C.purple} strokeWidth="2"
        style={{ filter: `drop-shadow(0 0 6px ${C.purple}88)` }} />
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={C.purple}
          style={{ filter: `drop-shadow(0 0 4px ${C.purple})` }} />
      ))}
      {pts(1).map(([x, y], i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
        const lx = cx + Math.cos(angle) * (r + 22);
        const ly = cy + Math.sin(angle) * (r + 22);
        const val = Object.values(scores)[i];
        return (
          <g key={i}>
            <text x={lx} y={ly - 5} textAnchor="middle" fill={C.muted} fontSize="8" fontFamily="sans-serif">
              {Object.values(labels)[i]}
            </text>
            <text x={lx} y={ly + 7} textAnchor="middle" fill={scoreColor(val)} fontSize="10" fontWeight="bold" fontFamily="sans-serif">
              {val}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── ANIMATED NUMBER ─────────────────────────────────────────────────────────
function AnimNum({ target, dur = 1800 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const s = Date.now();
    const t = setInterval(() => {
      const p = Math.min((Date.now() - s) / dur, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p >= 1) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [target]);
  return <>{v}</>;
}

// ─── CIRCLE GAUGE ────────────────────────────────────────────────────────────
function CircleGauge({ score, size = 140 }) {
  const R = 52, circ = 2 * Math.PI * R;
  const [anim, setAnim] = useState(0);
  useEffect(() => {
    const s = Date.now();
    const t = setInterval(() => {
      const p = Math.min((Date.now() - s) / 1800, 1);
      setAnim(Math.round((1 - Math.pow(1 - p, 3)) * score));
      if (p >= 1) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [score]);
  const color = scoreColor(score);
  const offset = circ - (anim / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={R} fill="none" stroke={C.cardBorder} strokeWidth="9" />
      <circle cx="60" cy="60" r={R} fill="none" stroke={color} strokeWidth="9"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dashoffset 0.04s linear", filter: `drop-shadow(0 0 10px ${color})` }} />
      <text x="60" y="56" textAnchor="middle" fill={color} fontSize="24" fontWeight="bold" fontFamily="Georgia,serif">{anim}</text>
      <text x="60" y="70" textAnchor="middle" fill={C.muted} fontSize="8" fontFamily="sans-serif">/ 100</text>
    </svg>
  );
}

// ─── CHANNEL INPUT CARD ──────────────────────────────────────────────────────
function ChannelCard({ channelKey, label, icon, state, onChange, t }) {
  const fileRef = useRef();
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target.result);
      onChange({ ...state, hasImage: true, imageData: ev.target.result.split(",")[1], imageType: file.type, link: "" });
    };
    reader.readAsDataURL(file);
  };

  const isActive = state.hasImage || state.link;
  const isSkipped = state.skipped;

  return (
    <div style={{
      background: isActive ? `${C.purple}11` : isSkipped ? C.mutedDim : C.card,
      border: `1px solid ${isActive ? C.purple : isSkipped ? C.mutedDim : C.cardBorder}`,
      borderRadius: 14, padding: "16px", marginBottom: 12,
      transition: "all 0.3s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ color: C.text, fontWeight: "bold", fontSize: 14, fontFamily: "sans-serif" }}>{label}</span>
        {isActive && <span style={{ marginLeft: "auto", background: `${C.success}22`, color: C.success, fontSize: 11, padding: "2px 10px", borderRadius: 20, fontFamily: "sans-serif" }}>✓ {t.uploaded}</span>}
        {isSkipped && <span style={{ marginLeft: "auto", color: C.muted, fontSize: 11, fontFamily: "sans-serif" }}>{t.skipDone}</span>}
      </div>

      {!isSkipped && (
        <>
          {preview ? (
            <div style={{ position: "relative" }}>
              <img src={preview} alt="preview" style={{ width: "100%", maxHeight: 120, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />
              <button onClick={() => { setPreview(null); onChange({ ...state, hasImage: false, imageData: null, imageType: null }); }}
                style={{ position: "absolute", top: 6, right: 6, background: C.danger, color: "#fff", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", fontSize: 12 }}>×</button>
            </div>
          ) : (
            <button onClick={() => fileRef.current.click()} style={{
              width: "100%", padding: "10px", background: C.purpleDim,
              border: `1px dashed ${C.purple}66`, borderRadius: 8, color: C.purpleLight,
              fontSize: 13, cursor: "pointer", fontFamily: "sans-serif", marginBottom: 8
            }}>
              📎 {t.upload}
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
          <input
            placeholder={t.orLink}
            value={state.link || ""}
            onChange={e => onChange({ ...state, link: e.target.value, hasImage: false, imageData: null })}
            style={{
              width: "100%", background: C.bg, border: `1px solid ${C.cardBorder}`,
              borderRadius: 8, padding: "9px 12px", color: C.text, fontSize: 13,
              fontFamily: "sans-serif", outline: "none", boxSizing: "border-box",
            }}
          />
        </>
      )}

      <button onClick={() => onChange({ ...state, skipped: !isSkipped, hasImage: false, imageData: null, link: "", imageType: null })}
        style={{
          marginTop: 8, background: "transparent", border: "none",
          color: isSkipped ? C.purple : C.muted, fontSize: 12,
          cursor: "pointer", fontFamily: "sans-serif", padding: 0,
        }}>
        {isSkipped ? `↩ ${t.upload}` : `— ${t.skip}`}
      </button>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState(null);
  const [step, setStep] = useState("lang");
  const [biz, setBiz] = useState({ name: "", type: "", city: "" });
  const [channels, setChannels] = useState({
    instagram: { hasImage: false, imageData: null, imageType: null, link: "", skipped: false },
    google: { hasImage: false, imageData: null, imageType: null, link: "", skipped: false },
    website: { hasImage: false, imageData: null, imageType: null, link: "", skipped: false },
    facebook: { hasImage: false, imageData: null, imageType: null, link: "", skipped: false },
    linkedin: { hasImage: false, imageData: null, imageType: null, link: "", skipped: false },
  });
  const [result, setResult] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState(0);
  const [emailDone, setEmailDone] = useState(false);

  const t = lang ? T[lang] : T.en;

  const channelIcons = { instagram: "📸", google: "🔍", website: "🌐", facebook: "👥", linkedin: "💼" };

  const hasAtLeastOne = Object.values(channels).some(c => c.hasImage || c.link);

  const runAnalysis = async () => {
    setStep("analyzing");
    setProgress(0);
    setProgressMsg(0);

    const msgInt = setInterval(() => setProgressMsg(p => Math.min(p + 1, t.analyzeSteps.length - 1)), 900);
    const progInt = setInterval(() => setProgress(p => { if (p >= 88) { clearInterval(progInt); return 88; } return p + Math.random() * 6; }), 250);

    try {
      const messages = [];
      const contentParts = [];

      contentParts.push({ type: "text", text: buildPrompt(lang, biz, channels) });

      Object.entries(channels).forEach(([key, val]) => {
        if (val.hasImage && val.imageData) {
          contentParts.push({
            type: "image",
            source: { type: "base64", media_type: val.imageType || "image/jpeg", data: val.imageData }
          });
          contentParts.push({ type: "text", text: `[Above image is the ${key} screenshot]` });
        }
      });

      messages.push({ role: "user", content: contentParts });

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, messages }),
      });
      const data = await res.json();
      const raw = data.content?.find(b => b.type === "text")?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      clearInterval(msgInt); clearInterval(progInt);
      setProgress(100);
      setResult(parsed);
      setTimeout(() => setStep("preview"), 700);
    } catch (err) {
      clearInterval(msgInt); clearInterval(progInt);
      setError("Analysis failed. Please try again.");
      setStep("channels");
    }
  };

  const S = {
    app: { minHeight: "100vh", background: `radial-gradient(ellipse at 15% 15%, #2d1054 0%, ${C.bg} 55%, #060410 100%)`, fontFamily: "Georgia, serif", color: C.text, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
    card: { background: `linear-gradient(160deg, ${C.card} 0%, #100820 100%)`, border: `1px solid ${C.cardBorder}`, borderRadius: 22, padding: "36px 32px", maxWidth: 540, width: "100%", boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 40px ${C.purple}18` },
    logo: { fontSize: 11, letterSpacing: 4, color: C.accent, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 4 },
    tagline: { fontSize: 10, letterSpacing: 2, color: C.muted, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 20 },
    h1: { fontSize: 26, fontWeight: "bold", lineHeight: 1.25, marginBottom: 10, background: `linear-gradient(135deg, ${C.white} 0%, ${C.purpleLight} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    sub: { color: C.muted, fontSize: 14, lineHeight: 1.65, marginBottom: 28, fontFamily: "sans-serif" },
    btn: { background: `linear-gradient(135deg, ${C.accent}, #e09510)`, color: "#100820", border: "none", borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: "bold", cursor: "pointer", width: "100%", fontFamily: "sans-serif", boxShadow: `0 4px 24px ${C.accent}44` },
    btnSec: { background: "transparent", color: C.muted, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: "12px 24px", fontSize: 13, cursor: "pointer", width: "100%", fontFamily: "sans-serif", marginTop: 10 },
    input: { background: `${C.purple}11`, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: "13px 16px", color: C.text, fontSize: 14, width: "100%", outline: "none", fontFamily: "sans-serif", boxSizing: "border-box", marginBottom: 14 },
    label: { color: C.muted, fontSize: 11, fontFamily: "sans-serif", marginBottom: 5, display: "block", letterSpacing: 0.8, textTransform: "uppercase" },
    err: { background: "#ef444418", border: `1px solid ${C.danger}44`, borderRadius: 8, padding: "10px 14px", color: C.danger, fontSize: 13, marginBottom: 14, fontFamily: "sans-serif" },
    stepBar: { display: "flex", gap: 6, marginBottom: 28 },
    stepDot: (active, done) => ({ flex: 1, height: 3, borderRadius: 3, background: done ? C.purple : active ? C.accent : C.cardBorder, transition: "background 0.4s" }),
  };

  // LANGUAGE SELECT
  if (step === "lang") return (
    <div style={S.app}>
      <div style={{ ...S.card, textAlign: "center" }}>
        <div style={S.logo}>photosessio</div>
        <div style={S.tagline}>Visual Identity Intelligence</div>
        <div style={{ fontSize: 48, marginBottom: 20 }}>🌐</div>
        <h1 style={{ ...S.h1, fontSize: 22, marginBottom: 24 }}>{T.en.langPrompt} / {T.gr.langPrompt}</h1>
        <div style={{ display: "flex", gap: 14 }}>
          {[["en", "🇬🇧", "English"], ["gr", "🇬🇷", "Ελληνικά"]].map(([code, flag, name]) => (
            <button key={code} onClick={() => { setLang(code); setStep("biz"); }} style={{
              flex: 1, background: C.purpleDim, border: `1px solid ${C.purple}44`,
              borderRadius: 14, padding: "20px 16px", cursor: "pointer", color: C.text,
              fontFamily: "sans-serif", fontSize: 15, fontWeight: "bold",
              transition: "all 0.2s",
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{flag}</div>
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const stepIndex = ["biz", "channels", "analyzing", "preview", "email", "report"].indexOf(step);

  // BUSINESS INFO
  if (step === "biz") return (
    <div style={S.app}>
      <div style={S.card}>
        <div style={S.logo}>{t.brand}</div>
        <div style={S.stepBar}>
          {[0, 1, 2, 3].map(i => <div key={i} style={S.stepDot(i === 0, i < 0)} />)}
        </div>
        <h1 style={{ ...S.h1, fontSize: 22, marginBottom: 6 }}>{t.step1}</h1>
        <p style={{ ...S.sub, marginBottom: 20 }}>{t.heroSub}</p>
        {error && <div style={S.err}>{error}</div>}
        <label style={S.label}>{t.bizName} *</label>
        <input style={S.input} placeholder={t.bizNamePh} value={biz.name} onChange={e => setBiz({ ...biz, name: e.target.value })} />
        <label style={S.label}>{t.bizType} *</label>
        <input style={S.input} placeholder={t.bizTypePh} value={biz.type} onChange={e => setBiz({ ...biz, type: e.target.value })} />
        <label style={S.label}>{t.bizCity} *</label>
        <input style={S.input} placeholder={t.bizCityPh} value={biz.city} onChange={e => setBiz({ ...biz, city: e.target.value })} />
        <button style={S.btn} onClick={() => {
          if (!biz.name || !biz.type || !biz.city) { setError(t.required); return; }
          setError(""); setStep("channels");
        }}>{t.nextBtn}</button>
        <button style={S.btnSec} onClick={() => setStep("lang")}>← Language</button>
      </div>
    </div>
  );

  // CHANNELS
  if (step === "channels") return (
    <div style={S.app}>
      <div style={S.card}>
        <div style={S.logo}>{t.brand}</div>
        <div style={S.stepBar}>
          {[0, 1, 2, 3].map(i => <div key={i} style={S.stepDot(i === 1, i < 1)} />)}
        </div>
        <h1 style={{ ...S.h1, fontSize: 20, marginBottom: 6 }}>{t.channelTitle}</h1>
        <p style={{ ...S.sub, fontSize: 13, marginBottom: 20 }}>{t.channelSub}</p>
        {error && <div style={S.err}>{error}</div>}
        {Object.entries(channels).map(([key, val]) => (
          <ChannelCard key={key} channelKey={key} label={t.channels[key]} icon={channelIcons[key]}
            state={val} onChange={v => setChannels({ ...channels, [key]: v })} t={t} />
        ))}
        <button style={{ ...S.btn, marginTop: 8 }} onClick={() => {
          if (!hasAtLeastOne) { setError(t.atLeastOne); return; }
          setError(""); runAnalysis();
        }}>{t.analyzeBtn}</button>
        <button style={S.btnSec} onClick={() => setStep("biz")}>{t.backBtn}</button>
      </div>
    </div>
  );

  // ANALYZING
  if (step === "analyzing") return (
    <div style={{ ...S.app }}>
      <div style={{ ...S.card, textAlign: "center" }}>
        <div style={S.logo}>{t.brand}</div>
        <div style={{ fontSize: 52, marginBottom: 18 }}>🔬</div>
        <h2 style={{ ...S.h1, fontSize: 20, marginBottom: 6 }}>{t.analyzing}</h2>
        <p style={{ color: C.muted, fontSize: 13, fontFamily: "sans-serif", marginBottom: 28, minHeight: 18 }}>
          {t.analyzeSteps[progressMsg]}
        </p>
        <div style={{ background: C.cardBorder, borderRadius: 10, height: 6, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ width: `${progress}%`, height: "100%", borderRadius: 10, background: `linear-gradient(90deg, ${C.purple}, ${C.accent})`, transition: "width 0.35s ease", boxShadow: `0 0 12px ${C.accent}66` }} />
        </div>
        <p style={{ color: C.muted, fontSize: 11, fontFamily: "sans-serif" }}>{Math.round(progress)}%</p>
      </div>
    </div>
  );

  // PREVIEW
  if (step === "preview" && result) {
    const arch = t.archetypes[result.archetype] || t.archetypes.rising_brand;
    return (
      <div style={S.app}>
        <div style={{ ...S.card, textAlign: "center" }}>
          <div style={S.logo}>{t.brand}</div>
          <p style={{ color: C.muted, fontSize: 12, fontFamily: "sans-serif", marginBottom: 6 }}>{t.previewTitle}</p>
          <div style={{ fontSize: 52, marginBottom: 8 }}>{arch.emoji}</div>
          <h2 style={{ ...S.h1, fontSize: 24, marginBottom: 4 }}>{arch.name}</h2>
          <p style={{ color: C.muted, fontSize: 13, fontFamily: "sans-serif", lineHeight: 1.6, marginBottom: 24, maxWidth: 380, margin: "0 auto 24px" }}>{arch.desc}</p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <CircleGauge score={result.overallScore} size={150} />
          </div>
          <div style={{ display: "inline-block", background: `${scoreColor(result.overallScore)}22`, color: scoreColor(result.overallScore), border: `1px solid ${scoreColor(result.overallScore)}44`, borderRadius: 20, padding: "5px 16px", fontSize: 13, fontFamily: "sans-serif", fontWeight: "bold", marginBottom: 24 }}>
            {scoreLabel(result.overallScore, lang)}
          </div>
          <div style={{ background: `${C.accent}11`, border: `1px solid ${C.accent}33`, borderRadius: 14, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
            <p style={{ color: C.accent, fontSize: 12, fontFamily: "sans-serif", fontWeight: "bold", marginBottom: 8 }}>🔒 {lang === "gr" ? "Η πλήρης ανάλυση περιλαμβάνει:" : "Your full report includes:"}</p>
            {[
              lang === "gr" ? "Radar chart 6 διαστάσεων" : "6-dimension radar chart",
              lang === "gr" ? "Ανάλυση ανά κανάλι" : "Per-channel breakdown",
              lang === "gr" ? "Έλεγχος AI αυθεντικότητας" : "AI authenticity verdict",
              lang === "gr" ? "3 κρίσιμα προβλήματα + γρήγορες λύσεις" : "3 critical issues + quick wins",
              lang === "gr" ? "Ομάδα ειδικών που χρειάζεσαι" : "Your expert team recommendation",
            ].map((item, i) => <p key={i} style={{ color: C.muted, fontSize: 12, fontFamily: "sans-serif", marginBottom: 3 }}>✓ {item}</p>)}
          </div>
          <button style={S.btn} onClick={() => setStep("email")}>{t.unlockBtn}</button>
        </div>
      </div>
    );
  }

  // EMAIL GATE
  if (step === "email") return (
    <div style={S.app}>
      <div style={{ ...S.card, textAlign: "center" }}>
        <div style={S.logo}>{t.brand}</div>
        <div style={{ fontSize: 44, marginBottom: 16 }}>📩</div>
        <h2 style={{ ...S.h1, fontSize: 22, marginBottom: 8 }}>{lang === "gr" ? "Πού να στείλουμε την ανάλυσή σου;" : "Where should we send your report?"}</h2>
        <p style={{ color: C.muted, fontSize: 13, fontFamily: "sans-serif", marginBottom: 24 }}>
          {lang === "gr" ? `Βάλε το email σου για να ξεκλειδώσεις την πλήρη ανάλυση για ${biz.name}.` : `Enter your email to unlock the full Visual Identity analysis for ${biz.name}.`}
        </p>
        {error && <div style={S.err}>{error}</div>}
        <input style={{ ...S.input, textAlign: "center", fontSize: 15 }} placeholder={t.emailPh} type="email" value={email}
          onChange={e => { setEmail(e.target.value); setError(""); }} />
        {emailDone
          ? <div style={{ background: `${C.success}22`, border: `1px solid ${C.success}44`, borderRadius: 12, padding: "14px", color: C.success, fontFamily: "sans-serif", fontSize: 14 }}>✓ {lang === "gr" ? "Φορτώνω την ανάλυσή σου..." : "Loading your report..."}</div>
          : <button style={S.btn} onClick={() => {
            if (!email.includes("@")) { setError(t.validEmail); return; }
            setEmailDone(true);
            setTimeout(() => setStep("report"), 900);
          }}>{t.unlockBtn}</button>
        }
        <p style={{ color: C.muted, fontSize: 11, marginTop: 10, fontFamily: "sans-serif" }}>{t.emailNote}</p>
      </div>
    </div>
  );

  // FULL REPORT
  if (step === "report" && result) {
    const arch = t.archetypes[result.archetype] || t.archetypes.rising_brand;
    const verdictColor = { green: C.success, yellow: C.warning, red: C.danger }[result.aiAuthenticityVerdict?.overall] || C.muted;
    const verdictEmoji = { green: "🟢", yellow: "🟡", red: "🔴" }[result.aiAuthenticityVerdict?.overall] || "⚪";

    return (
      <div style={S.app}>
        <div style={S.card}>
          <div style={S.logo}>{t.brand}</div>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <CircleGauge score={result.overallScore} size={100} />
            <div>
              <p style={{ color: C.muted, fontSize: 11, fontFamily: "sans-serif", marginBottom: 3 }}>{t.overallScore}</p>
              <h2 style={{ ...S.h1, fontSize: 18, marginBottom: 4 }}>{biz.name}</h2>
              <div style={{ fontSize: 18 }}>{arch.emoji} <span style={{ color: C.accent, fontSize: 13, fontFamily: "sans-serif", fontWeight: "bold" }}>{arch.name}</span></div>
            </div>
          </div>

          <p style={{ color: C.muted, fontSize: 13, fontFamily: "sans-serif", lineHeight: 1.6, marginBottom: 20 }}>{result.summary}</p>

          {/* Radar */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <RadarChart scores={result.dimensions} labels={t.dimensions} size={260} />
          </div>

          {/* Dimension breakdown */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ color: C.accent, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
              {lang === "gr" ? "Ανάλυση Διαστάσεων" : "Dimension Analysis"}
            </p>
            {Object.entries(result.dimensions).map(([key, score]) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: C.text, fontSize: 13, fontFamily: "sans-serif" }}>{t.dimensions[key]}</span>
                  <span style={{ color: scoreColor(score), fontSize: 13, fontWeight: "bold", fontFamily: "sans-serif" }}>{score}/100</span>
                </div>
                <div style={{ background: C.cardBorder, borderRadius: 6, height: 6, overflow: "hidden", marginBottom: 4 }}>
                  <div style={{ width: `${score}%`, height: "100%", background: `linear-gradient(90deg, ${scoreColor(score)}, ${scoreColor(score)}bb)`, borderRadius: 6, boxShadow: `0 0 6px ${scoreColor(score)}66` }} />
                </div>
                <p style={{ color: C.muted, fontSize: 11, fontFamily: "sans-serif", lineHeight: 1.5 }}>{t.theories[key]}</p>
              </div>
            ))}
          </div>

          {/* AI Authenticity */}
          <div style={{ background: `${verdictColor}11`, border: `1px solid ${verdictColor}33`, borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
            <p style={{ color: verdictColor, fontSize: 12, fontFamily: "sans-serif", fontWeight: "bold", marginBottom: 6 }}>
              {verdictEmoji} {lang === "gr" ? "Έλεγχος Αυθεντικότητας AI" : "AI Authenticity Check"}
            </p>
            <p style={{ color: C.text, fontSize: 13, fontFamily: "sans-serif", lineHeight: 1.5 }}>{result.aiAuthenticityVerdict?.detail}</p>
          </div>

          {/* Channel breakdown */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: C.accent, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>{t.channelBreakdown}</p>
            {Object.entries(result.channelScores).map(([key, score]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "10px 12px", background: score ? C.purpleDim : C.mutedDim, borderRadius: 10 }}>
                <span style={{ fontSize: 16 }}>{channelIcons[key]}</span>
                <span style={{ color: C.text, fontSize: 13, fontFamily: "sans-serif", flex: 1 }}>{t.channels[key]}</span>
                {score !== null
                  ? <span style={{ color: scoreColor(score), fontWeight: "bold", fontSize: 13, fontFamily: "sans-serif" }}>{score}/100</span>
                  : <span style={{ color: C.muted, fontSize: 11, fontFamily: "sans-serif" }}>{t.notAnalyzed}</span>
                }
              </div>
            ))}
          </div>

          {/* Critical issues */}
          <div style={{ background: `${C.danger}11`, border: `1px solid ${C.danger}33`, borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
            <p style={{ color: C.danger, fontSize: 11, fontFamily: "sans-serif", fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>⚠ {t.topIssues}</p>
            {result.criticalIssues?.map((issue, i) => (
              <p key={i} style={{ color: C.text, fontSize: 13, fontFamily: "sans-serif", marginBottom: 5, lineHeight: 1.5 }}>{i + 1}. {issue}</p>
            ))}
          </div>

          {/* Quick wins */}
          <div style={{ background: `${C.success}11`, border: `1px solid ${C.success}33`, borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
            <p style={{ color: C.success, fontSize: 11, fontFamily: "sans-serif", fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>⚡ {t.quickWins}</p>
            {result.quickWins?.map((win, i) => (
              <p key={i} style={{ color: C.text, fontSize: 13, fontFamily: "sans-serif", marginBottom: 5, lineHeight: 1.5 }}>✓ {win}</p>
            ))}
          </div>

          {/* Experts */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: C.accent, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>{t.expertTeam}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {result.expertsNeeded?.map((exp, i) => (
                <span key={i} style={{ background: C.purpleDim, border: `1px solid ${C.purple}44`, color: C.purpleLight, borderRadius: 20, padding: "6px 14px", fontSize: 12, fontFamily: "sans-serif" }}>{exp}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: `linear-gradient(135deg, ${C.purple}22, ${C.accent}11)`, border: `1px solid ${C.accent}33`, borderRadius: 16, padding: "22px", textAlign: "center", marginBottom: 14 }}>
            <p style={{ color: C.white, fontSize: 16, fontWeight: "bold", marginBottom: 6, fontFamily: "sans-serif" }}>{t.ctaTitle}</p>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 18, fontFamily: "sans-serif" }}>{t.ctaSub}</p>
            <button style={S.btn}>{t.ctaBtn}</button>
          </div>

          <button style={S.btnSec} onClick={() => {
            setStep("lang"); setResult(null); setEmail("");
            setBiz({ name: "", type: "", city: "" });
            setChannels(Object.fromEntries(Object.keys(channels).map(k => [k, { hasImage: false, imageData: null, imageType: null, link: "", skipped: false }])));
          }}>{t.analyzeAnother}</button>
        </div>
      </div>
    );
  }

  return null;
}
