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
            - GRUPO 01 (MICROBIOLOGIA)
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
        <div className="flex flex-col items-center space-y-3 md:space-y-6">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-6 w-full max-w-4xl">
            {[
              { name: "Francielle", img: "https://i.postimg.cc/YqMT1tPL/FRANCIELLE-2.jpg" },
              { name: "Thainara", img: "https://i.postimg.cc/xTnBK9Zz/Thainara-2.jpg" },
              { name: "Marina" },
              { name: "Bárbara", img: "https://i.postimg.cc/HnZ0c0KZ/BARBARA2.jpg" },
              { name: "Aline", img: "https://i.postimg.cc/WbTxMsyd/ALINE.jpg" },
              { name: "Carol", img: "https://i.postimg.cc/ht5SyJFH/CAROL-2.jpg" }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-2 md:p-4 rounded-2xl md:rounded-[2rem] shadow-md md:shadow-xl border border-indigo-100 flex flex-col items-center space-y-1 md:space-y-3 group transition-all"
              >
                <div className="w-14 h-14 md:w-28 md:h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl md:text-3xl font-black shadow-md ring-2 md:ring-4 ring-white transition-transform group-hover:rotate-12 overflow-hidden shrink-0">
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
                <h3 className="text-[10px] md:text-xl font-black text-gray-900 tracking-tight text-center leading-none">{member.name}</h3>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-indigo-600 text-white px-4 py-1.5 md:px-8 md:py-3 rounded-full font-black text-[10px] md:text-lg shadow-lg flex items-center gap-2 md:gap-4 shrink-0 whitespace-nowrap"
          >
            <Activity size={12} className="md:w-5 md:h-5 shrink-0" />
            GRUPO 01 - MICROBIOLOGIA
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
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative group shrink-0"
          >
            <div className="absolute -inset-4 md:-inset-6 bg-blue-400 rounded-full blur-2xl md:blur-3xl opacity-20 group-hover:opacity-30 transition-opacity animate-pulse" />
            <div className="relative p-1 md:p-2 bg-white/40 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] border border-white/60 shadow-lg md:shadow-xl overflow-hidden">
              <img 
                src="https://i.postimg.cc/QCzqHk9S/foto1.jpg" 
                alt="Vacina" 
                className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-[1.5rem] md:rounded-[2rem]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          <div className="max-w-2xl px-2">
            <p className="text-base md:text-3xl text-gray-700 font-medium leading-tight md:leading-relaxed">
              A vacinação é a forma mais eficaz de prevenir a gripe e suas complicações graves. 
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 md:px-5 md:py-2 bg-green-100 text-green-700 rounded-full text-[10px] md:text-sm font-black uppercase tracking-wider">Saúde Pública</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center overflow-hidden">
          <div className="space-y-2 md:space-y-6">
            <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-red-100">
              <h3 className="text-base md:text-2xl font-black text-red-700 mb-1 md:mb-4 flex items-center gap-2 md:gap-3">
                <Activity className="w-5 h-5 md:w-8 md:h-8" /> Doença Viral
              </h3>
              <p className="text-gray-800 text-sm md:text-xl leading-snug md:leading-relaxed">
                Infecção viral aguda respiratória, altamente contagiosa e severa.
              </p>
            </div>
            <div className="space-y-1 md:space-y-4">
              <h4 className="font-black text-gray-900 text-xs md:text-lg italic underline decoration-red-200">Sintomas:</h4>
              <ul className="grid grid-cols-3 md:grid-cols-2 gap-1 md:gap-3">
                {["Febre", "Tosse", "Cansaço", "Dores", "Garganta", "Fio"].map((s, i) => (
                  <li key={i} className="flex items-center gap-1.5 md:gap-3 text-gray-700 text-[10px] md:text-lg font-medium">
                    <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-red-500 rounded-full" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative flex justify-center shrink-0"
          >
            <div className="relative group rounded-2xl md:rounded-[2.5rem] overflow-hidden border-2 md:border-4 border-white shadow-lg max-w-[140px] md:max-w-sm">
              <img 
                src="https://i.postimg.cc/C50RJZyx/foto2.jpg" 
                alt="Sintomas" 
                className="w-full h-auto object-cover max-h-[160px] md:max-h-[350px]"
                referrerPolicy="no-referrer"
              />
            </div>
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
        <div className="space-y-3 md:space-y-8">
          <div className="text-center max-w-2xl mx-auto px-2">
            <p className="text-base md:text-2xl font-medium text-gray-800 leading-tight">
              Grupos prioritários de risco:
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 overflow-hidden">
            {[
              { label: "Crianças", desc: "Até 6a", img: "https://i.postimg.cc/rFjLDDQr/criancas.jpg" },
              { label: "Idosos", desc: "60+", img: "https://i.postimg.cc/3JYTrXCj/idosos.jpg" },
              { label: "Gestantes", desc: "Puérp.", img: "https://i.postimg.cc/X7L0rrQF/gestantes.jpg" },
              { label: "Saúde", desc: "Profis.", img: "https://i.postimg.cc/GhdC3FJQ/saude.jpg" },
              { label: "Crônicos", desc: "Comorb.", img: "https://i.postimg.cc/9FChXdt1/cronicos.jpg" },
            ].map((group, i) => (
              <motion.div 
                key={i}
                className="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-sm border border-emerald-100 text-center space-y-1 transition-all"
              >
                <div className="w-full aspect-square bg-emerald-50 rounded-lg md:rounded-xl overflow-hidden shadow-inner border border-emerald-50 shrink-0">
                  <img 
                    src={group.img} 
                    alt={group.label} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-[10px] md:text-lg uppercase tracking-tight leading-none truncate">{group.label}</h4>
                  <p className="text-[8px] md:text-sm font-bold text-emerald-600 mt-0.5 leading-none">{group.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-emerald-600 text-white p-3 md:p-8 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md shrink-0">
            <div className="flex items-center gap-3 md:gap-6">
              <Heart className="w-6 h-6 md:w-12 md:h-12 text-emerald-200" />
              <div>
                <h3 className="text-sm md:text-3xl font-black">Público Alvo</h3>
                <p className="text-emerald-100 text-[10px] md:text-lg">Cuidado coletivo.</p>
              </div>
            </div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[9px] md:text-base text-emerald-800 font-bold text-center italic"
          >
            "Em Campanhas de vacinação, são liberadas para todos a vacina."
          </motion.p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 overflow-hidden">
          {[
            {
              step: "01",
              title: "Estímulo",
              desc: "A vacina apresenta o vírus inativado.",
              icon: <Info className="text-indigo-500" />
            },
            {
              step: "02",
              title: "Anticorpos",
              desc: "O sistema produz defesas.",
              icon: <Activity className="text-indigo-500" />
            },
            {
              step: "03",
              title: "Proteção",
              desc: "Combate rápido do vírus real.",
              icon: <ShieldCheck className="text-indigo-500" />
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-indigo-100 relative group">
              <div className="absolute top-0 right-0 p-1 md:p-3 text-2xl md:text-5xl font-black text-indigo-50 opacity-40 group-hover:opacity-100 transition-opacity leading-none">
                {item.step}
              </div>
              <div className="relative z-10 flex md:flex-col items-center md:items-start gap-4 md:space-y-3">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-4 h-4 md:w-6 md:h-6" })}
                </div>
                <div>
                  <h3 className="text-sm md:text-2xl font-black text-gray-900 leading-none mb-1">{item.title}</h3>
                  <p className="text-gray-700 text-[10px] md:text-lg leading-tight font-medium">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:col-span-3 relative flex justify-center shrink-0"
          >
            <div className="relative h-24 md:h-40 w-full overflow-hidden rounded-xl md:rounded-2xl border border-indigo-200/50">
              <img 
                src="https://i.postimg.cc/SRdBhyTR/111.jpg" 
                alt="Processo de Imunização" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
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
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center overflow-hidden">
          <div className="flex-1 space-y-3 md:space-y-6">
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-base md:text-3xl font-black text-gray-900 leading-tight">Vírus Mutante</h3>
              <p className="text-sm md:text-xl text-gray-700 leading-snug md:leading-relaxed font-medium">
                Mudanças genéticas constantes exigem reforço anual.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 md:gap-3">
              <div className="flex items-center gap-2 md:gap-4 bg-white p-2 md:p-4 rounded-xl border border-orange-100 shadow-sm transition-transform hover:scale-[1.02]">
                <div className="bg-orange-100 p-1.5 md:p-2 rounded-lg shrink-0"><Biohazard size={16} className="text-orange-600 md:w-5 md:h-5" /></div>
                <div>
                  <h4 className="font-black text-xs md:text-lg leading-none">Mutações</h4>
                  <p className="text-[8px] md:text-sm text-gray-500 font-bold uppercase hidden md:block">Variantes</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4 bg-white p-2 md:p-4 rounded-xl border border-orange-100 shadow-sm transition-transform hover:scale-[1.02]">
                <div className="bg-orange-100 p-1.5 md:p-2 rounded-lg shrink-0"><RefreshCw size={16} className="text-orange-600 md:w-5 md:h-5" /></div>
                <div>
                  <h4 className="font-black text-xs md:text-lg leading-none">Reforço</h4>
                  <p className="text-[8px] md:text-sm text-gray-500 font-bold uppercase hidden md:block">Atualizada</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-[140px] md:max-w-[280px]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative group shrink-0"
            >
              <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border-2 md:border-4 border-white shadow-lg">
                <img 
                  src="https://i.postimg.cc/pLSy4cNc/foto4.jpg" 
                  alt="Mutação do Vírus" 
                  className="w-full h-auto object-cover aspect-square"
                  referrerPolicy="no-referrer"
                />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 overflow-hidden">
          {[
            { type: "mito", text: "Causa gripe.", detail: "Vírus morto." },
            { type: "mito", text: "Só tomo uma vez.", detail: "Deve ser anual." },
            { type: "verdade", text: "Reduz riscos.", detail: "Menos internações." },
            { type: "verdade", text: "Reações leves.", detail: "São normais." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className={`p-3 md:p-5 rounded-xl md:rounded-2xl shadow-sm border flex gap-3 md:gap-4 shrink-0 ${
                item.type === "mito" ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"
              }`}
            >
              <div className="shrink-0">
                {item.type === "mito" ? (
                  <XCircle className="text-red-500 w-5 h-5 md:w-8 md:h-8" />
                ) : (
                  <CheckCircle2 className="text-green-500 w-5 h-5 md:w-8 md:h-8" />
                )}
              </div>
              <div className="space-y-0.5 md:space-y-1">
                <h4 className={`font-black text-xs md:text-xl leading-none ${item.type === "mito" ? "text-red-700" : "text-green-700"}`}>
                   {item.text}
                </h4>
                <p className="text-gray-700 text-[10px] md:text-sm font-medium">{item.detail}</p>
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
        <div className="text-center space-y-4 md:space-y-8 overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-1 md:space-y-3">
            <h3 className="text-xl md:text-5xl font-black text-gray-900 leading-tight">
              Ato de cuidado.
            </h3>
            <p className="text-sm md:text-3xl text-gray-600 font-medium tracking-tight">
              Procure o posto de saúde.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center items-center">
            <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-3xl shadow-md border border-pink-100 flex flex-col items-center space-y-1 md:space-y-3 shrink-0">
              <Users className="text-pink-600 w-5 h-5 md:w-7 md:h-7" />
              <h4 className="font-black text-gray-900 text-xs md:text-xl">Imunidade Coletiva</h4>
            </div>
            <div className="bg-pink-600 text-white p-4 md:p-8 rounded-2xl md:rounded-[3rem] shadow-lg flex flex-col items-center space-y-2 md:space-y-4 w-full max-w-[240px] md:max-w-sm shrink-0">
              <ShieldCheck size={32} className="text-pink-200 hidden md:block" />
              <div className="space-y-1 md:space-y-2">
                <h4 className="text-lg md:text-3xl font-black italic">Pronto?</h4>
                <p className="text-pink-100 text-[10px] md:text-base font-medium">Use máscara e vacine.</p>
              </div>
              <button className="bg-white text-pink-600 px-5 py-2 md:px-10 md:py-4 rounded-full font-black text-xs md:text-xl shadow-md transition-transform">
                Localizar Posto
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "thanks",
      title: "Agradecimentos",
      subtitle: "Cuidado e prevenção em primeiro lugar.",
      icon: <Users className="w-16 h-16 text-amber-600" />,
      bgColor: "bg-amber-50",
      accentColor: "text-amber-600",
      content: (
        <div className="text-center space-y-4 md:space-y-8 overflow-hidden">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="bg-white px-6 py-4 md:px-12 md:py-8 rounded-3xl md:rounded-[3rem] shadow-xl border-2 md:border-4 border-amber-200 inline-block mb-2">
              <h2 className="text-2xl md:text-6xl font-black text-amber-600 tracking-tight">OBRIGADO A TODOS!</h2>
            </div>
          </motion.div>
          
          <div className="max-w-xl mx-auto px-2">
            <div className="bg-red-600 text-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-lg space-y-2 md:space-y-4 relative overflow-hidden">
               <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4">
                  <Activity size={32} className="text-red-200 md:w-12 md:h-12" />
                  <h3 className="text-base md:text-3xl font-black uppercase tracking-tight leading-none">Advertência</h3>
                  <p className="text-xs md:text-xl font-medium leading-tight md:leading-relaxed">
                    A vacinação anual é essencial. Não espere o inverno chegar: proteja-se agora e evite complicações graves da Influenza.
                  </p>
                  <div className="bg-white/20 px-4 py-1 rounded-full text-[10px] md:text-sm font-black italic">
                    "Vacina no braço, saúde no peito!"
                  </div>
               </div>
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
      
      <main className="container mx-auto px-4 py-4 md:py-10 h-full flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1 flex flex-col justify-center overflow-hidden"
          >
            {/* Slide Header */}
            <div className="mb-4 md:mb-6 flex items-center gap-3 md:gap-4 shrink-0">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="p-2 md:p-3 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100"
              >
                {React.cloneElement(slide.icon as React.ReactElement, { className: "w-6 h-6 md:w-10 md:h-10" })}
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-7xl font-black tracking-tight leading-tight"
                >
                  {slide.title}
                </motion.h1>
                {slide.subtitle && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs md:text-2xl text-gray-500 mt-0.5"
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
