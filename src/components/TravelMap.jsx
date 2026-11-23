import React from 'react';
import { STAGES } from '../data/stages';
import { useApp } from '../context/AppContext';
import { Plane, Lock, CheckCircle2, Heart, Sparkles, MapPin } from 'lucide-react';

export const TravelMap = ({ onClose, onSelectStage, onOpenLoveNote }) => {
  const { unlockedStages, currentUser } = useApp();
  const currentMaxStage = unlockedStages[currentUser] || 1;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-5 md:p-6 shadow-2xl border border-rose-200 dark:border-slate-800 space-y-5 my-auto max-h-[90vh] flex flex-col">
        
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-purpleLove-600 text-white flex items-center justify-center text-lg shadow-md">
              ✈️
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>نقشه سفر مشترک من و فاطمه</span>
                <span className="text-[10px] bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-bold px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                  ۱۰ شهر جهان
                </span>
              </h3>
              <p className="text-xs text-slate-400">با گذر از هر مرحله، یک شهر رمانتیک به مقصدهای سفر ما اضافه می‌شود.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center text-sm transition-all"
          >
            ✕
          </button>
        </div>

        
        <div className="overflow-y-auto flex-1 space-y-4 pr-1 pl-1">
          
          <div className="relative border-r-2 border-dashed border-rose-300 dark:border-slate-700 mr-5 pr-6 space-y-5">
            {STAGES.map((stage) => {
              const isUnlocked = stage.id <= currentMaxStage;
              const isCompleted = stage.id < currentMaxStage;
              const isCurrent = stage.id === currentMaxStage;

              return (
                <div key={stage.id} className="relative group">
                  
                  
                  <div 
                    className={`absolute -right-[35px] top-4 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white border-2 border-white dark:border-slate-900' 
                        : isCurrent 
                          ? 'bg-rose-500 text-white border-2 border-white dark:border-slate-900 animate-pulse'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓' : stage.id}
                  </div>

                  
                  <div 
                    className={`rounded-2xl p-4 border transition-all ${
                      isUnlocked 
                        ? 'bg-gradient-to-l from-rose-50/60 dark:from-slate-800/80 via-white dark:via-slate-900 to-white dark:to-slate-900 border-rose-200 dark:border-slate-700 shadow-sm hover:shadow-md'
                        : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl p-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                          {stage.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                              مرحله {stage.id}: {stage.city}
                            </h4>
                            <span className="font-en text-[11px] text-slate-400 font-bold">
                              {stage.cityEn}
                            </span>
                          </div>
                          <p className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-0.5">
                            {stage.landmark} • {stage.titleFa}
                          </p>
                        </div>
                      </div>

                      
                      <div className="flex items-center gap-2">
                        {isUnlocked && (
                          <button 
                            onClick={() => { onClose(); onOpenLoveNote(stage); }}
                            className="text-xs font-bold text-purpleLove-600 dark:text-purpleLove-400 bg-purpleLove-50 dark:bg-purpleLove-950/60 px-3 py-1.5 rounded-xl border border-purpleLove-200 dark:border-purpleLove-900 hover:scale-105 transition-all flex items-center gap-1"
                          >
                            <Heart className="w-3.5 h-3.5 fill-purpleLove-500 text-purpleLove-500" />
                            <span>نامه مخفی</span>
                          </button>
                        )}
                        
                        <button 
                          disabled={!isUnlocked}
                          onClick={() => { onClose(); onSelectStage(stage.id); }}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                            isUnlocked 
                              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800' 
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {isUnlocked ? 'ورود به درس' : 'قفل است 🔒'}
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
