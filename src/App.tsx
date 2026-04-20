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
      className="fixed top-6 left-8 z-40 flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md border ${
        isDark ? "bg-slate-900 border-slate-700 shadow-indigo-900/20" : "bg-white border-blue-100 shadow-blue-200/50"
      }`}>
        <Users size={24} className={isDark ? "text-indigo-400" : "text-blue-600"} />
      </div>
      <div className="flex flex-col">
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 ${
          isDark ? "text-indigo-400" : "text-blue-600"
        }`}>Integrantes</span>
        <div className="flex flex-col">
          <span className={`text-base font-black tracking-tight leading-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Francielle, Thainara, Marina, Bárbara, Aline, Carol
          </span>
          <span className={`text-xs font-bold ${
            isDark ? "text-indigo-300" : "text-blue-700"
          }`}>
            - GRUPO 1 (MICROBIOLOGIA)
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides: SlideContent[] = [
    {
      id: "team",
      title: "Equipe de Apresentação",
      subtitle: "Conheça o grupo responsável por este projeto.",
      icon: <Users className="w-20 h-20 text-indigo-600" />,
      bgColor: "bg-indigo-50",
      accentColor: "text-indigo-600",
      content: (
        <div className="flex flex-col items-center space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {[
              { name: "Francielle", img: "https://i.postimg.cc/1znGgNcv/FRANCIELLE.jpg" },
              { name: "Thainara", img: "https://i.postimg.cc/Gp8FBsJM/Thainara.jpg" },
              { name: "Marina" },
              { name: "Bárbara", img: "https://i.postimg.cc/4376Khbz/BARBARA.jpg" },
              { name: "Aline" },
              { name: "Carol" }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-4 rounded-[2rem] shadow-xl border border-indigo-100 flex flex-col items-center space-y-3 group transition-all hover:border-indigo-300"
              >
                <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg ring-4 ring-white transition-transform group-hover:rotate-12 overflow-hidden">
                  {member.img ? (
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    member.name[0]
                  )}
                </div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">{member.name}</h3>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-black text-lg shadow-xl flex items-center gap-4"
          >
            <Activity size={20} />
            GRUPO 1 - MICROBIOLOGIA
          </motion.div>
        </div>
      )
    },
    {
      id: "intro",
      title: "Vacina da Gripe (Influenza)",
      subtitle: "Prevenção, Cuidado e Ciência para uma vida mais saudável.",
      icon: <ShieldCheck className="w-20 h-20 text-blue-600" />,
      bgColor: "bg-blue-50",
      accentColor: "text-blue-600",
      content: (
        <div className="flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative group cursor-zoom-in"
          >
            <div className="absolute -inset-6 bg-blue-400 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity animate-pulse" />
            <div className="relative p-2 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-xl overflow-hidden ring-1 ring-black/5 transition-transform group-hover:scale-105">
              <img 
                src="https://i.postimg.cc/QCzqHk9S/foto1.jpg" 
                alt="Vacina" 
                className="w-56 h-56 object-cover rounded-[2rem]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
          <div className="max-w-2xl">
            <p className="text-xl md:text-3xl text-gray-700 leading-relaxed font-medium">
              A vacinação é a forma mais eficaz de prevenir a gripe e suas complicações graves. 
              Entenda como ela funciona e por que é essencial para todos.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="px-5 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-black uppercase tracking-wider">Campanha 2024</span>
            <span className="px-5 py-2 bg-green-100 text-green-700 rounded-full text-sm font-black uppercase tracking-wider">Saúde Pública</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
              <h3 className="text-2xl font-black text-red-700 mb-4 flex items-center gap-3">
                <Activity className="w-8 h-8" /> Doença Viral
              </h3>
              <p className="text-gray-800 text-xl leading-relaxed">
                A gripe é uma infecção viral aguda do sistema respiratório, altamente contagiosa. 
                Diferente de um resfriado comum, ela pode ser muito mais severa.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-black text-gray-900 text-lg italic underline decoration-red-200">Sintomas Comuns:</h4>
              <ul className="grid grid-cols-2 gap-3">
                {["Febre Alta", "Tosse Seca", "Dor no Corpo", "Fadiga Extrema", "Dor de Garganta", "Calafrios"].map((s, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 text-lg font-medium">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-red-200 rounded-[4rem] blur-2xl opacity-20" />
            <div className="relative group rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-500 max-w-sm mx-auto">
              <img 
                src="https://i.postimg.cc/C50RJZyx/foto2.jpg" 
                alt="Sintomas" 
                className="w-full h-auto object-cover max-h-[350px] scale-105 group-hover:scale-100 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div 
              initial={{ scale: 0, rotate: 10 }}
              animate={{ scale: 1, rotate: -5 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -bottom-6 -left-2 bg-white p-4 rounded-2xl shadow-xl max-w-[200px] border border-red-100 z-20"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Alerta</p>
              </div>
              <p className="text-gray-700 text-xs leading-tight">
                Complicações como a <strong className="text-red-900">Pneumonia</strong> são riscos reais.
              </p>
            </motion.div>
          </motion.div>
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
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-2xl font-medium text-gray-800">
              Grupos prioritários devido ao maior risco de complicações:
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Crianças", desc: "Até 6 anos", img: "https://i.postimg.cc/rFjLDDQr/criancas.jpg" },
              { label: "Idosos", desc: "60+ anos", img: "https://i.postimg.cc/3JYTrXCj/idosos.jpg" },
              { label: "Gestantes", desc: "E puérperas", img: "https://i.postimg.cc/X7L0rrQF/gestantes.jpg" },
              { label: "Saúde", desc: "Profissionais", img: "https://i.postimg.cc/GhdC3FJQ/saude.jpg" },
              { label: "Crônicos", desc: "Comorbidades", img: "https://i.postimg.cc/9FChXdt1/cronicos.jpg" },
            ].map((group, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white p-4 pb-5 rounded-2xl shadow-md border border-emerald-100 text-center space-y-3 hover:shadow-lg transition-all"
              >
                <div className="w-full aspect-square bg-emerald-50 rounded-xl overflow-hidden shadow-inner border border-emerald-50">
                  <img 
                    src={group.img} 
                    alt={group.label} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-lg uppercase tracking-tight">{group.label}</h4>
                  <p className="text-sm font-bold text-emerald-600 mt-1">{group.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-emerald-600 text-white p-8 rounded-2xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-6">
              <Heart className="w-12 h-12 text-emerald-200" />
              <div>
                <h3 className="text-3xl font-black">Indicado para TODOS!</h3>
                <p className="text-emerald-100 text-lg">Vacinar é cuidado coletivo.</p>
              </div>
            </div>
            <button className="bg-white text-emerald-700 px-8 py-3 rounded-full font-black text-lg hover:bg-emerald-50 transition-colors">
              Detalhes
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: "01",
              title: "Estímulo",
              desc: "A vacina apresenta ao corpo fragmentos inofensivos do vírus.",
              icon: <Info className="text-indigo-500" />
            },
            {
              step: "02",
              title: "Anticorpos",
              desc: "O sistema reconhece e produz defesas específicas.",
              icon: <Activity className="text-indigo-500" />
            },
            {
              step: "03",
              title: "Proteção",
              desc: "Seu corpo já sabe como combatê-lo rapidamente.",
              icon: <ShieldCheck className="text-indigo-500" />
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 text-5xl font-black text-indigo-50 opacity-40 group-hover:opacity-100 transition-opacity">
                {item.step}
              </div>
              <div className="relative z-10 space-y-3">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                </div>
                <h3 className="text-2xl font-black text-gray-900">{item.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-3 relative group"
          >
            <div className="relative h-40 overflow-hidden rounded-2xl border border-indigo-200/50">
              <img 
                src="https://i.postimg.cc/7YxC2Tnq/foto3.jpg" 
                alt="Sistema Imunológico" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-transparent" />
            </div>
          </motion.div>
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
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-gray-900 leading-tight">O vírus sofre mutações constantes</h3>
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                Pequenas mudanças genéticas criam novas variantes que podem "enganar" as defesas anteriores.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-orange-100 shadow-sm transition-transform hover:scale-[1.02]">
                <div className="bg-orange-100 p-2 rounded-lg"><Biohazard size={20} className="text-orange-600" /></div>
                <div>
                  <h4 className="font-black text-lg">Novas Variantes</h4>
                  <p className="text-sm text-gray-600 font-bold uppercase tracking-wider">Ameaça contínua</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl border border-orange-100 shadow-sm transition-transform hover:scale-[1.02]">
                <div className="bg-orange-100 p-2 rounded-lg"><RefreshCw size={20} className="text-orange-600" /></div>
                <div>
                  <h4 className="font-black text-lg">Vacina Atualizada</h4>
                  <p className="text-sm text-gray-600 font-bold uppercase tracking-wider">Monitoramento da OMS</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-[280px]">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative group"
            >
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-xl transform group-hover:-rotate-1 transition-transform">
                <img 
                  src="https://i.postimg.cc/pLSy4cNc/foto4.jpg" 
                  alt="Mutação do Vírus" 
                  className="w-full h-auto object-cover aspect-square"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/95 p-2 rounded-xl shadow-md animate-bounce">
                    <RefreshCw className="text-orange-600 animate-spin" style={{ animationDuration: '3s' }} size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { type: "mito", text: "A vacina causa gripe.", detail: "É feita de vírus morto." },
            { type: "mito", text: "Só tomo uma vez na vida.", detail: "A dose deve ser anual." },
            { type: "verdade", text: "Reduz riscos graves.", detail: "Diminui internações e óbitos." },
            { type: "verdade", text: "Pode haver reações.", detail: "Dor ou febre baixa são normais." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className={`p-5 rounded-2xl shadow-sm border flex gap-4 ${
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
              <div className="space-y-1">
                <h4 className={`font-black text-xl leading-tight ${item.type === "mito" ? "text-red-700" : "text-green-700"}`}>
                  {item.type.toUpperCase()}: {item.text}
                </h4>
                <p className="text-gray-700 text-sm font-medium">{item.detail}</p>
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
        <div className="text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
              Vacinar é um ato de cuidado.
            </h3>
            <p className="text-xl md:text-3xl text-gray-600 font-medium tracking-tight">
              Procure o posto de saúde mais próximo.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-pink-100 flex flex-col items-center space-y-3 flex-1 max-w-xs">
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center">
                <Users className="text-pink-600 w-7 h-7" />
              </div>
              <h4 className="font-black text-gray-900 text-xl">Imunidade Coletiva</h4>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Proteção de todos</p>
            </div>
            <div className="bg-pink-600 text-white p-8 rounded-[3rem] shadow-xl flex flex-col items-center space-y-4 flex-1 max-w-sm">
              <ShieldCheck size={48} className="text-pink-200" />
              <div className="space-y-2">
                <h4 className="text-3xl font-black italic">Pronto?</h4>
                <p className="text-pink-100 text-base font-medium">Leve seu cartão de vacina.</p>
              </div>
              <button className="bg-white text-pink-600 px-10 py-4 rounded-full font-black text-xl shadow-xl hover:scale-105 transition-transform">
                Localizar Posto
              </button>
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
    <div className={`h-screen ${slide.bgColor} transition-colors duration-700 font-sans text-gray-900 overflow-hidden selection:bg-blue-200`}>
      <ProgressBar current={currentSlide} total={slides.length} />
      {/* <AuthorHeader isDark={slide.id === "developer"} /> */}
      
      <main className="container mx-auto px-6 py-10 h-full flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1 flex flex-col justify-center"
          >
            {/* Slide Header */}
            <div className="mb-6 flex items-center gap-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                {React.cloneElement(slide.icon as React.ReactElement, { className: "w-10 h-10" })}
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-7xl font-black tracking-tight"
                >
                  {slide.title}
                </motion.h1>
                {slide.subtitle && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-500 mt-1"
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
