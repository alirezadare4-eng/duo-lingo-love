import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, BookOpen, Sparkles, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';

export const LessonModal = ({ stage, onClose, onStartPractice, onStartFlashcards, onStartExam }) => {
  const { speak } = useApp();
  if (!stage) return null;

  const { lesson, titleFa, titleEn, city, id } = stage;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-5 md:p-6 shadow-2xl border border-rose-200 dark:border-slate-800 space-y-5 my-auto max-h-[90vh] flex flex-col">
        
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center text-base border border-rose-200 dark:border-rose-900">
              {id}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  درس مرحله {id}: {titleFa}
                </h3>
                <span className="font-en text-xs text-slate-400 font-bold">{titleEn}</span>
              </div>
              <p className="text-xs text-rose-500 font-medium">موقعیت سفر: {city}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        
        <div className="overflow-y-auto flex-1 space-y-4 pr-1 pl-1 text-xs">
          
          
          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-slate-800/60 border border-rose-200/80 dark:border-slate-700 leading-relaxed text-slate-700 dark:text-slate-300">
            {lesson.intro}
          </div>

          
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>نکات کلیدی و گرامری این مرحله:</span>
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {lesson.keyPoints.map((point, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-rose-500 font-bold">✓</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>واژگان و عبارات کلیدی (با تلفظ صوتی):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {lesson.vocabulary.map((vocab, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-2 hover:border-rose-300 transition-all">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-en text-sm font-extrabold text-slate-900 dark:text-white">
                        {vocab.en}
                      </span>
                      <span className="font-en text-[10px] text-slate-400 font-mono">
                        {vocab.ipa}
                      </span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 text-xs font-medium">
                      {vocab.fa}
                    </div>
                    <div className="font-en text-[10px] text-rose-500 italic">
                      "{vocab.example}"
                    </div>
                  </div>
                  <button 
                    onClick={() => speak(vocab.en)}
                    className="w-8 h-8 rounded-xl bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20 active:scale-95 transition-all flex-shrink-0"
                    title="پخش تلفظ صوتی"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-purpleLove-50 dark:from-slate-800 dark:to-slate-800/80 border border-rose-200 dark:border-rose-900/60 space-y-1">
            <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>مثال واقعی درباره من و فاطمه:</span>
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-200 font-bold leading-relaxed">
              {lesson.personalExample}
            </p>
          </div>

        </div>

        
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button 
              onClick={onStartFlashcards}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 px-3.5 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-900 transition-all flex items-center gap-1.5"
            >
              <span>🗂️ فلش‌کارت‌ها</span>
            </button>
            <button 
              onClick={onStartPractice}
              className="text-xs font-bold text-purpleLove-600 dark:text-purpleLove-400 bg-purpleLove-50 dark:bg-purpleLove-950/60 hover:bg-purpleLove-100 px-3.5 py-2.5 rounded-xl border border-purpleLove-200 dark:border-purpleLove-900 transition-all flex items-center gap-1.5"
            >
              <span>✏️ تمرین تعاملی</span>
            </button>
          </div>

          <button 
            onClick={onStartExam}
            className="text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 text-white px-5 py-2.5 rounded-xl shadow-md shadow-rose-500/25 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>شروع آزمون ۱۰۰ نمره‌ای</span>
            <span>←</span>
          </button>
        </div>

      </div>
    </div>
  );
};
