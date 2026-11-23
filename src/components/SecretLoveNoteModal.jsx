import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, Heart, Sparkles } from 'lucide-react';

export const SecretLoveNoteModal = ({ stage, onClose }) => {
  const { speak } = useApp();
  if (!stage || !stage.secretLoveNote) return null;

  const { titleEn, titleFa, contentEn, contentFa } = stage.secretLoveNote;

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-rose-50 via-white to-rose-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-rose-300 dark:border-rose-900/60 relative space-y-5 animate-float">
        
        
        <div className="absolute -top-6 right-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 border-2 border-white dark:border-slate-900 text-xl">
          💌
        </div>

        
        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>نامه مخفی مرحله {stage.id}: {stage.city}</span>
          </span>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-rose-100 dark:border-slate-700 shadow-inner space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-en text-sm font-extrabold text-slate-900 dark:text-white">
              {titleEn}
            </h4>
            <button 
              onClick={() => speak(contentEn)}
              className="p-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white shadow-md active:scale-95 transition-all flex items-center gap-1 text-xs font-bold"
              title="شنیدن تلفظ نامه با صدای انگلیسی"
            >
              <Volume2 className="w-4 h-4" />
              <span>پخش صدا 🔊</span>
            </button>
          </div>

          <p className="font-en text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic border-r-2 border-rose-400 pr-3">
            "{contentEn}"
          </p>
        </div>

        
        <div className="space-y-1.5 px-1">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>ترجمه فارسی: {titleFa}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {contentFa}
          </p>
        </div>

        
        <div className="pt-2 border-t border-rose-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-rose-500">
          <span>تقدیم با تمام عشق • من و فاطمه</span>
          <button 
            onClick={onClose}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-all"
          >
            بستن و ادامه مسیر ✨
          </button>
        </div>

      </div>
    </div>
  );
};
