import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Baby, 
  Sparkles, 
  Home as HomeIcon, 
  Search, 
  Heart, 
  Settings as SettingsIcon,
  ArrowRight,
  ArrowLeft,
  RefreshCcw,
  Share2,
  Lock,
  Compass,
  User
} from 'lucide-react';
import { 
  Screen, 
  UserPreferences, 
  Gender, 
  Origin, 
  Vibe, 
  BabyName 
} from './types';
import { MEANING_TAG_DEFS, IMAGES, INITIAL_FAVORITES } from './constants';
import { generateBabyNames } from './services/geminiService';

// --- Sub-Components ---

const BottomNav = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: Screen) => void }) => {
  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'results', icon: Compass, label: 'Discover' },
    { id: 'saved', icon: Heart, label: 'Saved' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass safe-bottom rounded-t-[32px] shadow-[0_-8px_30px_rgba(255,133,161,0.12)] z-50 flex justify-around items-center px-4 pt-3 pb-8">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as Screen)}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 ${
              isActive ? 'bg-primary-container/40 text-primary' : 'text-outline hover:text-primary/60'
            }`}
          >
            <Icon size={24} fill={isActive ? 'currentColor' : 'none'} className="mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const Header = ({ title, subTitle, onBack, rightAction }: { 
  title: string, 
  subTitle?: string, 
  onBack?: () => void,
  rightAction?: ReactNode 
}) => (
  <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md glass safe-top z-50 flex items-center justify-between px-6 py-4">
    <div className="flex items-center gap-3">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors">
          <ArrowLeft size={20} />
        </button>
      )}
      <div>
        <h1 className="font-display font-black text-xl text-primary leading-tight">{title}</h1>
        {subTitle && <p className="text-on-surface-variant text-xs font-semibold">{subTitle}</p>}
      </div>
    </div>
    {rightAction}
  </header>
);

// --- Screens ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#FFD6E7] via-white to-[#D6F0FF]">
      <div className="absolute top-10 left-10 text-primary-container opacity-60 text-2xl">✨</div>
      <div className="absolute top-24 right-16 text-secondary-container opacity-80 text-3xl">☁️</div>
      <div className="absolute bottom-32 left-12 text-tertiary-container opacity-70 text-2xl">⭐</div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-64 h-64 mb-8"
      >
        <img 
          src={IMAGES.splash_baby} 
          alt="Baby Name AI" 
          className="w-full h-full object-cover rounded-full shadow-[0_10px_40px_rgba(255,133,161,0.2)] border-4 border-white/50 backdrop-blur-sm"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center"
      >
        <h1 className="font-display font-black text-4xl mb-4 bg-gradient-to-r from-primary to-[#FF85A1] bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Sparkles className="text-primary" size={32} />
          Baby Name AI
        </h1>
        <p className="text-on-surface-variant text-lg font-medium">Find the perfect name for your little one</p>
      </motion.div>

      <div className="absolute bottom-16 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
            className="w-3 h-3 rounded-full bg-primary-container"
          />
        ))}
      </div>
    </div>
  );
};

const Home = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="flex flex-col items-center min-h-screen w-full pt-24 pb-32 bg-gradient-to-b from-primary-container/20 to-surface">
      <div className="w-full max-w-xs aspect-square mb-8 relative rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src={IMAGES.home_sleeping_baby} 
          alt="Baby Sleeping" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="text-center px-8 mb-12">
        <h2 className="font-display font-black text-4xl text-on-surface leading-tight mb-4">
          Find the perfect name for your baby 👶
        </h2>
        <p className="text-on-surface-variant text-lg font-medium">
          Beautiful names with meanings, powered by AI ✨
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-[85%] py-4 rounded-full bg-gradient-to-r from-primary to-[#FF85A1] text-white font-display font-bold text-xl shadow-lg shadow-primary/30 active:scale-95 transition-transform"
      >
        Start
      </button>
      <p className="mt-4 text-outline text-sm font-semibold">No signup required</p>
    </div>
  );
};

const OnboardingStepLayout = ({ 
  step, 
  totalSteps, 
  title, 
  subtitle, 
  onBack, 
  onNext, 
  children,
  nextLabel = "Next"
}: { 
  step: number, 
  totalSteps: number, 
  title: string, 
  subtitle: string, 
  onBack: () => void, 
  onNext: () => void,
  children: ReactNode,
  nextLabel?: string
}) => (
  <div className="flex flex-col h-screen w-full bg-surface">
    <Header title="Baby Name AI" onBack={onBack} />
    
    <main className="flex-1 flex flex-col pt-24 pb-32 px-6 safe-top safe-bottom">
      <div className="flex flex-col items-center mb-8">
        <div className="flex gap-2 mb-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${
                i + 1 === step ? 'w-6 bg-primary' : i + 1 < step ? 'w-2 bg-primary/40' : 'w-2 bg-outline-variant'
              }`} 
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Step {step} of {totalSteps}</span>
      </div>

      <div className="text-center mb-10">
        <h2 className="font-display font-black text-3xl mb-2 tracking-tight">{title}</h2>
        <p className="text-on-surface-variant font-medium">{subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </div>

      <div className="pt-4">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-full bg-primary text-white font-display font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          {nextLabel}
          <ArrowRight size={20} />
        </button>
      </div>
    </main>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [preferences, setPreferences] = useState<UserPreferences>({
    gender: null,
    origin: null,
    vibe: null,
    meanings: []
  });
  const [generatedNames, setGeneratedNames] = useState<BabyName[]>([]);
  const [favoriteNames, setFavoriteNames] = useState<BabyName[]>(INITIAL_FAVORITES);

  const startOnboarding = () => setScreen('onboarding-gender');
  
  const handleNext = () => {
    switch(screen) {
      case 'onboarding-gender': setScreen('onboarding-origin'); break;
      case 'onboarding-origin': setScreen('onboarding-style'); break;
      case 'onboarding-style': setScreen('onboarding-meaning'); break;
      case 'onboarding-meaning': generateNamesAction(); break;
    }
  };

  const handleBack = () => {
    switch(screen) {
      case 'onboarding-gender': setScreen('home'); break;
      case 'onboarding-origin': setScreen('onboarding-gender'); break;
      case 'onboarding-style': setScreen('onboarding-origin'); break;
      case 'onboarding-meaning': setScreen('onboarding-style'); break;
      case 'results': setScreen('onboarding-meaning'); break;
      case 'saved': setScreen('home'); break;
      default: setScreen('home');
    }
  };

  const generateNamesAction = async () => {
    setScreen('generating');
    const names = await generateBabyNames(preferences);
    setGeneratedNames(names);
    setScreen('results');
  };

  const toggleFavorite = (nameObj: BabyName) => {
    setFavoriteNames(prev => {
      const exists = prev.find(n => n.name === nameObj.name);
      if (exists) return prev.filter(n => n.name !== nameObj.name);
      return [...prev, { ...nameObj, isFavorite: true }];
    });
  };

  return (
    <div className="flex justify-center bg-black min-h-screen">
      <div className="w-full max-w-md bg-surface min-h-screen relative shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {screen === 'splash' && (
            <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SplashScreen onComplete={() => setScreen('home')} />
            </motion.div>
          )}

          {screen === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Home onStart={startOnboarding} />
              <BottomNav activeTab="home" onTabChange={setScreen} />
            </motion.div>
          )}

          {screen === 'onboarding-gender' && (
            <motion.div key="gender" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              <OnboardingStepLayout 
                step={1} 
                totalSteps={4} 
                title="What's the gender?" 
                subtitle="Choose the one that feels right 💕"
                onBack={handleBack}
                onNext={handleNext}
              >
                <div className="space-y-4 py-4">
                  {(['boy', 'girl', 'unisex'] as Gender[]).map((g) => {
                    const emoji = g === 'boy' ? '👦' : g === 'girl' ? '👧' : '🌈';
                    const active = preferences.gender === g;
                    return (
                      <button
                        key={g}
                        onClick={() => setPreferences({ ...preferences, gender: g })}
                        className={`w-full flex items-center p-5 rounded-[24px] border-2 transition-all ${
                          active ? 'bg-primary/10 border-primary' : 'bg-surface-container border-transparent'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-3xl shadow-sm mr-5">
                          {emoji}
                        </div>
                        <span className={`font-display font-bold text-xl capitalize flex-1 text-left ${active ? 'text-primary' : 'text-on-surface'}`}>
                          {g}
                        </span>
                        {active && (
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Sparkles size={16} /></motion.div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </OnboardingStepLayout>
            </motion.div>
          )}

          {screen === 'onboarding-origin' && (
            <motion.div key="origin" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              <OnboardingStepLayout 
                step={2} 
                totalSteps={4} 
                title="Choose an origin 🌍" 
                subtitle="Where should the name come from?"
                onBack={handleBack}
                onNext={handleNext}
              >
                <div className="grid grid-cols-2 gap-4 py-4">
                  {[
                    { id: 'indonesian', label: 'Indonesian', emoji: '🇮🇩' },
                    { id: 'japanese', label: 'Japanese', emoji: '🇯🇵' },
                    { id: 'arabic', label: 'Arabic', emoji: '🌙' },
                    { id: 'western', label: 'Western', emoji: '🌟' },
                    { id: 'mix', label: 'Mix it up!', emoji: '✨', fullWidth: true },
                  ].map((o) => {
                    const active = preferences.origin === o.id;
                    return (
                      <button
                        key={o.id}
                        onClick={() => setPreferences({ ...preferences, origin: o.id as Origin })}
                        className={`flex flex-col items-center justify-center p-6 rounded-[24px] border-2 transition-all ${
                          o.fullWidth ? 'col-span-2 flex-row gap-4' : ''
                        } ${active ? 'bg-primary/10 border-primary' : 'bg-surface-container border-transparent'}`}
                      >
                        <span className={`${o.fullWidth ? 'text-4xl' : 'text-4xl mb-3'}`}>{o.emoji}</span>
                        <div className="flex flex-col items-center">
                          <span className={`font-bold text-sm ${active ? 'text-primary' : 'text-on-surface'}`}>{o.label}</span>
                          {o.id === 'mix' && <span className="text-[10px] text-on-surface-variant font-medium">Surprise me</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </OnboardingStepLayout>
            </motion.div>
          )}

          {screen === 'onboarding-style' && (
            <motion.div key="style" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              <OnboardingStepLayout 
                step={3} 
                totalSteps={4} 
                title="What's your style? ✨" 
                subtitle="Pick the vibe that fits best"
                onBack={handleBack}
                onNext={handleNext}
              >
                <div className="grid grid-cols-2 gap-4 py-4">
                  {[
                    { id: 'modern', label: 'Modern', sub: 'Trendy & fresh', emoji: '🚀', color: 'bg-secondary-container/40' },
                    { id: 'classic', label: 'Classic', sub: 'Timeless', emoji: '🏛️', color: 'bg-tertiary-container/30' },
                    { id: 'unique', label: 'Unique', sub: 'Rare', emoji: '💎', color: 'bg-surface-variant/40' },
                    { id: 'meaningful', label: 'Meaningful', sub: 'Story based', emoji: '💝', color: 'bg-primary-container/30' },
                  ].map((v) => {
                    const active = preferences.vibe === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setPreferences({ ...preferences, vibe: v.id as Vibe })}
                        className={`flex flex-col items-center text-center p-6 rounded-[2rem] border-2 transition-all ${
                          active ? 'border-primary ring-2 ring-primary/20 bg-primary/10' : v.color + ' border-transparent'
                        }`}
                      >
                        <div className="text-4xl mb-3">{v.emoji}</div>
                        <h3 className="font-display font-bold text-on-surface text-lg mb-1">{v.label}</h3>
                        <p className="text-xs text-on-surface-variant font-medium">{v.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </OnboardingStepLayout>
            </motion.div>
          )}

          {screen === 'onboarding-meaning' && (
            <motion.div key="meaning" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              <OnboardingStepLayout 
                step={4} 
                totalSteps={4} 
                title="What should it mean? 💭" 
                subtitle="Tap all that you love"
                onBack={handleBack}
                onNext={handleNext}
                nextLabel="Generate Names"
              >
                <div className="flex flex-wrap justify-center gap-3 py-4">
                  {MEANING_TAG_DEFS.map((tag) => {
                    const active = preferences.meanings.includes(tag.id);
                    return (
                      <button
                        key={tag.id}
                        onClick={() => {
                          const newMeanings = active 
                            ? preferences.meanings.filter(m => m !== tag.id)
                            : [...preferences.meanings, tag.id];
                          setPreferences({ ...preferences, meanings: newMeanings });
                        }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all ${
                          active 
                            ? 'bg-primary border-primary text-white shadow-lg scale-105' 
                            : `${tag.colorClass} border-transparent text-on-surface`
                        }`}
                      >
                        <span>{tag.emoji}</span>
                        <span className="font-bold">{tag.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-center mt-8">
                  <button onClick={generateNamesAction} className="text-outline font-semibold text-sm underline underline-offset-4">Skip for now</button>
                </div>
              </OnboardingStepLayout>
            </motion.div>
          )}

          {screen === 'generating' && (
            <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-container/20 to-secondary-container/20 px-8 text-center">
              <Header title="Baby Name AI" />
              <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full bg-primary-container/30 blur-2xl" 
                />
                <motion.div 
                  animate={{ scale: [0.9, 1.2, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative z-10 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-[0_0_40px_rgba(255,169,186,0.6)]"
                >
                  <img src={IMAGES.generating_orb} alt="Magic" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
              </div>
              <h2 className="font-display font-bold text-2xl mb-4">Creating beautiful names for your baby…</h2>
              <p className="text-on-surface-variant">Our AI is working its magic ✨</p>
            </motion.div>
          )}

          {screen === 'results' && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen w-full bg-surface pb-32">
              <Header 
                title="Your Baby Names" 
                subTitle={`${generatedNames.length} beautiful names for you`}
                onBack={handleBack}
                rightAction={<button onClick={generateNamesAction} className="p-2 text-primary"><RefreshCcw size={24} /></button>}
              />
              <div className="pt-24 px-5 space-y-4">
                {generatedNames.map((name, i) => (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={name.name}
                    className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgba(255,133,161,0.08)] border border-outline-variant/20 relative"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display font-black text-3xl text-on-surface">{name.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container/50 text-secondary text-[10px] font-bold uppercase tracking-wider">{name.origin}</span>
                      </div>
                      <button 
                        onClick={() => toggleFavorite(name)}
                        className={`p-1 transition-colors ${favoriteNames.some(f => f.name === name.name) ? 'text-primary' : 'text-outline-variant'}`}
                      >
                        <Heart size={28} fill={favoriteNames.some(f => f.name === name.name) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">{name.meaning}</p>
                    <button className="flex items-center gap-2 text-primary font-bold text-xs">
                      <Share2 size={16} /> Share
                    </button>
                  </motion.div>
                ))}

                <div className="p-8 rounded-2xl bg-primary/5 border-2 border-dashed border-primary/20 flex flex-col items-center text-center">
                  <Lock className="text-primary/40 mb-4" size={40} />
                  <h3 className="font-display font-black text-xl mb-2">Want 50+ More Ideas?</h3>
                  <p className="text-on-surface-variant text-sm mb-6">Unlock our complete catalog and personalized features.</p>
                  <button onClick={() => setScreen('upgrade')} className="w-full py-4 rounded-full bg-primary text-white font-bold text-lg shadow-lg">
                    Unlock All Names ✨
                  </button>
                </div>
              </div>
              <BottomNav activeTab="results" onTabChange={setScreen} />
            </motion.div>
          )}

          {screen === 'saved' && (
            <motion.div key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen w-full bg-surface pb-32">
              <Header title="Saved Names" subTitle={`${favoriteNames.length} names you love`} onBack={() => setScreen('home')} />
              <div className="pt-24 px-5 space-y-4">
                {favoriteNames.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-outline-variant">
                    <Heart size={64} className="mb-4 opacity-20" />
                    <p className="font-bold">No saved names yet</p>
                  </div>
                ) : (
                  favoriteNames.map((name, i) => (
                    <div key={name.name} className="bg-white p-4 rounded-2xl shadow-[0_4px_16px_rgba(255,133,161,0.06)] flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary font-black text-xl uppercase">
                        {name.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-bold text-lg text-on-surface">{name.name}</h3>
                          <span className="text-[10px] bg-surface-variant px-2 py-0.5 rounded-full font-bold uppercase">{name.origin}</span>
                        </div>
                        <p className="text-on-surface-variant text-xs truncate max-w-[200px]">{name.meaning}</p>
                      </div>
                      <button onClick={() => toggleFavorite(name)} className="text-primary">
                        <Heart size={24} fill="currentColor" />
                      </button>
                    </div>
                  ))
                )}
                {favoriteNames.length > 1 && (
                  <button className="w-full py-4 border-2 border-primary text-primary font-bold rounded-full flex items-center justify-center gap-2">
                    <RefreshCcw size={18} /> Compare Names
                  </button>
                )}
              </div>
              <BottomNav activeTab="saved" onTabChange={setScreen} />
            </motion.div>
          )}

          {screen === 'upgrade' && (
            <motion.div key="upgrade" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="h-screen w-full bg-white z-[100] relative flex flex-col pt-24 px-8 pb-12 overflow-y-auto no-scrollbar">
              <button onClick={() => setScreen('results')} className="absolute top-8 left-8 p-2 rounded-full bg-surface-variant"><ArrowLeft size={24} /></button>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center shadow-xl mb-6 relative">
                  <Sparkles size={48} className="text-white" />
                  <div className="absolute -top-2 -right-2 bg-tertiary-container text-on-tertiary-container text-[10px] font-black px-2 py-1 rounded-full border-2 border-white">PRO</div>
                </div>
                <h2 className="font-display font-black text-3xl mb-4">Unlock more beautiful names ✨</h2>
                <p className="text-on-surface-variant mb-10">Get the full magical experience for a one-time payment.</p>
                
                <div className="w-full space-y-4 mb-10">
                  {[
                    { icon: Sparkles, label: 'Unlimited name ideas' },
                    { icon: Compass, label: 'Deeper meanings & stories' },
                    { icon: Sparkles, label: 'AI personalized suggestions' },
                    { icon: Heart, label: 'Name combinations & pairs' },
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 bg-surface-container/50 p-4 rounded-2xl w-full">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary"><benefit.icon size={20} /></div>
                      <span className="font-bold text-on-surface">{benefit.label}</span>
                    </div>
                  ))}
                </div>

                <div className="w-full p-8 rounded-3xl bg-primary/5 border-2 border-primary/20 relative mb-8">
                  <div className="absolute -top-3 left-4 bg-tertiary-container px-3 py-1 rounded-full text-xs font-bold ring-2 ring-white">LIFETIME ACCESS</div>
                   <div className="absolute -top-3 right-4 bg-primary px-3 py-1 rounded-full text-xs font-bold text-white ring-2 ring-white">SAVE 60%</div>
                   <div className="flex items-baseline justify-center gap-2">
                    <span className="text-outline-variant line-through text-lg">$9.99</span>
                    <span className="text-5xl font-black text-primary">$3.99</span>
                   </div>
                   <p className="text-xs text-on-surface-variant mt-2">One-time payment</p>
                </div>

                <button className="w-full py-5 rounded-full bg-primary text-white font-black text-xl shadow-xl shadow-primary/30 mb-4 transition-transform active:scale-95">
                  Unlock Now 🚀
                </button>
                <button onClick={() => setScreen('results')} className="text-on-surface-variant font-bold text-sm">Maybe later</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
