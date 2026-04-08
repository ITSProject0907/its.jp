import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Building2, 
  Cpu, 
  Globe2, 
  Users2, 
  ChevronRight, 
  Menu, 
  X,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Code,
  HardHat,
  TrendingUp,
  Headphones,
  Info,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'service' | 'features' | 'message' | 'company' | 'recruit';

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (page: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; jp: string; id: Page }[] = [
    { name: 'SERVICE', jp: '事業内容', id: 'service' },
    { name: 'FEATURES', jp: '特徴', id: 'features' },
    { name: 'MESSAGE', jp: 'メッセージ', id: 'message' },
    { name: 'COMPANY', jp: '会社概要', id: 'company' },
    { name: 'RECRUIT', jp: '採用情報', id: 'recruit' },
  ];

  const handleNavClick = (id: Page) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || currentPage !== 'home' ? 'bg-white/95 backdrop-blur-sm py-3 shadow-md' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
            <Globe2 className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-lg leading-none tracking-tight transition-colors ${(!isScrolled && currentPage === 'home') ? 'text-white' : 'text-slate-900'}`}>Inboundtechnologies</span>
            <span className={`text-[10px] font-medium mt-1 transition-colors ${(!isScrolled && currentPage === 'home') ? 'text-white/60' : 'text-slate-400'}`}>合同会社インバウンドテクノロジーズ</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)} 
              className="group flex flex-col items-center"
            >
              <span className={`text-[11px] font-bold tracking-widest mb-0.5 transition-colors ${(!isScrolled && currentPage === 'home') ? 'text-white/80' : 'text-primary'}`}>{link.name}</span>
              <span className={`text-[13px] font-medium transition-colors ${(!isScrolled && currentPage === 'home') ? 'text-white group-hover:text-primary' : 'text-slate-600 group-hover:text-primary'}`}>{link.jp}</span>
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('recruit')}
            className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-primary/20"
          >
            CONTACT <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className={`lg:hidden ${(!isScrolled && currentPage === 'home') ? 'text-white' : 'text-primary'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-bold text-xl">MENU</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link.id)}
                  className="flex flex-col text-left"
                >
                  <span className="text-xs font-bold text-primary">{link.name}</span>
                  <span className="text-2xl font-bold">{link.jp}</span>
                </button>
              ))}
            </div>
            <div className="mt-auto">
              <button 
                onClick={() => handleNavClick('recruit')}
                className="bg-primary text-white w-full py-5 rounded-lg text-center font-bold text-xl flex items-center justify-center gap-3"
              >
                採用エントリー <ArrowUpRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionTitle = ({ en, jp, light = false }: { en: string; jp: string; light?: boolean }) => (
  <div className="mb-16">
    <div className="flex items-center gap-4 mb-2">
      <div className={`h-[2px] w-12 ${light ? 'bg-white/30' : 'bg-primary/20'}`}></div>
      <span className={`text-sm font-bold tracking-[0.2em] ${light ? 'text-white/70' : 'text-primary'}`}>{en}</span>
    </div>
    <h2 className={`text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-slate-900'}`}>{jp}</h2>
  </div>
);

const PageHeader = ({ en, jp }: { en: string; jp: string }) => (
  <section className="pt-40 pb-20 bg-slate-900 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-20"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <span className="text-primary font-bold tracking-[0.3em] text-sm mb-4 block">{en}</span>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">{jp}</h1>
    </div>
  </section>
);

// --- Page Components ---

