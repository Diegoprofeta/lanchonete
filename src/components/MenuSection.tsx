/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppTheme, Product } from '../types';
import { PRODUCTS } from '../data';
import { Plus, Search, HelpCircle, Utensils, Flame, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  activeTheme: AppTheme;
  onAddToCart: (product: Product) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

export default function MenuSection({ activeTheme, onAddToCart, menuRef }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'burgers' | 'dogs' | 'sides' | 'combos' | 'drinks'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const products = PRODUCTS[activeTheme];

  // Categories list
  const tabs = [
    { id: 'all', label: 'Tudo' },
    { id: 'burgers', label: 'Hambúrgueres' },
    { id: 'dogs', label: 'Dogões Prensados' },
    { id: 'sides', label: 'Acompanhamentos' },
    { id: 'combos', label: 'Combos Salva-Vidas' },
    { id: 'drinks', label: 'Bebidas Geladas' }
  ];

  // Filter products by tab and search query
  const filteredProducts = products.filter(p => {
    const matchesTab = activeTab === 'all' || p.category === activeTab;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  // Theme-specific look
  const getThemeStyles = () => {
    switch (activeTheme) {
      case AppTheme.URBAN:
        return {
          tabActive: 'bg-orange-600 border-2 border-orange-500 text-white font-anton uppercase tracking-wide rounded-md',
          tabInactive: 'bg-[#1E1E1E] text-zinc-400 border border-zinc-800 hover:text-white rounded-md',
          cardBg: 'bg-[#1E1E1E] border-zinc-800 text-white shadow-xl',
          buttonStyle: 'bg-orange-600 hover:bg-orange-700 text-white rounded-md border border-orange-500 font-bold',
          badgeText: 'text-orange-500 bg-orange-500/10 font-mono',
          inputBg: 'bg-[#1E1E1E] border-zinc-800 text-white focus:border-orange-500'
        };
      case AppTheme.PODRAO:
        return {
          tabActive: 'bg-emerald-600 border-emerald-500 text-white font-black uppercase rounded-xl shadow-md',
          tabInactive: 'bg-white text-zinc-600 border border-emerald-100 hover:bg-emerald-50/50 rounded-xl shadow-sm',
          cardBg: 'bg-white border border-emerald-100 text-zinc-950 shadow-md',
          buttonStyle: 'bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl border-b-4 border-emerald-800 font-bold',
          badgeText: 'text-emerald-700 bg-emerald-100 font-extrabold',
          inputBg: 'bg-white border-emerald-100 text-zinc-950 focus:border-emerald-500'
        };
      case AppTheme.CLASSIC:
      default:
        return {
          tabActive: 'bg-red-600 text-white rounded-full shadow-md font-bold',
          tabInactive: 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 rounded-full',
          cardBg: 'bg-white border border-zinc-100 text-zinc-900 shadow-sm',
          buttonStyle: 'bg-red-600 hover:bg-red-700 text-white rounded-full font-bold',
          badgeText: 'text-red-600 bg-red-100 font-medium',
          inputBg: 'bg-white border-zinc-200 text-zinc-900 focus:border-red-500'
        };
    }
  };

  const style = getThemeStyles();

  return (
    <section ref={menuRef} id="menu-section" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-20">
      
      {/* Title & Search bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest block">
            Escolha Suas Delícias
          </span>
          <h3 className="text-2xl md:text-3xl font-black mt-1 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            🍔 Cardápio Completo do Bairro
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Lanches preparados na hora com ingredientes frescos e maionese artesanal.
          </p>
        </div>

        {/* Local Search input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar por hambúrguer, milho, bacon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full py-2.5 pl-10 pr-4 text-xs rounded-xl border outline-none transition-all ${style.inputBg}`}
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Horizontal Touch Scrollable Tabs (Option 1 Concept 3) */}
      <div className="w-full overflow-x-auto pb-4 mb-8 flex gap-2 no-scrollbar scroll-smooth">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold whitespace-nowrap cursor-pointer transition-all duration-200 shrink-0 ${
                isActive ? style.tabActive : style.tabInactive
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30">
          <HelpCircle className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">Nenhum lanche encontrado com &ldquo;{searchQuery}&rdquo;</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Tente buscar por termos mais genéricos ou mude a categoria acima.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={product.id}
                className={`flex flex-col justify-between rounded-2xl border overflow-hidden ${style.cardBg}`}
              >
                {/* Visual Image container */}
                <div className="aspect-video relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {product.isBestSeller && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-black text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
                      Mais Pedido! 👑
                    </span>
                  )}
                  {product.savings && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
                      Salva R$ {product.savings.toFixed(2).replace('.', ',')} 💸
                    </span>
                  )}
                </div>

                {/* Info block */}
                <div className="p-4 md:p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-extrabold text-sm md:text-base leading-tight">
                        {product.name}
                      </h4>
                    </div>
                    
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Ingredients detail */}
                    <div className="mt-4">
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block uppercase font-mono tracking-widest leading-none">Ingredientes</span>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-2">
                        {product.ingredients.join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Price & Cart Actions */}
                  <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 line-through block">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                      <span className="text-base md:text-lg font-black tracking-tight">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className={`py-2 px-3.5 text-xs flex items-center gap-1 cursor-pointer active:scale-95 transition-transform ${style.buttonStyle}`}
                    >
                      <Plus className="w-4 h-4" /> Adicionar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
