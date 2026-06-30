import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Globe2, Sparkles, TerminalSquare, ChevronLeft, Hexagon, Cpu, Layers, Target, PenTool, Users, Quote, Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2, ChevronRight, Terminal, Play, X, Share2, Eye, Youtube, Facebook, Instagram, Volume2, VolumeX } from 'lucide-react';

const staticFilesUrl = 'https://www.gstatic.com/aistudio/starter-apps/type-motion/';

const PROJECTS = [
  { id: '1', title: 'ענני מחשבה', category: '3d', video: staticFilesUrl + 'clouds_v2.mp4', youtubeId: '', type: 'הנפשה ותלת־ממד' },
  { id: '2', title: 'יסודות האש', category: 'promo', video: staticFilesUrl + 'fire_v2.mp4', youtubeId: '', type: 'סרטוני תדמית ושיווק' },
  { id: '3', title: 'עשן מיסטי', category: 'edu', video: staticFilesUrl + 'smoke_v2.mp4', youtubeId: '', type: 'יצירה חינוכית ודפוס' },
  { id: '4', title: 'גל מים', category: 'dev', video: staticFilesUrl + 'water_v2.mp4', youtubeId: '', type: 'פיתוח וסביבות רשת' },
  { id: '5', title: 'תנועה קוונטית', category: '3d', video: staticFilesUrl + 'clouds_v2.mp4', youtubeId: '', type: 'הנפשה ותלת־ממד' },
  { id: '6', title: 'קמפיין הולוגרפי', category: 'promo', video: staticFilesUrl + 'fire_v2.mp4', youtubeId: '', type: 'סרטוני תדמית ושיווק' },
];

const CATEGORIES = [
  { id: 'all', label: 'הכל' },
  { id: '3d', label: 'הנפשה ותלת־ממד' },
  { id: 'promo', label: 'סרטוני תדמית ושיווק' },
  { id: 'edu', label: 'יצירה חינוכית ודפוס' },
  { id: 'dev', label: 'פיתוח וסביבות רשת' },
];

const MESSAGES = [
  {
    title: 'אמת ביצירה',
    desc: 'אנו מביאים את הסיפור הייחודי שלכם לקדמת הבמה, בלי מסכות, בדיוק כפי שהוא – בצורה המרשימה ביותר.',
    icon: Target,
    color: 'text-fuchsia-400'
  },
  {
    title: 'מילים שנוגעות',
    desc: 'כל טקסט, תסריט או קריינות נכתבים מתוך כבוד עצום לשפה, לתוכן ולקהל היעד שלכם.',
    icon: PenTool,
    color: 'text-purple-400'
  },
  {
    title: 'שותפות לדרך',
    desc: 'ההצלחה שלכם היא ההצלחה שלנו. אנו מלווים אתכם צעד אחר צעד, מרגע התכנון ועד לתוצאה המוגמרת.',
    icon: Users,
    color: 'text-fuchsia-200'
  }
];

const TESTIMONIALS = [
  {
    text: "פנינו לאקו מדיה כדי לשדרג את הנראות של העסק. הצוות יצר עבורנו תסריטים קולעים, תוכן חזותי מרהיב וחומרים שיווקיים שחידשו לחלוטין את הפנים של 'מני נפתלי שיפוצים'. המקצועיות, הדיוק וההקשבה היו מעל ומעבר לכל ציפייה. עבודה פשוט מצוינת.",
    author: "מני נפתלי",
    title: "הפכו את החזון שלנו למציאות"
  },
  {
    text: "תהליך העבודה על עיבוד הסיפורים הכתובים והפיכתם לתוכן חזותי המונפש בתלת־ממד היה קסום. הצוות של אקו מדיה הצליח להפיח חיים בדמויות שלנו תוך שמירה קפדנית על המסרים הערכיים והשפה העשירה. חווית יצירה משותפת יוצאת דופן.",
    author: "סופרת ויוצרת שותפה",
    title: "חיבור נדיר בין חינוך לטכנולוגיה"
  }
];

const CONTACT_INFO = [
  { icon: Phone, text: '053-4262621' },
  { icon: Mail, text: 'ecomediaisrael@gmail.com' },
  { icon: MapPin, text: 'העיר עפולה (פגישות בתיאום מראש)' },
  { icon: Clock, text: "א' - ה', 09:00 - 18:00" },
  { icon: Youtube, text: 'ערוץ היוטיוב שלנו', link: 'https://www.youtube.com/@eco2034' },
  { icon: Facebook, text: 'הפייסבוק שלנו', link: 'https://www.facebook.com/ecomedia26/' },
  { icon: Instagram, text: 'האינסטגרם שלנו', link: 'https://www.instagram.com/eco_media_israel/' },
];

const HolographicContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    services: [] as string[],
    vision: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const servicesList = [
    { id: 'video', title: 'הפקה חזותית והנפשה', desc: 'סרטונים, תלת־ממד וקריינות' },
    { id: 'copy', title: 'כתיבה שיווקית ועיצוב תדמית', desc: 'מיתוג, תוכן וקופירייטינג' },
    { id: 'code', title: 'פיתוח סביבות וקוד', desc: 'הנגשת ידע, תבניות ומערכות דיגיטליות' },
    { id: 'edu', title: 'יצירה חינוכית', desc: 'הוצאה לאור, עיבוד סיפורים וערכים' },
  ];

  const handleServiceToggle = (title: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(title)
        ? prev.services.filter(s => s !== title)
        : [...prev.services, title]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="glass-panel holo-border rounded-[2rem] p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-20 h-20 rounded-full bg-fuchsia-500/20 border border-fuchsia-400 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,0,170,0.4)]">
          <CheckCircle2 className="w-10 h-10 text-fuchsia-300" />
        </div>
        <h3 className="text-2xl font-bold text-white text-glow-pink mb-4">
          השדר התקבל במערכות אקו מדיה ישראל.
        </h3>
        <p className="text-fuchsia-100/70 font-mono">
          אנו מעבדים את הנתונים וניצור קשר בהקדם.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel holo-border rounded-[2rem] p-8 md:p-10 relative overflow-hidden bg-black/40">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-50" />
      
      <div className="mb-10 text-center">
        <h3 className="text-3xl font-black text-white text-glow-pink mb-2">פתיחת ערוץ תקשורת</h3>
        <p className="text-gray-400 font-light">הזינו את נתוני המיזם, והמערכות שלנו יחלו בהכנות לקראת היצירה המשותפת.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
        
        {/* Step 1: Personal Details */}
        <div className="space-y-6">
          <h4 className="text-fuchsia-300 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
            שלב 1: אימות נתונים
          </h4>
          <div className="space-y-5">
            <div className="relative">
              <input 
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b border-white/20 focus:border-fuchsia-400 focus:shadow-[0_1px_15px_rgba(255,0,170,0.3)] transition-all outline-none py-3 text-white placeholder:text-gray-600"
                placeholder="מי עומד מאחורי החזון? (שם מלא / עסק)"
              />
            </div>
            <div className="relative">
              <input 
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b border-white/20 focus:border-fuchsia-400 focus:shadow-[0_1px_15px_rgba(255,0,170,0.3)] transition-all outline-none py-3 text-white placeholder:text-gray-600 text-right"
                placeholder="הזן מספר ליצירת קשר מהיר"
                dir="auto"
              />
            </div>
            <div className="relative">
              <input 
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b border-white/20 focus:border-fuchsia-400 focus:shadow-[0_1px_15px_rgba(255,0,170,0.3)] transition-all outline-none py-3 text-white placeholder:text-gray-600 text-right"
                placeholder="הזן כתובת לקבלת חומרים ותוכניות עבודה"
                dir="auto"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Services */}
        <div className="space-y-4">
          <h4 className="text-fuchsia-300 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
            שלב 2: בחירת נתיב יצירה
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {servicesList.map(service => {
              const isSelected = formData.services.includes(service.title);
              return (
                <div 
                  key={service.id}
                  onClick={() => handleServiceToggle(service.title)}
                  className={`cursor-pointer rounded-xl p-4 transition-all duration-300 border ${isSelected ? 'bg-fuchsia-500/20 border-fuchsia-400 shadow-[0_0_15px_rgba(255,0,170,0.3)]' : 'bg-white/5 border-white/10 hover:border-fuchsia-500/50 hover:bg-white/10'}`}
                >
                  <h5 className={`font-bold ${isSelected ? 'text-fuchsia-300 text-glow-pink' : 'text-white'}`}>{service.title}</h5>
                  <p className="text-xs text-gray-400 mt-1">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Vision */}
        <div className="space-y-4">
          <h4 className="text-fuchsia-300 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
            שלב 3: אפיון החזון
          </h4>
          <div className={`bg-[#050508]/80 border ${focusedField === 'vision' ? 'border-fuchsia-400 shadow-[0_0_20px_rgba(255,0,170,0.2)]' : 'border-white/10'} rounded-2xl p-4 font-mono relative overflow-hidden transition-all duration-300`}>
            <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
              <Terminal className="w-4 h-4 text-fuchsia-500" />
              <span className="text-xs text-fuchsia-500/70 uppercase">מהו הרעיון שניצור יחד?</span>
            </div>
            <textarea
              required
              value={formData.vision}
              onChange={e => setFormData({...formData, vision: e.target.value})}
              onFocus={() => setFocusedField('vision')}
              onBlur={() => setFocusedField(null)}
              className="w-full h-32 bg-transparent border-none outline-none text-fuchsia-100 placeholder:text-gray-700 resize-none font-sans"
              placeholder="זה המקום לשתף אותנו בפרטים... האם מדובר בסיפור שזקוק לעיבוד חזותי? עסק שצריך מיתוג מחדש? או סביבת למידה חדשנית? הקלד את החזון שלך כאן..."
            />
          </div>
        </div>

        {/* Step 4: Submit */}
        <div className="pt-4">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full group relative px-8 py-5 rounded-2xl overflow-hidden font-bold tracking-widest text-white transition-all shadow-[0_0_20px_rgba(255,0,170,0.2)] hover:shadow-[0_0_40px_rgba(255,0,170,0.4)] border border-fuchsia-500/50"
          >
            {isSubmitting ? (
              <div className="absolute inset-0 bg-fuchsia-900/50 flex flex-col items-center justify-center z-20">
                <div className="w-full h-1 bg-black/50 absolute bottom-0 left-0">
                  <div className="h-full bg-fuchsia-400 animate-[pulse_1s_ease-in-out_infinite]" style={{ width: '100%', transition: 'width 2.5s linear' }} />
                </div>
                <span className="text-fuchsia-300 font-mono tracking-widest animate-pulse">משגר נתונים...</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/80 via-fuchsia-800/80 to-fuchsia-900/80 opacity-100 group-hover:from-fuchsia-600/80 group-hover:to-fuchsia-600/80 transition-colors z-0" />
                <div className="relative z-20 flex items-center justify-center gap-3">
                  <Send className="w-5 h-5 text-fuchsia-300 group-hover:text-white transition-colors rotate-180" />
                  <span className="text-glow-pink text-lg">שיגור נתונים והתחלת מסע</span>
                </div>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

const HolographicGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProject, setActiveProject] = useState<any | null>(null);

  const filteredProjects = activeFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <>
      <section className="mt-32 mb-20 relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white text-glow-pink mb-4">ארכיון היצירה ההולוגרפי</h2>
          <p className="text-fuchsia-200/60 font-mono tracking-widest uppercase text-sm">System_Visual_Records</p>
        </div>

        {/* Futuristic Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 border ${
                activeFilter === cat.id 
                  ? 'bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-300 shadow-[0_0_15px_rgba(255,0,170,0.4)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-fuchsia-500/50 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-fuchsia-400/50 hover:shadow-[0_0_30px_rgba(255,0,170,0.2)] transition-all cursor-pointer aspect-video"
                onClick={() => setActiveProject(project)}
              >
                <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-transparent transition-colors duration-500" />
                {project.youtubeId ? (
                  <img 
                    src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                ) : (
                  <video 
                    src={project.video}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                )}
                
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white text-glow-pink mb-1">{project.title}</h4>
                      <p className="text-fuchsia-200/70 text-sm font-mono">{project.type}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-fuchsia-500/30 border border-white/20 hover:border-fuchsia-400 flex items-center justify-center transition-colors backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Mock share action
                        }}
                      >
                        <Share2 className="w-4 h-4 text-white" />
                      </button>
                      <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 border border-fuchsia-400 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,170,0.4)]">
                        <Play className="w-4 h-4 text-fuchsia-300 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Video Lightbox (Private Cinema) */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 md:p-10"
            onClick={() => setActiveProject(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 flex items-center justify-center transition-all z-[60]"
              onClick={() => setActiveProject(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(255,0,170,0.15)] border border-white/10 bg-black"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-900/20 to-purple-900/20 pointer-events-none mix-blend-screen" />
              {activeProject.youtubeId ? (
                <iframe 
                  src={`https://www.youtube.com/embed/${activeProject.youtubeId}?autoplay=1&rel=0`}
                  title={activeProject.title}
                  className="w-full h-full relative z-10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video 
                  src={activeProject.video} 
                  className="w-full h-full object-cover relative z-10"
                  autoPlay 
                  controls 
                  controlsList="nodownload"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AmbientAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const startAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 3);
    gainNode.connect(ctx.destination);
    gainNodeRef.current = gainNode;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    filter.connect(gainNode);

    // Drone 1
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 55; // A1
    osc1.connect(filter);
    
    // Drone 2
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 110; // A2
    osc2.connect(filter);
    
    // Subtle higher harmonic
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.value = 165.5; 
    const gain3 = ctx.createGain();
    gain3.gain.value = 0.15;
    osc3.connect(gain3);
    gain3.connect(filter);

    osc1.start();
    osc2.start();
    osc3.start();
    
    oscillatorsRef.current = [osc1, osc2, osc3];
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => {
            try { osc.stop(); } catch(e){}
        });
        oscillatorsRef.current = [];
        if (audioCtxRef.current?.state === 'running') {
            audioCtxRef.current.suspend();
        }
      }, 1500);
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  return (
    <button 
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-fuchsia-500/20 hover:border-fuchsia-400 transition-all border border-white/10 group shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
      title={isPlaying ? "השתק סאונד רקע" : "הפעל סאונד רקע (אווירה קוסמית)"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-fuchsia-300 drop-shadow-[0_0_8px_rgba(255,0,170,0.8)]" />
      ) : (
        <VolumeX className="w-5 h-5 text-gray-500 group-hover:text-fuchsia-200" />
      )}
    </button>
  );
};

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    let particles: {x: number, y: number, life: number, size: number, color: string, vx: number, vy: number}[] = [];
    let mouse = { x: -100, y: -100 };
    let isActive = false;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isActive = true;
      
      // Add particle
      const isCyan = Math.random() > 0.4;
      particles.push({
        x: mouse.x,
        y: mouse.y,
        life: 1,
        size: Math.random() * 2.5 + 1,
        color: isCyan ? 'rgba(0, 243, 255,' : 'rgba(189, 0, 255,',
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
      });
    };
    
    const onMouseLeave = () => {
      isActive = false;
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);
    
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02; 
        
        if (p.life <= 0) {
          particles.splice(i, 1);
          i--;
          continue;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.life})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color.replace('rgba', 'rgb').replace(',', '').replace('(', '').slice(0, -1);
        ctx.fill();
      }
      
      if (isActive) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 243, 255, 0.4)';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgb(0, 243, 255)';
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[100] mix-blend-screen"
    />
  );
};

