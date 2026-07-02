/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { AppTheme, CartItem, Product } from './types';
import ThemeSelector from './components/ThemeSelector';
import HeroSection from './components/HeroSection';
import BentoShowcase from './components/BentoShowcase';
import IndecisionCombo from './components/IndecisionCombo';
import MenuSection from './components/MenuSection';
import CartDrawer from './components/CartDrawer';
import SEOProximity from './components/SEOProximity';
import { ShoppingCart, Heart, PhoneCall, MapPin, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTheme, setActiveTheme] = useState<AppTheme>(AppTheme.CLASSIC);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Reference to menu section for smooth scrolling
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Sync document class or styling elements with active theme
  useEffect(() => {
    const root = document.documentElement;
    if (activeTheme === AppTheme.URBAN) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [activeTheme]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { product, quantity: 1, customNotes: '' }];
    });

    // Simple toast indicator feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: Math.max(1, nextQty) };
          }
          return item;
        });
    });
  };

  const handleUpdateNotes = (productId: string, notes: string) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.product.id === productId) {
          return { ...item, customNotes: notes };
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleScrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWhatsAppDirect = () => {
    const message = encodeURIComponent("Olá! Gostaria de tirar uma dúvida sobre o cardápio da Lanchonete do Bairro. Poderia me ajudar?");
    window.open(`https://api.whatsapp.com/send?phone=5571992193531&text=${message}`, '_blank');
  };

  // Determine core background style
  const getPageBgStyle = () => {
    switch (activeTheme) {
      case AppTheme.URBAN:
        return 'bg-[#121212] text-white font-sans selection:bg-orange-500 selection:text-black';
      case AppTheme.PODRAO:
        return 'bg-[#F4F6F4] text-zinc-900 font-sans selection:bg-emerald-500 selection:text-white';
      case AppTheme.CLASSIC:
      default:
        return 'bg-[#FAF9F6] text-zinc-800 font-sans selection:bg-red-500 selection:text-white';
    }
  };

  // Theme-specific footer / colors
  const getThemeFooterStyles = () => {
    switch (activeTheme) {
      case AppTheme.URBAN:
        return {
          footerBg: 'bg-zinc-950 border-t border-zinc-850',
          accentText: 'text-orange-500',
          badgeText: 'bg-orange-500/10 text-orange-400'
        };
      case AppTheme.PODRAO:
        return {
          footerBg: 'bg-emerald-950 border-t border-emerald-900 text-emerald-100',
          accentText: 'text-emerald-400',
          badgeText: 'bg-emerald-800/20 text-emerald-300'
        };
      case AppTheme.CLASSIC:
      default:
        return {
          footerBg: 'bg-zinc-900 border-t border-zinc-800 text-zinc-200',
          accentText: 'text-red-500',
          badgeText: 'bg-red-500/15 text-red-400'
        };
    }
  };

  const footerStyle = getThemeFooterStyles();
  const totalCartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div id="app-main-root" className={`min-h-screen flex flex-col transition-colors duration-500 ${getPageBgStyle()}`}>
      
      {/* 1. Interactive Theme Changer Topbar (Option 1 Concept switcher) */}
      <ThemeSelector 
        activeTheme={activeTheme} 
        onChangeTheme={setActiveTheme} 
      />

      {/* Header bar / Branding Navigation */}
      <header id="main-navigation" className="w-full px-4 py-4 max-w-6xl mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl flex items-center justify-center ${
            activeTheme === AppTheme.URBAN 
              ? 'bg-orange-600/10 text-orange-500' 
              : activeTheme === AppTheme.PODRAO 
              ? 'bg-emerald-600/10 text-emerald-600 dark:text-emerald-400' 
              : 'bg-red-600/10 text-red-600'
          }`}>
            <span className="text-xl">🍔</span>
          </div>
          <div>
            <span className={`text-base md:text-lg tracking-tight ${
              activeTheme === AppTheme.URBAN 
                ? 'font-anton uppercase tracking-widest text-orange-500' 
                : activeTheme === AppTheme.PODRAO 
                ? 'font-sans font-black uppercase text-emerald-600 dark:text-emerald-400' 
                : 'font-fredoka font-bold text-red-600 dark:text-red-400'
            }`}>
              Chapa do Bairro
            </span>
            <span className="text-[9px] block uppercase font-mono tracking-widest text-zinc-400 leading-none">O sabor da vizinhança</span>
          </div>
        </div>

        {/* Float Right Action: Cart preview trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className={`px-4 py-2 text-xs font-bold flex items-center gap-1.5 rounded-full cursor-pointer transition-all ${
              activeTheme === AppTheme.URBAN
                ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md'
                : activeTheme === AppTheme.PODRAO
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-sm'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Meu Pedido</span>
            {totalCartItemsCount > 0 && (
              <span className="bg-white text-zinc-950 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {totalCartItemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 2. Hero Section (Option 2 - High Conversion Flow) */}
      <HeroSection 
        activeTheme={activeTheme} 
        onScrollToMenu={handleScrollToMenu} 
      />

      {/* 3. Bento Grid Showcase Section (Option 3 - Layout & Aesthetic) */}
      <BentoShowcase 
        activeTheme={activeTheme} 
        onAddToCart={handleAddToCart} 
        onOpenWhatsApp={handleOpenWhatsAppDirect} 
      />

      {/* 4. Gerador de Combo da Indecisão (Option 4 - JS Interactive Utility) */}
      <IndecisionCombo 
        activeTheme={activeTheme} 
        onAddToCart={handleAddToCart}
        onScrollToCart={() => setIsCartOpen(true)}
      />

      {/* 5. Horizontal Tab-slidable Catalog (Option 1 Concept 3 + Option 2 Product listing) */}
      <MenuSection 
        activeTheme={activeTheme} 
        onAddToCart={handleAddToCart} 
        menuRef={menuRef} 
      />

      {/* 6. Prova Social Local, Proximidade & Delayed WhatsApp bubbles (Option 5 - Captura e Local Trust) */}
      <SEOProximity 
        activeTheme={activeTheme} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      {/* Slide-out Checkout & Cart Drawer container */}
      <CartDrawer
        activeTheme={activeTheme}
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateNotes={handleUpdateNotes}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Core Footer section */}
      <footer id="main-footer" className={`mt-auto py-12 px-4 text-center ${footerStyle.footerBg} transition-colors duration-500`}>
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-100/10 pb-6 text-left">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl">🍔</span>
                <span className="font-bold tracking-tight text-white uppercase text-sm">Chapa do Bairro</span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                Compromisso real com a vizinhança. Lanches fartos, preço justo e entrega super rápida na sua porta.
              </p>
            </div>

            <div className="text-right space-y-1.5">
              <p className="text-xs text-zinc-400 flex items-center justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Retiradas: Rua Paraíba, 420 - Centro do Bairro
              </p>
              <p className="text-xs text-zinc-400 flex items-center justify-end gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" /> Tel/WhatsApp: (71) 99219-3531
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <p className="flex items-center gap-1 justify-center sm:justify-start">
              Feito com <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> para a comunidade do bairro. © {new Date().getFullYear()}
            </p>
            
            <div className="flex gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${footerStyle.badgeText}`}>
                PIX ACEITO
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${footerStyle.badgeText}`}>
                ENTREGA RÁPIDA
              </span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
