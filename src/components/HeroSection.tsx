/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AppTheme } from '../types';
import { Bike, CreditCard, MapPin, Sparkles, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  activeTheme: AppTheme;
  onScrollToMenu: () => void;
}

export default function HeroSection({ activeTheme, onScrollToMenu }: HeroSectionProps) {
  // Cozinha status timer simulation
  const [kitchenOpen, setKitchenOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Standard format for time representation
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Theme-specific styles and contents
  const getThemeContent = () => {
    switch (activeTheme) {
      case AppTheme.URBAN:
        return {
          title: 'LANCHE DE VERDADE, SEM FRESCURA & NA VELOCIDADE DA SUA FOME',
          seoH1: 'Hamburgueria Urbana no Bairro - Smash Burgers e Lanches na Chapa',
          desc: 'Pão brioche selado na manteiga, smash burger de 90g ultra prensado com crostinha dourada crocante, cheddar americano derretido e bacon artesanal defumado.',
          ctaText: '🔥 VER CARDÁPIO & PEDIR AGORA',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
          badgeText: '🟢 COZINHA ATIVA | 20-30 MIN',
          badgeColor: 'bg-orange-500/25 border-orange-500/50 text-orange-400',
          bgGradient: 'from-[#FF5722]/10 via-transparent to-transparent',
          ctaStyle: 'bg-orange-600 hover:bg-orange-700 text-white font-anton uppercase tracking-wider rounded-lg shadow-lg shadow-orange-600/30 border-2 border-orange-500 font-bold',
          badgeShape: 'rounded-md border',
          features: [
            { icon: Bike, label: 'Delivery Fast (20-35 min)', desc: 'Motoboys próprios' },
            { icon: CreditCard, label: 'Pix & Cartão na Entrega', desc: 'Sem burocracia' },
            { icon: MapPin, label: 'Takeaway Express', desc: 'Retirada rápida' }
          ]
        };
      case AppTheme.PODRAO:
        return {
          title: 'O MAIOR LANCHE DO BAIRRO PELO MENOR PREÇO DA REGIÃO!',
          seoH1: 'Podrão do Bairro - X-Tudo Gigante e Cachorro Quente Prensado',
          desc: 'Bateu aquela fome monstro? Nós matamos com fartura! Ingredientes selecionados de alta qualidade grelhados com carinho na chapa quente para garantir o melhor custo-benefício.',
          ctaText: '👉 VER O CARDÁPIO MONSTRO',
          image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
          badgeText: '🟢 CHAPA QUENTE | TEMPO ESTIMADO: 30-45 MIN',
          badgeColor: 'bg-emerald-600/25 border-emerald-500/50 text-emerald-400',
          bgGradient: 'from-emerald-600/10 via-transparent to-transparent',
          ctaStyle: 'bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 border-b-4 border-emerald-800 transform active:border-b-0 active:translate-y-1',
          badgeShape: 'rounded-full border px-4',
          features: [
            { icon: Bike, label: 'Entrega no Capricho!', desc: 'Chega quentinho' },
            { icon: CreditCard, label: 'Aceitamos Tudo', desc: 'Dinheiro, Pix, Cartão' },
            { icon: MapPin, label: 'Retirada Sem Fila', desc: 'Rua Paraíba, 420' }
          ]
        };
      case AppTheme.CLASSIC:
      default:
        return {
          title: 'Bateu a fome? O sabor clássico do bairro na sua porta.',
          seoH1: 'Lanchonete Tradicional do Bairro - Lanches e Combos de Família',
          desc: 'O sabor que a nossa vizinhança conhece e confia há anos, pelo preço que cabe no seu bolso. Hambúrgueres fofinhos, cachorro-quente de verdade e a famosa maionese verde da casa.',
          ctaText: '🍔 Ver Cardápio e Fazer Pedido',
          image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop&q=80',
          badgeText: '🟢 Cozinha Aberta | Tempo: 30-45 min',
          badgeColor: 'bg-red-500/15 border-red-500/30 text-red-600 dark:text-red-400',
          bgGradient: 'from-red-500/10 via-transparent to-transparent',
          ctaStyle: 'bg-red-600 hover:bg-red-700 text-white font-poppins rounded-full shadow-lg shadow-red-600/20 font-bold',
          badgeShape: 'rounded-full border px-4',
          features: [
            { icon: Bike, label: 'Entrega Rápida (30-45 min)', desc: 'Taxa fixa barata' },
            { icon: CreditCard, label: 'Pix e Cartão na Entrega', desc: 'Maquininha disponível' },
            { icon: MapPin, label: 'Retirada sem Taxas', desc: 'Venha nos visitar!' }
          ]
        };
    }
  };

  const content = getThemeContent();

  return (
    <section id="hero-section" className="relative overflow-hidden pt-6 pb-12 px-4 transition-colors duration-300">
      {/* Background Decorative Gradient */}
      <div className={`absolute top-0 left-0 w-full h-96 bg-gradient-to-b ${content.bgGradient} pointer-events-none`} />

      {/* SEO Strategic Title (H1 hidden or subtle for high-impact visual layouts, satisfying Option 5) */}
      <h1 className="sr-only">{content.seoH1}</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Visual Typography and Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-4">
          
          {/* Alerta de Status da Cozinha (Option 1 - Conceito 1) */}
          <motion.div 
            key={activeTheme + '_badge'}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center gap-2 py-1 px-3 text-xs font-bold font-mono tracking-wide ${content.badgeShape} ${content.badgeColor}`}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>{content.badgeText}</span>
            <span className="text-[10px] opacity-60 ml-1">({currentTime})</span>
          </motion.div>

          {/* Dynamic Typographic Title depending on chosen mood (Option 1 Vibes) */}
          <motion.h2
            key={activeTheme + '_title'}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight select-none ${
              activeTheme === AppTheme.URBAN 
                ? 'font-anton text-zinc-950 dark:text-white uppercase font-extrabold tracking-normal text-left shadow-glow-sm' 
                : activeTheme === AppTheme.PODRAO
                ? 'font-sans font-black text-zinc-900 dark:text-white uppercase italic text-left'
                : 'font-poppins font-extrabold text-red-600 dark:text-red-400'
            }`}
          >
            {content.title}
          </motion.h2>

          {/* Paragraph explanation */}
          <motion.p
            key={activeTheme + '_desc'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 max-w-lg leading-relaxed"
          >
            {content.desc}
          </motion.p>

          {/* Core Call to Action */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onScrollToMenu}
            className={`w-full sm:w-auto px-8 py-4 text-base tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-transform duration-200 ${content.ctaStyle}`}
          >
            {content.ctaText}
          </motion.button>

          {/* Alert of quick neighborhood commitment */}
          <div className="flex items-center gap-1.5 mt-2 bg-zinc-100/80 dark:bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50 text-[11px] text-zinc-500 dark:text-zinc-400 max-w-lg">
            <span className="font-bold text-yellow-600 dark:text-yellow-500 flex items-center gap-0.5 uppercase tracking-wider font-mono">
              <AlertTriangle className="w-3.5 h-3.5 inline" /> Compromisso:
            </span>
            Se não chegar quentinho e no capricho, nós trocamos na hora.
          </div>
        </div>

        {/* Right Column: Hero Visual Food Presentation */}
        <div className="lg:col-span-5 relative flex justify-center">
          <motion.div
            key={activeTheme + '_img'}
            initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl group border-4 border-white dark:border-zinc-800"
          >
            <img
              src={content.image}
              alt="Lanche Delicioso Chapa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Visual overlay accents */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Overlay float sticker */}
            <div className={`absolute bottom-4 left-4 p-3 bg-zinc-950/80 backdrop-blur-sm rounded-xl border border-zinc-700/50 text-white`}>
              <div className="flex items-center gap-1.5">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span className="text-xs font-bold font-mono">4.9/5 no Bairro</span>
              </div>
              <p className="text-[10px] text-zinc-300 mt-0.5">Mais de 1.200 lanches entregues este mês!</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Micro-seção: Alertas Rápidos (Option 2 - Seção 2) */}
      <div className="max-w-6xl mx-auto mt-12 bg-white dark:bg-zinc-800 rounded-2xl p-4 md:p-6 shadow-sm border border-zinc-200 dark:border-zinc-700/50">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {content.features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div key={index} className="flex items-center gap-3.5 pl-2">
                <div className={`p-2.5 rounded-xl ${
                  activeTheme === AppTheme.URBAN 
                    ? 'bg-orange-500/10 text-orange-500' 
                    : activeTheme === AppTheme.PODRAO 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-red-500/10 text-red-600 dark:text-red-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wider font-sans">
                    {feat.label}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
