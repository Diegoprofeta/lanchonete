/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppTheme, Product } from '../types';
import { PRODUCTS } from '../data';
import { Clock, MessageSquare, Plus, Percent, Truck, CreditCard, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface BentoShowcaseProps {
  activeTheme: AppTheme;
  onAddToCart: (product: Product) => void;
  onOpenWhatsApp: () => void;
}

export default function BentoShowcase({ activeTheme, onAddToCart, onOpenWhatsApp }: BentoShowcaseProps) {
  // Get featured products based on active theme
  const themeProducts = PRODUCTS[activeTheme];
  const championProduct = themeProducts.find(p => p.isBestSeller && p.category === 'burgers') || themeProducts[0];
  const featuredCombo = themeProducts.find(p => p.category === 'combos') || themeProducts.find(p => p.originalPrice !== undefined) || themeProducts[themeProducts.length - 1];

  // Colors per theme
  const getThemeGridStyles = () => {
    switch (activeTheme) {
      case AppTheme.URBAN:
        return {
          cardBg: 'bg-[#1E1E1E] border-zinc-800',
          accentText: 'text-orange-500',
          accentBg: 'bg-orange-500/10',
          badgeStyle: 'bg-orange-500 text-black',
          buttonStyle: 'bg-orange-600 hover:bg-orange-700 text-white rounded-md font-bold',
          badgeText: 'text-orange-400 font-mono'
        };
      case AppTheme.PODRAO:
        return {
          cardBg: 'bg-white border-emerald-100 shadow-sm',
          accentText: 'text-emerald-700',
          accentBg: 'bg-emerald-500/10',
          badgeStyle: 'bg-emerald-600 text-white',
          buttonStyle: 'bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black uppercase',
          badgeText: 'text-emerald-600 font-extrabold'
        };
      case AppTheme.CLASSIC:
      default:
        return {
          cardBg: 'bg-white border-zinc-100 shadow-sm',
          accentText: 'text-red-600',
          accentBg: 'bg-red-500/10',
          badgeStyle: 'bg-red-600 text-white',
          buttonStyle: 'bg-red-600 hover:bg-red-700 text-white rounded-full font-bold',
          badgeText: 'text-red-500 font-medium'
        };
    }
  };

  const gridStyles = getThemeGridStyles();

  return (
    <section id="bento-grid-showcase" className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-6">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
            Estética Bento Grid (Opção 3)
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1 flex items-center gap-2">
          ⚡ Destaques do Dia no Capricho
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Navegue pelas caixas e confira o que está fervendo na nossa chapa agora!
        </p>
      </div>

      {/* Bento Grid: 2 columns in small, 3 in lg */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Card 1: Bloco Maior (2 cols wide on large) - O Campeão de Vendas */}
        <div className={`col-span-1 md:col-span-2 p-5 border rounded-2xl flex flex-col sm:flex-row gap-5 relative overflow-hidden transition-all duration-300 ${gridStyles.cardBg}`}>
          {/* Badge indicator */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${gridStyles.badgeStyle}`}>
              👑 Campeão de Vendas
            </span>
          </div>

          <div className="w-full sm:w-1/2 aspect-video sm:aspect-square rounded-xl overflow-hidden relative">
            <img 
              src={championProduct.image} 
              alt={championProduct.name}
              referrerPolicy="no-referrer" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="w-full sm:w-1/2 flex flex-col justify-between py-1">
            <div>
              <h4 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                {championProduct.name}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                {championProduct.description}
              </p>
              
              {/* Ingredients taglets */}
              <div className="flex flex-wrap gap-1 mt-3">
                {championProduct.ingredients.slice(0, 4).map((ing, i) => (
                  <span key={i} className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded font-medium">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase font-mono tracking-widest leading-none">Preço Justo</span>
                <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
                  R$ {championProduct.price.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCart(championProduct)}
                className={`py-2 px-4 text-xs flex items-center gap-1 cursor-pointer transition-all ${gridStyles.buttonStyle}`}
              >
                <Plus className="w-4 h-4" /> Adicionar
              </motion.button>
            </div>
          </div>
        </div>

        {/* Card 2: Bloco Médio - Combo em Destaque */}
        <div className={`p-5 border rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${gridStyles.cardBg}`}>
          <div className="absolute top-3 right-3">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-amber-500 text-black flex items-center gap-0.5 shadow-sm`}>
              <Percent className="w-3 h-3" /> Combo Imperdível
            </span>
          </div>

          <div>
            <span className="text-zinc-400 font-mono text-[10px] uppercase block tracking-widest">Economize até R$ {featuredCombo.savings?.toFixed(2).replace('.', ',') || '10,00'}</span>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1 leading-snug">
              {featuredCombo.name}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-3">
              {featuredCombo.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-400 line-through block">
                R$ {featuredCombo.originalPrice?.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-lg font-black text-amber-600 dark:text-amber-500">
                R$ {featuredCombo.price.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button
              onClick={() => onAddToCart(featuredCombo)}
              className={`py-1.5 px-3 text-xs flex items-center gap-1 cursor-pointer ${gridStyles.buttonStyle}`}
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Combo
            </button>
          </div>
        </div>

        {/* Card 3: Bloco Médio - Horário de Funcionamento e WhatsApp */}
        <div className={`p-5 border rounded-2xl flex flex-col justify-between transition-all duration-300 ${gridStyles.cardBg}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${gridStyles.accentBg}`}>
              <Clock className={`w-5 h-5 ${gridStyles.accentText}`} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono leading-none">Horários</h4>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mt-1 leading-none">Terça a Domingo</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-none">Das 18h00 às 23h30</p>
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-4">
            Estamos no capricho atendendo toda a vizinhança! Se preferir, fale direto no WhatsApp com nossos atendentes.
          </p>

          <button
            onClick={onOpenWhatsApp}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-600/10"
          >
            <MessageSquare className="w-4 h-4" /> Chamar no WhatsApp
          </button>
        </div>

        {/* Card 4: Bloco Pequeno - Taxa de Entrega Fixa */}
        <div className={`p-5 border rounded-2xl flex flex-col justify-between transition-all duration-300 ${gridStyles.cardBg}`}>
          <div className="flex items-center gap-2 text-zinc-400">
            <Truck className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-[10px] uppercase tracking-wider">Taxa Fixa no Bairro</span>
          </div>

          <div className="mt-3">
            <span className="text-2xl font-black text-zinc-900 dark:text-white">R$ 4,00</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block mt-0.5">Para a maioria das ruas locais (ou grátis retirando no balcão)</span>
          </div>

          <div className="mt-3 text-[10px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/50 pt-2 flex items-center justify-between">
            <span>Consulte sua rua abaixo</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          </div>
        </div>

        {/* Card 5: Bloco Pequeno - Meios de Pagamento */}
        <div className={`p-5 border rounded-2xl flex flex-col justify-between transition-all duration-300 ${gridStyles.cardBg}`}>
          <div className="flex items-center gap-2 text-zinc-400">
            <CreditCard className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-[10px] uppercase tracking-wider">Pagamento sem Stress</span>
          </div>

          <div className="mt-3">
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100 leading-tight">Aceitamos PIX, Crédito, Débito e Vale Refeição!</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">VR, Sodexo, Ticket e Alelo na maquininha sem taxas extras.</p>
          </div>

          <div className="flex gap-1.5 mt-3 border-t border-zinc-100 dark:border-zinc-800/50 pt-2 flex-wrap">
            <span className="text-[9px] bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-bold px-1.5 py-0.5 rounded uppercase">Pix</span>
            <span className="text-[9px] bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded uppercase">Débito</span>
            <span className="text-[9px] bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold px-1.5 py-0.5 rounded uppercase">Crédito</span>
            <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded uppercase">VR</span>
          </div>
        </div>

      </div>
    </section>
  );
}
