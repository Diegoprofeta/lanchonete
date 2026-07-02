/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppTheme, Product } from '../types';
import { PRODUCTS } from '../data';
import { Sparkles, Shuffle, Check, ShoppingBag, Gift, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IndecisionComboProps {
  activeTheme: AppTheme;
  onAddToCart: (product: Product) => void;
  onScrollToCart: () => void;
}

export default function IndecisionCombo({ activeTheme, onAddToCart, onScrollToCart }: IndecisionComboProps) {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<{
    burger: Product;
    drink: Product;
    side?: Product;
    discountPrice: number;
    originalPrice: number;
  } | null>(null);

  // Lists of products based on the active theme
  const products = PRODUCTS[activeTheme];
  const burgersAndDogs = products.filter(p => p.category === 'burgers' || p.category === 'dogs');
  const drinks = products.filter(p => p.category === 'drinks');
  const sides = products.filter(p => p.category === 'sides');

  // To simulate roulette flicker
  const [flickerBurger, setFlickerBurger] = useState<string>('');
  const [flickerDrink, setFlickerDrink] = useState<string>('');
  const [flickerSide, setFlickerSide] = useState<string>('');

  const triggerRoulette = () => {
    if (rolling) return;
    setRolling(true);
    setResult(null);

    let counter = 0;
    const interval = setInterval(() => {
      // Pick random items for visual flicker
      const randomB = burgersAndDogs[Math.floor(Math.random() * burgersAndDogs.length)];
      const randomD = drinks[Math.floor(Math.random() * drinks.length)];
      const randomS = sides.length > 0 ? sides[Math.floor(Math.random() * sides.length)] : undefined;

      setFlickerBurger(randomB.name);
      setFlickerDrink(randomD.name);
      if (randomS) setFlickerSide(randomS.name);

      counter++;
      if (counter > 15) {
        clearInterval(interval);
        
        // Final selection
        const finalBurger = burgersAndDogs[Math.floor(Math.random() * burgersAndDogs.length)];
        const finalDrink = drinks[Math.floor(Math.random() * drinks.length)];
        // Fallback if there is no side dish in the active theme (e.g. classic has fries in combos, let's look at available sides or mock a basic Fry)
        let finalSide = sides.length > 0 ? sides[Math.floor(Math.random() * sides.length)] : undefined;
        
        // If no side exists in the theme category, let's check if we can pick one, or just do burger + drink
        const sumPrice = finalBurger.price + finalDrink.price + (finalSide ? finalSide.price : 0);
        // Indecision discount: 15% off
        const discountPrice = Math.round(sumPrice * 0.85 * 10) / 10;

        setResult({
          burger: finalBurger,
          drink: finalDrink,
          side: finalSide,
          originalPrice: sumPrice,
          discountPrice: discountPrice
        });
        setRolling(false);
      }
    }, 100);
  };

  const handleAddComboToCart = () => {
    if (!result) return;
    
    // Create a special virtual product representation of this generated combo
    const comboName = `Combo Indecisão: ${result.burger.name} + ${result.drink.name}`;
    const comboDesc = `Gerado aleatoriamente! Contém: ${result.burger.name}, ${result.drink.name}${result.side ? ` e ${result.side.name}` : ''}.`;
    
    const virtualCombo: Product = {
      id: `virtual-combo-${Date.now()}`,
      name: comboName,
      description: comboDesc,
      price: result.discountPrice,
      originalPrice: result.originalPrice,
      image: result.burger.image,
      category: 'combos',
      ingredients: [result.burger.name, result.drink.name, ...(result.side ? [result.side.name] : [])],
      savings: Math.round((result.originalPrice - result.discountPrice) * 100) / 100
    };

    onAddToCart(virtualCombo);
    
    // Highlight or scroll to cart
    onScrollToCart();
  };

  // Vibe style
  const getThemeStyles = () => {
    switch (activeTheme) {
      case AppTheme.URBAN:
        return {
          cardBg: 'bg-zinc-950 border-orange-500/30 text-white',
          accentText: 'text-orange-500',
          btnStyle: 'bg-orange-600 hover:bg-orange-700 text-white font-anton uppercase border-2 border-orange-500 rounded-md',
          boxStyles: 'bg-zinc-900 border-zinc-800'
        };
      case AppTheme.PODRAO:
        return {
          cardBg: 'bg-white border-2 border-emerald-500 shadow-lg text-zinc-950',
          accentText: 'text-emerald-700',
          btnStyle: 'bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase rounded-xl border-b-4 border-emerald-800',
          boxStyles: 'bg-emerald-50/50 border-emerald-100'
        };
      case AppTheme.CLASSIC:
      default:
        return {
          cardBg: 'bg-white border-zinc-200/80 shadow-md text-zinc-900',
          accentText: 'text-red-600',
          btnStyle: 'bg-red-600 hover:bg-red-700 text-white font-bold rounded-full',
          boxStyles: 'bg-zinc-50 border-zinc-100'
        };
    }
  };

  const style = getThemeStyles();

  return (
    <div id="indecision-combo-container" className="max-w-3xl mx-auto px-4 py-8">
      <div className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 ${style.cardBg}`}>
        
        {/* Header decoration */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-amber-100 dark:bg-zinc-800 p-2.5 rounded-2xl mb-3 flex items-center justify-center">
            <Shuffle className="w-6 h-6 text-amber-500 animate-spin-slow" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
            Micro-Utilitário Interativo (Opção 4)
          </span>
          <h3 className="text-xl md:text-2xl font-black mt-1 leading-snug">
            Gerador de Combo da Indecisão
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 max-w-md">
            Não sabe o que pedir? Deixe a nossa chapa escolher o combo perfeito por você com <span className="font-bold text-amber-600 dark:text-amber-500">15% de desconto garantido!</span>
          </p>
        </div>

        {/* Rolling Slots / Visual Panel */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Slot 1: Burger */}
          <div className={`p-4 rounded-2xl border text-center flex flex-col justify-center min-h-[90px] ${style.boxStyles}`}>
            <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">Hambúrguer / Dog</span>
            <div className="text-sm font-extrabold text-zinc-900 dark:text-white mt-1.5 h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rolling ? flickerBurger : (result ? result.burger.name : 'Clique em Gerar')}
                  initial={{ y: rolling ? 10 : 0, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: rolling ? -10 : 0, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="block truncate"
                >
                  {rolling ? flickerBurger : (result ? result.burger.name : '🌭 Escolhendo...')}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Slot 2: Side (if available, otherwise classic placeholder) */}
          <div className={`p-4 rounded-2xl border text-center flex flex-col justify-center min-h-[90px] ${style.boxStyles}`}>
            <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">Acompanhamento</span>
            <div className="text-sm font-extrabold text-zinc-900 dark:text-white mt-1.5 h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rolling ? flickerSide : (result ? (result.side ? result.side.name : 'Batata Frita M') : 'Clique em Gerar')}
                  initial={{ y: rolling ? 10 : 0, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: rolling ? -10 : 0, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="block truncate"
                >
                  {rolling ? flickerSide : (result ? (result.side ? result.side.name : '🍟 Batata Frita M') : '🍟 Escolhendo...')}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Slot 3: Drink */}
          <div className={`p-4 rounded-2xl border text-center flex flex-col justify-center min-h-[90px] ${style.boxStyles}`}>
            <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">Bebida Gelada</span>
            <div className="text-sm font-extrabold text-zinc-900 dark:text-white mt-1.5 h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rolling ? flickerDrink : (result ? result.drink.name : 'Clique em Gerar')}
                  initial={{ y: rolling ? 10 : 0, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: rolling ? -10 : 0, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="block truncate"
                >
                  {rolling ? flickerDrink : (result ? result.drink.name : '🥤 Escolhendo...')}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Trigger Button */}
        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={triggerRoulette}
            disabled={rolling}
            className={`w-full sm:w-auto px-6 py-3 text-xs flex items-center justify-center gap-2 cursor-pointer select-none active:scale-98 transition-transform ${style.btnStyle} ${rolling ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Shuffle className={`w-4 h-4 ${rolling ? 'animate-spin' : ''}`} />
            {rolling ? 'Misturando Sabores...' : 'Deixe a Chapa Escolher! 🎲'}
          </button>
        </div>

        {/* Result Area */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-6 flex flex-col items-center"
            >
              <div className="flex items-center gap-1.5 bg-amber-100 dark:bg-zinc-800 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide mb-3">
                <Gift className="w-3.5 h-3.5" /> Combo Sugerido Revelado!
              </div>

              <p className="text-center text-xs text-zinc-600 dark:text-zinc-300 max-w-md italic mb-4 leading-relaxed">
                &ldquo;Uma combinação matadora de sabores que ornam muito bem na chapa! E com desconto fica ainda melhor.&rdquo;
              </p>

              {/* Price visualizer */}
              <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 px-5 py-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="text-left">
                  <span className="text-[10px] text-zinc-400 block line-through">
                    R$ {result.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">Individual</span>
                </div>
                
                <ArrowRight className="w-4 h-4 text-zinc-400" />

                <div className="text-right">
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-500 block">
                    R$ {result.discountPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                    Economiza R$ {(result.originalPrice - result.discountPrice).toFixed(2).replace('.', ',')}!
                  </span>
                </div>
              </div>

              {/* Conversion actions */}
              <div className="mt-5 flex flex-col sm:flex-row gap-2 w-full justify-center">
                <button
                  onClick={handleAddComboToCart}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-600/10 active:scale-98 transition-transform"
                >
                  <ShoppingBag className="w-4 h-4" /> Adicionar ao Meu Carrinho
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
