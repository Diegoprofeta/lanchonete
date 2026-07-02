/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppTheme } from '../types';
import { Sparkles, Flame, ShieldAlert, Zap, Utensils, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeSelectorProps {
  activeTheme: AppTheme;
  onChangeTheme: (theme: AppTheme) => void;
}

export default function ThemeSelector({ activeTheme, onChangeTheme }: ThemeSelectorProps) {
  const options = [
    {
      id: AppTheme.CLASSIC,
      title: 'Clássico da Noite',
      tagline: 'Familiar & Acolhedor',
      icon: Utensils,
      color: 'bg-red-600 text-white',
      borderActive: 'border-red-600',
      badge: 'Tradição',
      description: 'A lanchonete acolhedora que todo bairro ama. Cores quentes, purê de batata real e sabor de infância.'
    },
    {
      id: AppTheme.URBAN,
      title: 'Hamburgueria Urbana',
      tagline: 'Jovem & Neon',
      icon: Flame,
      color: 'bg-orange-600 text-white',
      borderActive: 'border-orange-500',
      badge: 'Smash & Neon',
      description: 'Estilo cyber-grafite escuro. Hambúrgueres smash ultra-prensados com cheddar derretido e combos da madruga.'
    },
    {
      id: AppTheme.PODRAO,
      title: 'Podrão Organizado',
      tagline: 'Fartura & Custo-Benefício',
      icon: Zap,
      color: 'bg-emerald-600 text-white',
      borderActive: 'border-emerald-600',
      badge: 'Fome Monstro',
      description: 'O maior lanche do bairro pelo menor preço. Lanches turbinados prensados na chapa e batata no balde.'
    }
  ];

  return (
    <div id="theme-selector-container" className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40 shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">
                Conceitos do Site de Lanchonete (Opção 1)
              </p>
            </div>
            <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mt-0.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Selecione o Conceito Visual da sua Lanchonete de Bairro:
            </h2>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
            {options.map((opt) => {
              const Icon = opt.icon;
              const isActive = activeTheme === opt.id;
              return (
                <button
                  key={opt.id}
                  id={`theme-btn-${opt.id.toLowerCase()}`}
                  onClick={() => onChangeTheme(opt.id)}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all duration-300 focus:outline-none select-none cursor-pointer ${
                    isActive
                      ? `border-2 ${opt.borderActive} bg-zinc-50 dark:bg-zinc-800 shadow-md transform scale-102`
                      : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeThemeIndicator"
                      className="absolute -top-1.5 -right-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm"
                    >
                      Ativo
                    </motion.div>
                  )}
                  <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`} />
                  <span className="text-xs font-bold leading-tight block truncate max-w-full text-zinc-800 dark:text-zinc-200">
                    {opt.title}
                  </span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 hidden sm:inline">
                    {opt.tagline}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Description Box */}
        <motion.div
          key={activeTheme}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2.5 p-2 bg-amber-50/50 dark:bg-zinc-800/40 border border-amber-100/40 dark:border-zinc-800 rounded-lg hidden sm:flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400"
        >
          <div className="flex-shrink-0 bg-amber-100 dark:bg-zinc-700 text-amber-800 dark:text-amber-200 font-bold px-1.5 py-0.5 rounded text-[10px]">
            {options.find(o => o.id === activeTheme)?.badge}
          </div>
          <p className="leading-snug">
            {options.find(o => o.id === activeTheme)?.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