const CODE_SNIPPET = `
// Ecomedia Core Engine
function initializeHyperSpace() {
  const portal = new WebGLRenderer({
    antialias: true,
    alpha: true
  });
  
  portal.setPixelRatio(window.devicePixelRatio);
  portal.setSize(window.innerWidth, window.innerHeight);
  
  const scene = new Scene();
  scene.fog = new FogExp2(0x030305, 0.002);
  
  // Initialize quantum particles
  const particles = new QuantumParticleSystem({
    density: 10000,
    color: '#ff00aa',
    glow: '#bd00ff'
  });
  
  scene.add(particles);
  portal.render(scene, camera);
}
`.trim();

const App = () => {
  return (
    <div className="min-h-screen bg-circuit font-sans selection:bg-fuchsia-500/30 selection:text-fuchsia-200 overflow-x-hidden">
      <AmbientAudio />
      <CursorTrail />
      <div className="scanner" />
      
      {/* Background gradients / Glowing Core (Cinematic Cosmic Sunset) */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        {/* Ambient Lighting simulating the scene */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-fuchsia-900/20 blur-[150px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-1/4 w-[60vw] h-[60vw] rounded-full bg-amber-600/10 blur-[180px] animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute top-1/3 left-1/3 w-[40vw] h-[40vw] rounded-full bg-purple-900/20 blur-[150px] animate-pulse" style={{ animationDuration: '5s' }} />
        
        {/* Abstract 3D-like Wireframe Core (Simulated with CSS) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-fuchsia-500/5 rounded-full shadow-[0_0_100px_rgba(255,0,170,0.05)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/10 rounded-full" />
      </div>

      {/* Floating Pill Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-40 glass-panel holo-border rounded-full transition-all duration-500">
        <div className="px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <Hexagon className="w-10 h-10 text-fuchsia-400 drop-shadow-[0_0_15px_rgba(255,0,170,0.8)] group-hover:rotate-90 transition-transform duration-700" />
              <div className="absolute inset-0 bg-fuchsia-400 blur-xl opacity-20 group-hover:opacity-60 transition-opacity" />
            </div>
            <span className="text-2xl font-black tracking-widest text-white text-glow-pink uppercase">
              Ecomedia <span className="font-light text-fuchsia-100 opacity-70">Israel</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-widest uppercase">
            <a href="#" className="text-gray-400 hover:text-white hover-pulse-pink relative group">
              פרויקטים
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-fuchsia-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white hover-pulse-pink relative group">
              טכנולוגיה
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-fuchsia-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white hover-pulse-pink relative group">
              אודות
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-fuchsia-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
            </a>
            
            <button className="relative px-8 py-3 rounded-full overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 border border-fuchsia-500/50 rounded-full group-hover:bg-fuchsia-500/20 transition-all duration-300" />
               <span className="relative z-10 text-fuchsia-300 font-bold group-hover:text-white transition-colors text-glow-pink">צור קשר</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-48 pb-32 px-6 max-w-[1400px] mx-auto">
        
        {/* Ultra-Modern Hero Section */}
        <section className="text-center py-24 flex flex-col items-center relative">
          
          {/* Tech Data Overlays */}
          <div className="absolute top-0 left-0 text-xs font-mono text-fuchsia-500/40 text-left tracking-widest hidden lg:block">
            <p>SYS.COORD: 42.981.00</p>
            <p>UPLINK: SECURE</p>
            <p className="mt-2 text-purple-500/40">NEBULA_CORE_ACTIVE</p>
          </div>
          <div className="absolute bottom-0 right-0 text-xs font-mono text-fuchsia-500/40 text-right tracking-widest hidden lg:block">
            <p>V. 2.0.26</p>
            <p className="flex items-center gap-2 justify-end"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" /> LIVE STREAM</p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel holo-border mb-12">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_12px_rgba(189,0,255,0.8)]" />
              <span className="text-xs font-mono text-fuchsia-200 tracking-[0.2em] uppercase">Hyper_Reality_Engine_Online</span>
            </div>
            
            <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-black mb-6 tracking-tighter text-white leading-[0.9] drop-shadow-2xl flex flex-col items-center">
              <motion.span 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block text-glow-pink"
              >
                אקו מדיה
              </motion.span>
              <motion.span 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-fuchsia-400 to-purple-500 text-glow-uv mt-2 lg:-mt-4"
              >
                ישראל
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl md:text-2xl text-fuchsia-100/60 max-w-3xl mx-auto font-light leading-relaxed mb-16 mt-8"
            >
              סוכנות דיגיטל עתידנית המשלבת עיצוב גלקטי, טכנולוגיה מתקדמת ואנימציות תלת־ממד. אנו לא בונים אתרים, אנו בונים <strong className="text-white font-medium text-glow-pink">מימדים חדשים</strong>.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <button className="group relative px-12 py-5 rounded-full overflow-hidden font-bold tracking-widest text-white transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,0,170,0.3)] hover:shadow-[0_0_60px_rgba(189,0,255,0.5)]">
                <div className="absolute inset-0 bg-[#030305] z-10 rounded-full m-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-400 via-purple-500 to-fuchsia-400 opacity-100 group-hover:animate-[spin_2s_linear_infinite] z-0" />
                <div className="relative z-20 flex items-center gap-4">
                  <Sparkles className="w-5 h-5 text-fuchsia-300 group-hover:text-white transition-colors" />
                  התחל מסע אינטרגלקטי
                </div>
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Bento Grid Layout Section */}
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          
          {/* 3D Animation Portfolio Panel (8 Cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 xl:col-span-8 glass-panel holo-border rounded-[2rem] p-10 relative overflow-hidden group flex flex-col justify-between min-h-[500px]"
          >
            {/* Tech accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-fuchsia-500/30 opacity-50" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-purple-500/30 opacity-50" />

            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-opacity duration-700 transform group-hover:scale-110">
              <Layers className="w-64 h-64 text-fuchsia-400" />
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-transparent border border-fuchsia-500/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,0,170,0.2)] backdrop-blur-md">
                <Globe2 className="w-7 h-7 text-fuchsia-300 drop-shadow-md" />
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 text-glow-pink tracking-tight">הולוגרמות <br/> ותלת-ממד</h3>
              <p className="text-xl text-gray-400 leading-relaxed font-light mb-12 max-w-lg">
                תצוגה מרחפת המציגה את פרויקטי האנימציה המתקדמים שלנו. חוויות ויזואליות שפורצות את גבולות המציאות המוכרת.
              </p>
              
              {/* Mock Portfolio Cards Horizontal */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                {[1, 2].map((i) => (
                  <div key={i} className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-[#000]/40 border border-white/5 hover:border-fuchsia-500/50 hover:bg-fuchsia-900/20 transition-all duration-300 cursor-pointer group/card holo-border">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-fuchsia-900/80 to-purple-900/80 border border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner">
                       <div className="absolute inset-0 bg-circuit opacity-50 mix-blend-overlay" />
                       <div className="w-6 h-6 rounded-full bg-fuchsia-400/40 group-hover/card:bg-fuchsia-300/80 group-hover/card:shadow-[0_0_15px_#ff00aa] transition-all duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white tracking-wide group-hover/card:text-fuchsia-200 transition-colors text-lg">פרויקט נבולה {i}X</h4>
                      <p className="text-xs text-fuchsia-500 font-mono mt-1 tracking-widest uppercase">Render_Complete</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Code Snippets Panel (4 Cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 xl:col-span-4 glass-panel holo-border rounded-[2rem] p-10 relative overflow-hidden group flex flex-col min-h-[500px]"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 group-hover:opacity-10 transition-opacity duration-700 scale-150">
              <Cpu className="w-64 h-64 text-purple-400" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(189,0,255,0.2)] backdrop-blur-md">
                <TerminalSquare className="w-7 h-7 text-purple-300 drop-shadow-md" />
              </div>
              
              <h3 className="text-4xl font-black text-white mb-4 text-glow-uv tracking-tight">ארכיטקטורת <br/> קוד</h3>
              <p className="text-gray-400 leading-relaxed font-light mb-8">
                ליבת המערכת שלנו. ביצועי על, ממשקי WebGL מתקדמים ושקיפות מלאה למכניקת הקוונטים של הרשת.
              </p>
              
              {/* Terminal Block */}
              <div className="mt-auto bg-[#000]/60 rounded-2xl border border-purple-500/30 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)] holo-border">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-[#111]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-fuchsia-500/80 shadow-[0_0_5px_rgba(255,0,170,0.5)]" />
                  </div>
                  <span className="text-xs text-purple-400 font-mono tracking-widest opacity-80">engine.ts</span>
                </div>
                <div className="p-5 overflow-x-auto custom-scrollbar h-48">
                  <pre className="text-xs font-mono leading-loose" style={{ direction: 'ltr' }}>
                    <code className="text-fuchsia-100/80">
                      {CODE_SNIPPET.split('\n').map((line, i) => (
                        <div key={i} className="table-row hover:bg-white/5 transition-colors">
                          <span className="table-cell pr-4 text-purple-500/50 select-none text-right w-8">{i + 1}</span>
                          <span className="table-cell whitespace-pre text-fuchsia-300">{line}</span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>

        </section>

        {/* Typography & Aesthetics Section - Immersive Layout */}
        <section className="mt-6 mb-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-panel holo-border rounded-[2rem] p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-fuchsia-900/10 to-transparent opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-4xl font-black text-white text-glow-pink tracking-tight mb-2">תדרי אסתטיקה</h3>
                  <p className="text-fuchsia-200/60 font-mono text-sm tracking-widest uppercase">Select_Visual_Protocol</p>
                </div>
                <Sparkles className="w-8 h-8 text-fuchsia-500/50 hidden md:block animate-pulse" />
              </div>
              
              <div className="flex flex-col lg:flex-row gap-4 h-[500px]">
                
                {[
                  { title: 'Cinematic 3D', style: 'text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-black drop-shadow-2xl', bg: 'from-fuchsia-950', border: 'border-fuchsia-500/20' },
                  { title: 'Neon Cyber', style: 'text-glow-uv text-white font-bold tracking-[0.3em] uppercase', bg: 'from-purple-950', border: 'border-purple-500/30' },
                  { title: 'Elegant Serif', style: 'font-serif italic text-stone-300 tracking-wide font-light', bg: 'from-stone-900', border: 'border-stone-500/30' },
                  { title: 'Bold Sans', style: 'font-black text-white uppercase tracking-tighter', bg: 'from-[#0a1520]', border: 'border-fuchsia-400/30' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className={`flex-1 hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] bg-black/40 border ${item.border} rounded-2xl relative overflow-hidden group cursor-pointer`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.bg} to-transparent opacity-40 group-hover:opacity-90 transition-opacity duration-700 mix-blend-screen`} />
                    <div className="absolute inset-0 bg-circuit opacity-20 mix-blend-overlay" />
                    
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <span className={`text-4xl lg:text-5xl transform -rotate-90 lg:rotate-0 whitespace-nowrap transition-transform duration-700 group-hover:scale-110 ${item.style}`}>
                        {item.title}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-mono text-xs text-white/50 tracking-widest uppercase whitespace-nowrap">
                      [ System_Init_{i} ]
                    </div>
                  </motion.div>
                ))}

              </div>
            </div>
          </motion.div>
        </section>

        {/* Holographic Media Gallery */}
        <HolographicGallery />

        {/* Core Messages Section */}
        <section className="mt-20 mb-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MESSAGES.map((msg, idx) => {
              const Icon = msg.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="glass-panel holo-border rounded-3xl p-8 group hover:-translate-y-2 transition-transform duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:bg-white/10 transition-colors">
                    <Icon className={`w-8 h-8 ${msg.color} drop-shadow-[0_0_10px_currentColor]`} />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4 text-glow-pink">{msg.title}</h4>
                  <p className="text-gray-400 leading-relaxed font-light text-lg">
                    {msg.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-20 mb-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white text-glow-pink mb-4">קולות מהשטח</h2>
            <p className="text-fuchsia-200/60 font-mono tracking-widest uppercase text-sm">System_Feedback_Logs</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="glass-panel rounded-3xl p-10 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(255,0,170,0.15)] transition-shadow duration-500"
              >
                <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Quote className="w-32 h-32 text-fuchsia-400 transform rotate-180" />
                </div>
                
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold text-white mb-6 text-glow-pink">{test.title}</h4>
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8 italic">
                    "{test.text}"
                  </p>
                  
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-900 to-purple-900 flex items-center justify-center border border-fuchsia-500/30">
                       <span className="font-bold text-white text-lg">{test.author.charAt(0)}</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-lg">{test.author}</h5>
                      <span className="text-fuchsia-400/60 text-sm font-mono uppercase tracking-wider">Verified_Client</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Footer Section */}
        <section className="mt-32 relative z-10">
          <div className="glass-panel holo-border rounded-[3rem] p-10 md:p-16 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-fuchsia-900/10 pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white text-glow-pink mb-6">בואו ניצור יחד</h2>
                <p className="text-xl text-gray-300 font-light mb-10">
                  <strong className="text-white font-medium">אקו מדיה ישראל – המקום שבו רעיונות רוקמים עור וגידים.</strong><br/>
                  אנו כאן כדי להקשיב, לתכנן וליצור יחד את הצעד הבא שלכם.
                </p>
                
                <div className="space-y-6">
                  {CONTACT_INFO.map((info, idx) => {
                    const Icon = info.icon;
                    return (
                      <div key={idx} className={`flex items-center gap-6 group ${info.link ? 'cursor-pointer' : 'cursor-default'}`} onClick={() => info.link && window.open(info.link, '_blank')}>
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-fuchsia-500/20 group-hover:border-fuchsia-500/50 transition-all duration-300">
                          <Icon className="w-6 h-6 text-fuchsia-300" />
                        </div>
                        {info.link ? (
                          <a href={info.link} target="_blank" rel="noopener noreferrer" className="text-xl text-gray-200 font-light group-hover:text-fuchsia-400 transition-colors" onClick={(e) => e.stopPropagation()}>{info.text}</a>
                        ) : (
                          <span className="text-xl text-gray-200 font-light">{info.text}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div>
                <HolographicContactForm />
              </div>
            </div>
          </div>
          
          <div className="text-center py-8 text-gray-500 font-mono text-sm tracking-widest uppercase mt-8">
            © {new Date().getFullYear()} Ecomedia Israel. All Systems Operational.
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;
