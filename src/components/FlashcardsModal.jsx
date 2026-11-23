import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, RotateCcw, Check, ChevronRight, ChevronLeft } from 'lucide-react';

export const FlashcardsModal = ({ stage, onClose, onFinish }) => {
  const { speak } = useApp();
  const cards = stage?.flashcards || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState({});

  if (!stage || cards.length === 0) return null;

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const markCard = (isKnown) => {
    setKnownCards(prev => ({ ...prev, [currentCard.id]: isKnown }));
    handleNext();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-indigo-200 dark:border-slate-800 space-y-5">
        
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗂️</span>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                فلش‌کارت‌های لایتنر مرحله {stage.id}
              </h3>
              <span className="text-[11px] text-slate-400 font-en">
                کارت {currentIndex + 1} از {cards.length}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center text-sm">✕</button>
        </div>

        
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="cursor-pointer min-h-[200px] p-6 rounded-3xl bg-gradient-to-b from-indigo-50/50 via-white to-pink-50/30 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 border-2 border-dashed border-indigo-300 dark:border-slate-700 shadow-md flex flex-col items-center justify-center text-center space-y-3 transition-transform hover:scale-[1.02]"
        >
          {!isFlipped ? (
            
            <div className="space-y-2">
              <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider block">English (روی کارت)</span>
              <div className="font-en text-3xl font-extrabold text-slate-900 dark:text-white">
                {currentCard.front}
              </div>
              <div className="font-en text-xs text-slate-400 font-mono">
                {currentCard.ipa}
              </div>
              <div className="pt-2 flex items-center justify-center gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); speak(currentCard.front); }}
                  className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm flex items-center gap-1 text-xs font-bold"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>تلفظ صوتی</span>
                </button>
              </div>
              <span className="text-[10px] text-slate-400 block pt-1">برای دیدن معنی و مثال کلیک کنید ↻</span>
            </div>
          ) : (
            
            <div className="space-y-2">
              <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block">فارسی و مثال (پشت کارت)</span>
              <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400">
                {currentCard.back}
              </div>
              <div className="font-en text-xs text-slate-600 dark:text-slate-300 italic max-w-xs mx-auto">
                "{currentCard.example}"
              </div>
              <span className="text-[10px] text-slate-400 block pt-2">برای چرخش مجدد کلیک کنید ↻</span>
            </div>
          )}
        </div>

        
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button 
            onClick={() => markCard(false)}
            className="py-3 px-4 rounded-xl border border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 text-xs font-bold hover:bg-amber-100 flex items-center justify-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>نیاز به مرور ↻</span>
          </button>
          <button 
            onClick={() => markCard(true)}
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>کاملاً بلدم ✓</span>
          </button>
        </div>

        
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-1">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className="disabled:opacity-30 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1"
          >
            <ChevronRight className="w-4 h-4" />
            <span>کارت قبلی</span>
          </button>
          <span>{currentIndex + 1} / {cards.length}</span>
          <button 
            onClick={handleNext}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1"
          >
            <span>کارت بعدی</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