const HomePage = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => (
  <>
    {/* Hero Section */}
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/40 z-10"></div>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-114-large.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-3xl">
          <div className="inline-block px-4 py-1 bg-primary text-white text-xs font-bold tracking-widest mb-8">
            REAL ESTATE × TECHNOLOGY × BPO
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tighter">
            日本の未来を、<br />
            多角的に<br />
            デザインする。
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-12 leading-relaxed font-medium max-w-2xl">
            インバウンドを起点に、不動産・IT・建築・コンサルティングまで。<br className="hidden md:block" />
            領域を超えた挑戦で、新しい価値を創造する。
          </p>
          <div className="flex flex-wrap gap-6">
            <button onClick={() => setCurrentPage('service')} className="group bg-white text-slate-900 px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-primary hover:text-white transition-all">
              事業内容を見る <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setCurrentPage('recruit')} className="group border border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-white/10 transition-all">
              採用情報 <ChevronRight />
            </button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <span className="text-white/40 text-[10px] font-bold tracking-[0.3em] vertical-text">SCROLL</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent"></div>
      </div>
    </section>

    {/* Vision Section */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionTitle en="VISION" jp="領域を超え、可能性を広げる。" />
            <p className="text-xl text-slate-800 leading-loose mb-10 font-medium">
              私たちはインバウンドを軸に、不動産からIT、建築、Web制作、コンサルティングまで、多角的な事業を展開しています。<br /><br />
              一つの領域に縛られず、それぞれの専門性を掛け合わせることで、これまでにないスピードとクオリティで社会に貢献します。
            </p>
            <div className="flex items-center gap-4 text-primary font-bold">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span>CROSS-DOMAIN INNOVATION</span>
            </div>
          </motion.div>
          <div className="relative">
            <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" alt="Office" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const ServicePage = () => (
  <div className="bg-bg-soft min-h-screen pb-32">
    <PageHeader en="SERVICE" jp="多角的な事業展開" />
    <div className="max-w-7xl mx-auto px-6 mt-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "不動産事業", en: "Real Estate", icon: Building2, desc: "インバウンド特化型の物件開発から仲介まで。資産価値を最大化する不動産ソリューション。" },
          { title: "ITエンジニア事業", en: "IT Engineering", icon: Cpu, desc: "観光Tech、宿泊管理システムの自社開発。現場のDXを強力に推進する技術力。" },
          { title: "建築事業", en: "Construction", icon: HardHat, desc: "宿泊施設や店舗のリノベーション。デザインと機能を両立させた空間創造。" },
          { title: "Web制作事業", en: "Web Design", icon: Code, desc: "多言語対応の観光・集客特化型サイト制作。世界に届くクリエイティブを提供。" },
          { title: "BPO事業", en: "BPO Services", icon: Headphones, desc: "多言語カスタマーサポート・運営代行。24時間365日の安心を支える基盤。" },
          { title: "営業コンサルティング", en: "Consulting", icon: TrendingUp, desc: "インバウンド市場への参入・拡大支援。データに基づいた戦略立案と実行。" },
        ].map((service, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 group hover:border-primary/30 transition-all">
            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
              <service.icon className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-bold text-primary tracking-[0.2em] mb-2 block">{service.en}</span>
            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const FeaturesPage = () => (
  <div className="bg-white min-h-screen pb-32">
    <PageHeader en="FEATURES" jp="私たちの特徴" />
    <div className="max-w-7xl mx-auto px-6 mt-20">
      <div className="grid lg:grid-cols-3 gap-12">
        {[
          { title: "ワンストップの実行力", desc: "不動産からIT、BPOまでを内製化。スピード感のある意思決定と、一貫した品質管理が可能です。" },
          { title: "現場主義のDX", desc: "単なるシステム導入ではなく、現場のオペレーションを深く理解した上でのテクノロジー活用を追求します。" },
          { title: "グローバルな視座", desc: "多言語・多文化に対応したチームにより、海外ユーザーの真のニーズを捉えたサービスを展開します。" }
        ].map((feature, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="border-l-4 border-primary pl-8 py-4">
            <span className="text-4xl font-bold text-primary/10 mb-4 block">0{i + 1}</span>
            <h3 className="text-2xl font-bold mb-6">{feature.title}</h3>
            <p className="text-slate-600 leading-loose">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const MessagePage = () => (
  <div className="bg-slate-900 min-h-screen pb-32 text-white">
    <PageHeader en="MESSAGE" jp="代表メッセージ" />
    <div className="max-w-7xl mx-auto px-6 mt-20 grid lg:grid-cols-2 gap-20 items-center">
      <div className="relative">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200" 
            alt="Representative" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        <div className="absolute bottom-8 left-8 border-l-2 border-primary pl-6">
          <p className="text-sm font-bold tracking-widest uppercase text-primary mb-1">Representative</p>
          <p className="text-3xl font-bold">森 勝繁</p>
          <p className="text-slate-400 text-sm">Katsushige Mori</p>
        </div>
      </div>
      <div>
        <h3 className="text-3xl md:text-5xl font-bold mb-12 leading-tight tracking-tighter">
          「不可能を、<br />
          ワクワクに変えよう。」
        </h3>
        <div className="space-y-8 text-slate-300 text-lg leading-relaxed">
          <p>
            2025年、私たちは大きな志を持って南青山に誕生しました。日本の観光資源は世界トップクラスですが、それを受け入れる「インフラ」と「テクノロジー」はまだ発展途上です。
          </p>
          <p>
            私たちは、不動産という物理的な基盤と、ITというデジタルの力を掛け合わせることで、この課題を解決します。
          </p>
          <p className="text-white font-bold text-xl">
            「インバウンド革命」はまだ始まったばかりです。
          </p>
          <p>
            私たちは、現状に満足するチームではありません。常に新しい驚きを、常に圧倒的な熱量を。私たちと共に、日本の新しい未来を創りませんか。
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CompanyPage = () => (
  <div className="bg-white min-h-screen pb-32">
    <PageHeader en="COMPANY" jp="会社概要" />
    <div className="max-w-7xl mx-auto px-6 mt-20">
      <div className="grid lg:grid-cols-2 gap-20">
        <div className="space-y-0">
          {[
            { label: "会社名", value: "合同会社 Inboundtechnologies" },
            { label: "設立", value: "2025年7月" },
            { label: "代表者", value: "森 勝繁" },
            { label: "資本金", value: "1,000万円" },
            { label: "所在地", value: "〒107-0062 東京都港区南青山7-1-7 C-CUBE南青山4F" },
            { label: "事業内容", value: "不動産事業、ITエンジニア事業、建築事業、Web制作事業、BPO事業、営業コンサルティング事業、不動産関連事業" },
          ].map((item, i) => (
            <div key={i} className="flex py-8 border-b border-slate-100">
              <span className="w-32 md:w-48 shrink-0 font-bold text-slate-400 text-sm">{item.label}</span>
              <span className="text-slate-700 font-medium">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="h-[500px] bg-slate-100 rounded-2xl overflow-hidden grayscale">
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-400">
            <MapPin size={48} className="mb-4" />
            <p className="font-bold">GOOGLE MAPS AREA</p>
            <p className="text-sm">Minami Aoyama, Minato-ku, Tokyo</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RecruitPage = () => (
  <div className="bg-primary min-h-screen pb-32 text-white">
    <PageHeader en="RECRUIT" jp="採用情報" />
    <div className="max-w-7xl mx-auto px-6 mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tighter">革命の、当事者になろう。</h2>
        <p className="text-xl text-white/80 leading-loose mb-16">
          私たちは、単なる「社員」ではなく、共に未来を創る「パートナー」を求めています。<br className="hidden md:block" />
          あなたの情熱が、日本の新しいインフラを創る力になります。
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <a href="#" className="bg-white text-primary py-8 rounded-2xl font-bold text-2xl flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-2xl shadow-black/20">
            採用情報を見る <ArrowUpRight />
          </a>
          <a href="#" className="border border-white/30 text-white py-8 rounded-2xl font-bold text-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
            カジュアル面談 <Mail />
          </a>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'service' && <ServicePage />}
            {currentPage === 'features' && <FeaturesPage />}
            {currentPage === 'message' && <MessagePage />}
            {currentPage === 'company' && <CompanyPage />}
            {currentPage === 'recruit' && <RecruitPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                  <Globe2 className="text-white w-6 h-6" />
                </div>
                <span className="font-bold text-2xl tracking-tighter">Inboundtechnologies</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
                情熱が、日本の未来を塗り替える。<br />
                不動産・IT・建築・BPOを横断し、新しい社会インフラを構築するスタートアップ。
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div>
                <h5 className="text-xs font-bold tracking-[0.2em] text-primary mb-8">PAGES</h5>
                <ul className="space-y-4 text-sm font-medium text-slate-400">
                  <li><button onClick={() => { setCurrentPage('service'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">SERVICE</button></li>
                  <li><button onClick={() => { setCurrentPage('features'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">FEATURES</button></li>
                  <li><button onClick={() => { setCurrentPage('message'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">MESSAGE</button></li>
                  <li><button onClick={() => { setCurrentPage('company'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">COMPANY</button></li>
                </ul>
              </div>
              <div>
                <h5 className="text-xs font-bold tracking-[0.2em] text-primary mb-8">RECRUIT</h5>
                <ul className="space-y-4 text-sm font-medium text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">NEW GRADUATES</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">MID-CAREER</a></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h5 className="text-xs font-bold tracking-[0.2em] text-primary mb-8">CONTACT</h5>
                <ul className="space-y-4 text-sm font-medium text-slate-400">
                  <li className="flex items-center gap-3"><Mail size={16} /> info@inboundtech.co.jp</li>
                  <li className="flex items-center gap-3"><Phone size={16} /> 03-xxxx-xxxx</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-[10px] font-bold tracking-widest">
              &copy; 2026 INBOUNDTECHNOLOGIES LLC. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>

      {/* Page Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all z-40 border border-slate-100"
      >
        <ArrowUpRight className="-rotate-45" />
      </button>
    </div>
  );
}
