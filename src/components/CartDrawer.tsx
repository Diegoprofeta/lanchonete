/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppTheme, CartItem, DeliveryArea } from '../types';
import { DELIVERY_AREAS } from '../data';
import { ShoppingBag, X, Minus, Plus, Trash2, MapPin, CreditCard, MessageSquare, ClipboardCheck, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  activeTheme: AppTheme;
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onUpdateNotes: (productId: string, notes: string) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  activeTheme,
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onUpdateNotes,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  // Form fields
  const [clientName, setClientName] = useState('');
  const [selectedArea, setSelectedArea] = useState<DeliveryArea>(DELIVERY_AREAS[0]);
  const [streetNumber, setStreetNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [referencePoint, setReferencePoint] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cart' | 'cash'>('pix');
  const [cashChange, setCashChange] = useState('');
  const [customSearchStreet, setCustomSearchStreet] = useState('');

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = selectedArea.fee;
  const total = subtotal + deliveryFee;

  // Filter streets matching search query
  const filteredStreets = DELIVERY_AREAS.filter(area => 
    area.name.toLowerCase().includes(customSearchStreet.toLowerCase())
  );

  // Send draft via WhatsApp link
  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    if (!clientName.trim()) {
      alert('Por favor, digite seu nome para o pedido!');
      return;
    }
    if (selectedArea.fee > 0 && !streetNumber.trim()) {
      alert('Por favor, digite o número da sua residência!');
      return;
    }

    // Build WhatsApp message content
    let message = `🍔 *NOVO PEDIDO - LANCHONETE DO BAIRRO* 🍔\n`;
    message += `----------------------------------------\n`;
    message += `*Cliente:* ${clientName}\n`;
    message += `----------------------------------------\n\n`;
    message += `*ITENS DO PEDIDO:*\n`;

    cart.forEach((item) => {
      message += `• *${item.quantity}x ${item.product.name}* - R$ ${(item.product.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
      if (item.customNotes && item.customNotes.trim()) {
        message += `  _Obs: ${item.customNotes}_\n`;
      }
    });

    message += `\n----------------------------------------\n`;
    message += `*RESUMO FINANCEIRO:*\n`;
    message += `- Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    message += `- Taxa de Entrega: ${selectedArea.fee === 0 ? 'Grátis (Retirada)' : `R$ ${selectedArea.fee.toFixed(2).replace('.', ',')}`}\n`;
    message += `*TOTAL DO PEDIDO: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
    message += `----------------------------------------\n\n`;

    message += `*INFORMAÇÕES DE ENTREGA:*\n`;
    if (selectedArea.fee === 0) {
      message += `📍 Retirada no Balcão: Rua Paraíba, 420 (Próximo à praça principal)\n`;
    } else {
      message += `📍 Área: ${selectedArea.name}\n`;
      message += `🏠 Número/Apto: ${streetNumber}\n`;
      if (complement.trim()) message += `🏢 Complemento: ${complement}\n`;
      if (referencePoint.trim()) message += `💡 Ponto de Ref: ${referencePoint}\n`;
    }

    message += `\n*PAGAMENTO:*\n`;
    if (paymentMethod === 'pix') {
      message += `⚡ Pix (Chave CNPJ da Lanchonete)\n`;
    } else if (paymentMethod === 'cart') {
      message += `💳 Maquininha de Cartão na entrega (Aceita VR, Débito e Crédito)\n`;
    } else {
      message += `💵 Dinheiro (Precisa de troco para R$ ${cashChange || 'Não precisa'})\n`;
    }

    message += `\n_Pedido feito às ${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})} via Cardápio Digital._`;

    // WhatsApp API trigger
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5571992193531'; // Real WhatsApp Number
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const getThemeStyles = () => {
    switch (activeTheme) {
      case AppTheme.URBAN:
        return {
          headerBg: 'bg-zinc-950 text-white border-zinc-800',
          bodyBg: 'bg-zinc-900 text-zinc-100',
          btnPrimary: 'bg-orange-600 hover:bg-orange-700 text-white rounded-md border border-orange-500 font-anton uppercase tracking-wide',
          inputStyle: 'bg-zinc-950 border-zinc-800 text-white focus:border-orange-500 text-xs rounded-md',
          divider: 'border-zinc-800',
          accentText: 'text-orange-500',
          itemBg: 'bg-zinc-950 border-zinc-850',
          scrollBg: 'bg-zinc-950/40'
        };
      case AppTheme.PODRAO:
        return {
          headerBg: 'bg-emerald-700 text-white border-emerald-600',
          bodyBg: 'bg-[#F4F6F4] text-zinc-900',
          btnPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl border-b-4 border-emerald-800 font-bold uppercase',
          inputStyle: 'bg-white border-emerald-100 text-zinc-950 focus:border-emerald-500 text-xs rounded-xl',
          divider: 'border-emerald-100',
          accentText: 'text-emerald-700',
          itemBg: 'bg-white border-emerald-50 shadow-sm',
          scrollBg: 'bg-emerald-50/20'
        };
      case AppTheme.CLASSIC:
      default:
        return {
          headerBg: 'bg-red-600 text-white border-red-500',
          bodyBg: 'bg-slate-50 text-zinc-900',
          btnPrimary: 'bg-red-600 hover:bg-red-700 text-white rounded-full font-bold',
          inputStyle: 'bg-white border-zinc-200 text-zinc-900 focus:border-red-500 text-xs rounded-full px-4',
          divider: 'border-zinc-200/80',
          accentText: 'text-red-600',
          itemBg: 'bg-white border-zinc-100 shadow-sm',
          scrollBg: 'bg-zinc-100/30'
        };
    }
  };

  const style = getThemeStyles();

  if (!isOpen) return null;

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed Background Overlay */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className={`relative w-full max-w-md h-full flex flex-col shadow-2xl transition-all duration-300 ${style.bodyBg}`}>
        
        {/* Drawer Header */}
        <div className={`p-4 border-b flex items-center justify-between ${style.headerBg}`}>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-yellow-400" />
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider">Meu Pedido</h3>
              <p className="text-[10px] opacity-75">{cart.length} item(ns) selecionado(s)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Cart Items list */}
          {cart.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center">
              <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mb-3 animate-bounce" />
              <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Seu carrinho está vazio</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-xs">
                Navegue pelas delícias da chapa do bairro e clique em "Adicionar" para montar seu pedido.
              </p>
              <button 
                onClick={onClose}
                className={`mt-4 px-5 py-2 text-xs font-semibold cursor-pointer ${style.btnPrimary}`}
              >
                Voltar ao Cardápio
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">1. Itens Escolhidos</h4>
              {cart.map((item) => (
                <div key={item.product.id} className={`p-3.5 rounded-2xl border flex flex-col gap-2 ${style.itemBg}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-grow">
                      <h5 className="text-xs font-bold text-zinc-900 dark:text-white">{item.product.name}</h5>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-0.5 font-mono">
                        R$ {item.product.price.toFixed(2).replace('.', ',')} / cada
                      </span>
                    </div>

                    <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {/* Quantity adjustments & Notes */}
                  <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/40">
                    {/* Notes Input */}
                    <input
                      type="text"
                      placeholder="Ex: Sem cebola, maionese extra..."
                      value={item.customNotes || ''}
                      onChange={(e) => onUpdateNotes(item.product.id, e.target.value)}
                      className="text-[11px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2.5 py-1 flex-grow outline-none focus:border-amber-500"
                    />

                    {/* Quantity selectors */}
                    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-0.5">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors text-zinc-500 dark:text-zinc-300 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold px-2 text-zinc-800 dark:text-zinc-100">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors text-zinc-500 dark:text-zinc-300 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 hover:bg-red-100 text-red-500 rounded transition-colors ml-1 cursor-pointer"
                        title="Remover Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={onClearCart}
                  className="text-[10px] text-red-500 font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Limpar Carrinho
                </button>
              </div>
            </div>
          )}

          {cart.length > 0 && (
            <>
              {/* Form 2: Calculadora de Entrega por Rua (Option 1 Concept 1) */}
              <div className={`p-4 rounded-2xl border ${style.itemBg} space-y-3`}>
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${style.accentText}`} />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">2. Calculadora de Taxa por Rua</h4>
                </div>
                
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-snug">
                  Selecione sua rua ou digite para filtrar e ver a taxa de entrega na hora!
                </p>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Filtrar ruas do bairro (ex: Bahia, Pinheiros)..."
                    value={customSearchStreet}
                    onChange={(e) => setCustomSearchStreet(e.target.value)}
                    className={`w-full p-2 border outline-none ${style.inputStyle}`}
                  />

                  {/* Quick area select dropdown/buttons list */}
                  <div className="max-h-24 overflow-y-auto border border-zinc-100 dark:border-zinc-800 rounded-lg p-1.5 space-y-1 bg-zinc-50/50 dark:bg-zinc-900/30">
                    {filteredStreets.map((area) => (
                      <button
                        key={area.name}
                        onClick={() => setSelectedArea(area)}
                        className={`w-full text-left px-2 py-1.5 rounded text-[11px] flex justify-between items-center cursor-pointer transition-colors ${
                          selectedArea.name === area.name 
                            ? 'bg-amber-100 dark:bg-zinc-800 font-extrabold text-zinc-900 dark:text-white' 
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        <span className="truncate">{area.name}</span>
                        <span className="font-mono text-[10px]">
                          {area.fee === 0 ? 'Grátis' : `R$ ${area.fee.toFixed(2).replace('.', ',')}`} ({area.timeEstimate})
                        </span>
                      </button>
                    ))}
                    {filteredStreets.length === 0 && (
                      <p className="text-[10px] text-zinc-400 text-center py-2">Nenhuma rua encontrada no bairro.</p>
                    )}
                  </div>
                </div>

                {/* Street delivery address detail */}
                {selectedArea.fee > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-400 uppercase font-mono">Número / Apto *</label>
                      <input
                        type="text"
                        placeholder="Ex: 123 ap 45"
                        required
                        value={streetNumber}
                        onChange={(e) => setStreetNumber(e.target.value)}
                        className={`w-full p-2 border outline-none ${style.inputStyle}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-400 uppercase font-mono">Ponto de Referência</label>
                      <input
                        type="text"
                        placeholder="Ex: Próximo ao mercado"
                        value={referencePoint}
                        onChange={(e) => setReferencePoint(e.target.value)}
                        className={`w-full p-2 border outline-none ${style.inputStyle}`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Form 3: Cliente & Meio de Pagamento */}
              <div className={`p-4 rounded-2xl border ${style.itemBg} space-y-3`}>
                <div className="flex items-center gap-2">
                  <CreditCard className={`w-4 h-4 ${style.accentText}`} />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">3. Dados de Contato e Pagamento</h4>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[9px] text-zinc-400 uppercase font-mono">Seu Nome Completo *</label>
                  <input
                    type="text"
                    placeholder="Como podemos te chamar?"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className={`w-full p-2 border outline-none ${style.inputStyle}`}
                  />
                </div>

                {/* Payment Option Buttons */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[9px] text-zinc-400 uppercase font-mono block">Forma de Pagamento</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`py-2 px-1 text-center rounded-lg border text-[11px] font-bold flex flex-col items-center justify-center cursor-pointer transition-all ${
                        paymentMethod === 'pix' 
                          ? 'bg-sky-100 dark:bg-sky-950/40 border-sky-400 text-sky-800 dark:text-sky-300' 
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                      }`}
                    >
                      ⚡ Pix
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cart')}
                      className={`py-2 px-1 text-center rounded-lg border text-[11px] font-bold flex flex-col items-center justify-center cursor-pointer transition-all ${
                        paymentMethod === 'cart' 
                          ? 'bg-purple-100 dark:bg-purple-950/40 border-purple-400 text-purple-800 dark:text-purple-300' 
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                      }`}
                    >
                      💳 Cartão
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`py-2 px-1 text-center rounded-lg border text-[11px] font-bold flex flex-col items-center justify-center cursor-pointer transition-all ${
                        paymentMethod === 'cash' 
                          ? 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-300' 
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                      }`}
                    >
                      💵 Dinheiro
                    </button>
                  </div>
                </div>

                {/* Cash Change request */}
                {paymentMethod === 'cash' && (
                  <div className="space-y-1 pt-1">
                    <label className="text-[9px] text-zinc-400 uppercase font-mono">Precisa de troco para quanto?</label>
                    <input
                      type="text"
                      placeholder="Ex: Troco para R$ 50 ou Não precisa"
                      value={cashChange}
                      onChange={(e) => setCashChange(e.target.value)}
                      className={`w-full p-2 border outline-none ${style.inputStyle}`}
                    />
                  </div>
                )}
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer (Review Financial summary & Submit button) */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-3.5">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span>Subtotal dos itens:</span>
                <span className="font-mono">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span>Taxa de Entrega ({selectedArea.fee === 0 ? 'Balcão' : 'Rua'}):</span>
                <span className="font-mono">{selectedArea.fee === 0 ? 'Grátis' : `R$ ${selectedArea.fee.toFixed(2).replace('.', ',')}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-zinc-900 dark:text-white pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
                <span>Total Estimado:</span>
                <span className="font-mono text-base text-amber-600 dark:text-amber-500">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            {/* Submit button directly triggers preset text layout */}
            <button
              onClick={handleCheckoutWhatsApp}
              className={`w-full py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-md select-none transition-transform active:scale-98 text-xs ${style.btnPrimary}`}
            >
              <MessageSquare className="w-4 h-4 text-green-300 fill-green-300" /> 
              Enviar Pedido para o WhatsApp
            </button>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center leading-none mt-1">
              Faremos o fechamento e enviaremos seu pedido na hora para o atendente!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
