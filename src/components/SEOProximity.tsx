/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AppTheme } from '../types';
import { TESTIMONIALS } from '../data';
import { Star, MapPin, MessageCircle, Navigation, Users, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SEOProximityProps {
  activeTheme: AppTheme;
  onOpenCart: () => void;
}

export default function SEOProximity({ activeTheme, onOpenCart }: SEOProximityProps) {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  useEffect(() => {
    // 5 seconds delay to trigger the WhatsApp speech bubble (Option 5 requirement)
    const timer = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const getThemeStyles = () => {
    switch (activeTheme) {
      case AppTheme.URBAN:
        return {
          cardBg: 'bg-[#1E1E1E] border-zinc-800 text-white shadow-xl',
          accentText: 'text-orange-500',
          accentBg: 'bg-orange-500/10',
          avatarBorder: 'border-orange-500',
          mapBg: 'bg-zinc-950 border-zinc-800',
          bubbleBg: 'bg-orange-600 text-white'
        };
      case AppTheme.PODRAO:
        return {
          cardBg: 'bg-white border-emerald-100 text-zinc-950 shadow-md',
          accentText: 'text-emerald-700',
          accentBg: 'bg-emerald-500/10',
          avatarBorder: 'border-emerald-500',
          mapBg: 'bg-emerald-50/20 border-emerald-100',
          bubbleBg: 'bg-emerald-600 text-white'
        };
      case AppTheme.CLASSIC:
      default:
        return {
          cardBg: 'bg-white border-zinc-100 text-zinc-900 shadow-sm',
          accentText: 'text-red-600',
          accentBg: 'bg-red-500/10',
          avatarBorder: 'border-red-500',
          mapBg: 'bg-slate-50 border-zinc-200/50',
          bubbleBg: 'bg-red-600 text-white'
        };
    }
  };

  const style = getThemeStyles();

  return (
    <section id="seo-proximity-section" className="max-w-6xl mx-auto px-4 py-12">
      
      {/* 1. Prova Social Local (Quem é da Área já Sabe!) */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest block">
            A Opinião da Vizinhança (Opção 5)
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1 flex items-center justify-center gap-2">
            🤝 Quem é da Área já Sabe!
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-lg mx-auto">
            Não acredite apenas em nós. Veja o que os moradores locais das nossas ruas principais dizem sobre os lanches da chapa!
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div 
              key={test.id} 
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${style.cardBg}`}
            >
              <div>
                {/* Stars and Role */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(test.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded font-medium">
                    Verificado
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                  &ldquo;{test.text}&rdquo;
                </p>
              </div>

              {/* User Identity Info */}
              <div className="flex items-center gap-3 mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/50">
                <img 
                  src={test.avatar} 
                  alt={test.name} 
                  referrerPolicy="no-referrer"
                  className={`w-9 h-9 rounded-full object-cover border-2 ${style.avatarBorder}`}
                />
                <div>
                  <h5 className="text-xs font-bold text-zinc-900 dark:text-white leading-none">{test.name}</h5>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block mt-1">
                    📍 {test.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Gatilho de Proximidade & Styled Neighborhood Map */}
      <div className={`p-5 md:p-8 rounded-3xl border ${style.cardBg} grid grid-cols-1 md:grid-cols-12 gap-8 items-center`}>
        
        {/* Left column explanation */}
        <div className="md:col-span-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className={`p-2 rounded-xl ${style.accentBg} ${style.accentText}`}>
              <Navigation className="w-5 h-5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              Estamos Pertinho!
            </span>
          </div>

          <h4 className="text-lg md:text-xl font-bold leading-tight">
            Estamos a 3 minutos da Praça Central! Venha retirar seu lanche sem pegar fila!
          </h4>
          
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Nossa chapa fica localizada na <span className="font-bold text-zinc-800 dark:text-white">Rua Paraíba, 420</span>. É um ponto estratégico que nos permite entregar lanches quentinhos em tempo recorde para toda a vizinhança.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-zinc-700 dark:text-zinc-300">Retirada em 10-15 min</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-zinc-700 dark:text-zinc-300">Entrega rápida local</span>
            </div>
          </div>
        </div>

        {/* Right column: Beautiful styled vector map showing proximity routes */}
        <div className="md:col-span-6">
          <div className={`w-full aspect-video sm:aspect-square rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative shadow-inner ${style.mapBg}`}>
            
            {/* Visual Vector Grid Lines acting as streets */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" className="text-zinc-600 dark:text-zinc-300" />
                
                {/* Custom diagonal streets */}
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="2" className="text-zinc-600 dark:text-zinc-300" />
                <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1.5" className="text-zinc-600 dark:text-zinc-300" />
              </svg>
            </div>

            {/* Map Markers */}
            <div className="relative w-full h-full">
              
              {/* Point 1: A Lanchonete (Pulse) */}
              <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <span className="flex h-4 w-4 relative mb-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border border-white"></span>
                </span>
                <span className="text-[10px] font-black uppercase bg-zinc-900 text-white px-2 py-0.5 rounded shadow-md border border-zinc-700 whitespace-nowrap">
                  🔥 Nossa Chapa (Rua Paraíba)
                </span>
              </div>

              {/* Point 2: Praça Central */}
              <div className="absolute top-[20%] left-[25%] flex items-center gap-1">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span className="text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-200/50 whitespace-nowrap">
                  🌳 Praça Central (3 min)
                </span>
              </div>

              {/* Point 3: Rua Bahia */}
              <div className="absolute bottom-[25%] left-[15%] flex items-center gap-1">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span className="text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-200/50 whitespace-nowrap">
                  🛵 Rua Bahia (2 min)
                </span>
              </div>

              {/* Point 4: Avenida Central */}
              <div className="absolute top-[65%] right-[10%] flex items-center gap-1">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span className="text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-200/50 whitespace-nowrap">
                  🛣️ Av. Central (5 min)
                </span>
              </div>

            </div>

            {/* Route reference overlay */}
            <div className="bg-white/95 dark:bg-zinc-900/95 p-2 rounded-xl border border-zinc-200/50 dark:border-zinc-800 z-10 flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
              <span className="font-medium">📍 Rua Paraíba, 420 - Centro do Bairro</span>
              <span className="font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest font-mono">Retirada OK</span>
            </div>

          </div>
        </div>

      </div>

      {/* 3. Floating Fixed WhatsApp Button + delayed bubble (Option 5 requirement) */}
      <div className="fixed bottom-6 right-6 z-45 flex items-center gap-2">
        
        {/* Animated Speech Bubble */}
        <AnimatePresence>
          {showSpeechBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 p-3 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 max-w-[200px] text-right"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-extrabold px-1.5 py-0.5 rounded uppercase">FOME!</span>
                <button 
                  onClick={() => setShowSpeechBubble(false)}
                  className="p-0.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  <Star className="w-3 h-3 rotate-45" /> {/* simple cross representation or close */}
                </button>
              </div>
              <p className="text-[11px] font-bold leading-tight">
                Bateu a fome? Monte seu pedido agora! 🍔
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Core Floating action button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenCart}
          className={`h-14 w-14 rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer bg-emerald-600 border border-emerald-500`}
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          
          {/* Badge indicator on the cart count */}
          <span className="absolute -top-1 -right-1 bg-red-600 text-white font-mono text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
            🛒
          </span>
        </motion.button>
      </div>

    </section>
  );
}
