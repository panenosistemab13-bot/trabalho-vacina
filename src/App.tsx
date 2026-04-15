/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Biohazard, 
  Users, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  Stethoscope,
  Heart,
  Info,
  Code,
  Mail,
  Phone
} from "lucide-react";

// --- Types ---

interface SlideContent {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  bgColor: string;
  accentColor: string;
}

// --- Components ---

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const progress = ((current + 1) / total) * 100;
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
      <motion.div 
        className="h-full bg-blue-600"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

const Navigation = ({ 
  onNext, 
  onPrev, 
  isFirst, 
  isLast 
}: { 
  onNext: () => void; 
  onPrev: () => void; 
  isFirst: boolean; 
  isLast: boolean;
}) => {
  return (
    <div className="fixed bottom-8 right-8 flex gap-4 z-50">
      <button
        onClick={onPrev}
        disabled={isFirst}
        className={`p-4 rounded-full shadow-lg transition-all ${
          isFirst ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-blue-600 hover:bg-blue-50 active:scale-95"
        }`}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={onNext}
        disabled={isLast}
        className={`p-4 rounded-full shadow-lg transition-all ${
          isLast ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
        }`}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const AuthorHeader = ({ isDark }: { isDark: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 left-8 z-40 flex items-center gap-3"
    >
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm border ${
        isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
      }`}>
        <Users size={20} className="text-blue-600" />
      </div>
      <div className="flex flex-col">
        <span className={`text-xs font-bold uppercase tracking-widest ${
          isDark ? "text-blue-400" : "text-blue-600"
        }`}>Apresentado por</span>
        <span className={`text-sm font-black tracking-tight ${
          isDark ? "text-white" : "text-gray-900"
        }`}>
          Francielle J. de Souza Vieira
        </span>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides: SlideContent[] = [
    {
      id: "intro",
      title: "Vacina da Gripe (Influenza)",
      subtitle: "Prevenção, Cuidado e Ciência para uma vida mais saudável.",
      icon: <ShieldCheck className="w-20 h-20 text-blue-600" />,
      bgColor: "bg-blue-50",
      accentColor: "text-blue-600",
      content: (
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-blue-200 rounded-full blur-2xl opacity-30 animate-pulse" />
            <img 
              src="https://picsum.photos/seed/vaccine/800/600" 
              alt="Vacina" 
              className="w-64 h-64 object-cover rounded-3xl shadow-2xl relative z-10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="max-w-2xl">
            <p className="text-xl text-gray-600 leading-relaxed">
              A vacinação é a forma mais eficaz de prevenir a gripe e suas complicações graves. 
              Entenda como ela funciona e por que é essencial para todos.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Campanha 2024</span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">Saúde Pública</span>
          </div>
        </div>
      )
    },
    {
      id: "what-is",
      title: "O que é a Gripe?",
      icon: <Biohazard className="w-16 h-16 text-red-500" />,
      bgColor: "bg-red-50",
      accentColor: "text-red-600",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
              <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6" /> Doença Viral
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A gripe é uma infecção viral aguda do sistema respiratório, altamente contagiosa. 
                Diferente de um resfriado comum, ela pode ser muito mais severa.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Sintomas Comuns:</h4>
              <ul className="grid grid-cols-2 gap-3">
                {["Febre Alta", "Tosse Seca", "Dor no Corpo", "Fadiga Extrema", "Dor de Garganta", "Calafrios"].map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-red-400 rounded-full" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/flu-symptoms/600/800" 
              alt="Sintomas" 
              className="rounded-3xl shadow-xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg max-w-xs border border-red-100">
              <p className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2">Alerta</p>
              <p className="text-gray-700 text-sm">
                Complicações como a <strong>Pneumonia</strong> são riscos reais, especialmente para grupos vulneráveis.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "who",
      title: "Quem deve vacinar?",
      icon: <Users className="w-16 h-16 text-emerald-600" />,
      bgColor: "bg-emerald-50",
      accentColor: "text-emerald-600",
      content: (
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xl text-gray-700">
              Embora a vacina seja recomendada para <strong>todos</strong> a partir dos 6 meses, 
              alguns grupos têm prioridade devido ao maior risco de complicações.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { label: "Crianças", desc: "6 meses a 6 anos", img: "child" },
              { label: "Idosos", desc: "60 anos ou mais", img: "elderly" },
              { label: "Gestantes", desc: "E puérperas", img: "pregnant" },
              { label: "Saúde", desc: "Profissionais", img: "doctor" },
              { label: "Crônicos", desc: "Comorbidades", img: "medical" },
            ].map((group, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center">
                  <img 
                    src={`https://picsum.photos/seed/${group.img}/100/100`} 
                    alt={group.label} 
                    className="w-12 h-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{group.label}</h4>
                  <p className="text-xs text-gray-500">{group.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-emerald-600 text-white p-8 rounded-3xl flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-6">
              <Heart className="w-12 h-12 text-emerald-200" />
              <div>
                <h3 className="text-2xl font-bold">Indicado para TODOS!</h3>
                <p className="text-emerald-100">Vacinar é um ato de cuidado coletivo.</p>
              </div>
            </div>
            <button className="bg-white text-emerald-700 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors">
              Saiba Mais
            </button>
          </div>
        </div>
      )
    },
    {
      id: "how-works",
      title: "Como a vacina age?",
      icon: <Stethoscope className="w-16 h-16 text-indigo-600" />,
      bgColor: "bg-indigo-50",
      accentColor: "text-indigo-600",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Estímulo",
              desc: "A vacina apresenta ao corpo fragmentos inofensivos do vírus (vírus inativado).",
              icon: <Info className="text-indigo-500" />
            },
            {
              step: "02",
              title: "Anticorpos",
              desc: "O sistema imunológico reconhece esses fragmentos e produz anticorpos específicos.",
              icon: <Activity className="text-indigo-500" />
            },
            {
              step: "03",
              title: "Proteção",
              desc: "Se você for exposto ao vírus real, seu corpo já sabe como combatê-lo rapidamente.",
              icon: <ShieldCheck className="text-indigo-500" />
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-indigo-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-6xl font-black text-indigo-50 opacity-50 group-hover:opacity-100 transition-opacity">
                {item.step}
              </div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
          <div className="md:col-span-3 mt-8">
            <img 
              src="https://picsum.photos/seed/immune-system/1200/400" 
              alt="Sistema Imunológico" 
              className="w-full h-48 object-cover rounded-3xl shadow-inner"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )
    },
    {
      id: "annual",
      title: "Por que tomar todo ano?",
      icon: <RefreshCw className="w-16 h-16 text-orange-600" />,
      bgColor: "bg-orange-50",
      accentColor: "text-orange-600",
      content: (
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-900">O vírus sofre mutações constantes</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                O vírus Influenza é mestre em se transformar. Pequenas mudanças genéticas criam novas variantes que podem "enganar" os anticorpos do ano anterior.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4 bg-white p-4 rounded-2xl shadow-sm border border-orange-100">
                <div className="bg-orange-100 p-2 rounded-lg"><Biohazard size={20} className="text-orange-600" /></div>
                <div>
                  <h4 className="font-bold">Novas Variantes</h4>
                  <p className="text-sm text-gray-500">Surgem a cada temporada em diferentes partes do mundo.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-2xl shadow-sm border border-orange-100">
                <div className="bg-orange-100 p-2 rounded-lg"><RefreshCw size={20} className="text-orange-600" /></div>
                <div>
                  <h4 className="font-bold">Vacina Atualizada</h4>
                  <p className="text-sm text-gray-500">A OMS monitora as cepas circulantes para atualizar a vacina anualmente.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative p-8">
              <div className="absolute inset-0 bg-orange-200 rounded-full blur-3xl opacity-20" />
              <img 
                src="https://picsum.photos/seed/mutation/600/600" 
                alt="Mutação" 
                className="w-full aspect-square object-cover rounded-full shadow-2xl relative z-10 border-8 border-white"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "myths",
      title: "Mitos x Verdades",
      icon: <Info className="w-16 h-16 text-purple-600" />,
      bgColor: "bg-purple-50",
      accentColor: "text-purple-600",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { type: "mito", text: "A vacina causa gripe.", detail: "A vacina é feita de vírus inativado (morto), incapaz de causar a doença." },
            { type: "mito", text: "Só preciso tomar uma vez na vida.", detail: "Como o vírus muda e a imunidade cai, a dose deve ser anual." },
            { type: "verdade", text: "A vacina reduz complicações graves.", detail: "Diminui drasticamente internações e óbitos por pneumonia e outras complicações." },
            { type: "verdade", text: "Pode haver reações leves.", detail: "Dor no local ou febre baixa são sinais de que o corpo está reagindo à vacina." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-3xl shadow-sm border flex gap-4 ${
                item.type === "mito" ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"
              }`}
            >
              <div className="shrink-0">
                {item.type === "mito" ? (
                  <XCircle className="text-red-500 w-8 h-8" />
                ) : (
                  <CheckCircle2 className="text-green-500 w-8 h-8" />
                )}
              </div>
              <div className="space-y-2">
                <h4 className={`font-bold text-lg ${item.type === "mito" ? "text-red-700" : "text-green-700"}`}>
                  {item.type.toUpperCase()}: {item.text}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: "cta",
      title: "Proteja-se e Proteja a Todos",
      icon: <Heart className="w-16 h-16 text-pink-600" />,
      bgColor: "bg-pink-50",
      accentColor: "text-pink-600",
      content: (
        <div className="text-center space-y-12 py-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-4xl font-black text-gray-900 leading-tight">
              Vacinar é um ato de cuidado e prevenção.
            </h3>
            <p className="text-xl text-gray-600">
              Não deixe para depois. Procure o posto de saúde mais próximo e garanta sua dose anual.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-pink-100 flex flex-col items-center space-y-4 w-full max-w-xs">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <Users className="text-pink-600" />
              </div>
              <h4 className="font-bold text-gray-900">Imunidade Coletiva</h4>
              <p className="text-sm text-gray-500">Quanto mais pessoas vacinadas, menos o vírus circula.</p>
            </div>
            <div className="bg-pink-600 text-white p-12 rounded-[3rem] shadow-2xl flex flex-col items-center space-y-6 w-full max-w-md transform hover:scale-105 transition-transform">
              <ShieldCheck size={64} className="text-pink-200" />
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">Pronto para Vacinar?</h4>
                <p className="text-pink-100">Leve seu cartão de vacina e documento com foto.</p>
              </div>
              <button className="bg-white text-pink-600 px-10 py-4 rounded-full font-black text-lg shadow-lg hover:bg-pink-50 transition-colors">
                Encontrar Posto
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "developer",
      title: "Desenvolvido por ZURK",
      subtitle: "Inovação e Tecnologia a serviço da saúde.",
      icon: <Code className="w-16 h-16 text-indigo-400" />,
      bgColor: "bg-slate-950",
      accentColor: "text-indigo-400",
      content: (
        <div className="flex flex-col items-center text-center space-y-12 py-12">
          <motion.div
            initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1 }}
            className="relative"
          >
            {/* Recreating the ZURK logo from the image */}
            <div className="w-64 h-64 bg-[#2D1B4E] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(45,27,78,0.5)] border-4 border-[#C5A059]">
              <span className="text-[120px] font-serif font-bold text-[#C5A059] leading-none select-none">Z</span>
            </div>
            <div className="absolute -inset-8 bg-indigo-500 rounded-full blur-3xl opacity-10 animate-pulse" />
          </motion.div>
          
          <div className="max-w-2xl space-y-6">
            <h3 className="text-5xl font-black text-white tracking-tighter">ZURK</h3>
            <p className="text-xl text-slate-400 leading-relaxed">
              Transformando ideias em soluções digitais de alto impacto. 
              Especialistas em criar experiências memoráveis e funcionais.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3 bg-slate-900/50 px-6 py-3 rounded-2xl border border-slate-800">
              <Mail size={18} className="text-indigo-400" />
              <span className="text-slate-300 font-medium">zurkcommerce@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/50 px-6 py-3 rounded-2xl border border-slate-800">
              <Phone size={18} className="text-indigo-400" />
              <span className="text-slate-300 font-medium">+55 31 98120-3930</span>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">2026</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Lançamento</p>
            </div>
            <div className="w-px h-12 bg-slate-800" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">v1.0</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Versão</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(s => s + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(s => s - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className={`min-h-screen ${slide.bgColor} transition-colors duration-700 font-sans text-gray-900 overflow-hidden selection:bg-blue-200`}>
      <ProgressBar current={currentSlide} total={slides.length} />
      <AuthorHeader isDark={slide.id === "developer"} />
      
      <main className="container mx-auto px-6 py-20 min-h-screen flex flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1 flex flex-col"
          >
            {/* Slide Header */}
            <div className="mb-12 flex items-center gap-6">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="p-4 bg-white rounded-3xl shadow-sm border border-gray-100"
              >
                {slide.icon}
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl font-black tracking-tight"
                >
                  {slide.title}
                </motion.h1>
                {slide.subtitle && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-500 mt-2"
                  >
                    {slide.subtitle}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Slide Content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-6xl">
                {slide.content}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-8 left-8 flex items-center gap-4 text-gray-400 text-sm font-medium z-50">
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-blue-600" : "w-1.5 bg-gray-300"
              }`} 
            />
          ))}
        </div>
        <span>{currentSlide + 1} / {slides.length}</span>
      </footer>

      <Navigation 
        onNext={nextSlide} 
        onPrev={prevSlide} 
        isFirst={currentSlide === 0} 
        isLast={currentSlide === slides.length - 1} 
      />
    </div>
  );
}
