import React from 'react';
import { STAGES } from '../data/stages';
import { useApp } from '../context/AppContext';
import { Trophy, TrendingUp, Award, Flame } from 'lucide-react';

export const ScoreBoard = ({ onClose }) => {
  const { scores, unlockedStages } = useApp();

  const aliScores = scores.ali || {};
  const fatemehScores = scores.fatemeh || {};

  let aliTotal = 0;
  let fatemehTotal = 0;
  let aliWins = 0;
  let fatemehWins = 0;

  STAGES.forEach(s => {
    const a = aliScores[s.id] || 0;
    const f = fatemehScores[s.id] || 0;
    aliTotal += a;
    fatemehTotal += f;
    if (a > f) aliWins++;
    if (f > a) fatemehWins++;
  });

  const aliAvg = Math.round(aliTotal / STAGES.length);
  const fatemehAvg = Math.round(fatemehTotal / STAGES.length);

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-5 md:p-6 shadow-2xl border border-rose-200 dark:border-slate-800 space-y-5 my-auto max-h-[90vh] flex flex-col">
        
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                نمودار پیشرفت و جدول امتیازات دونفره
              </h3>
              <p className="text-xs text-slate-400">سنجش گام‌به‌گام و رقابت عاشقانه من و فاطمه در ۱۰ مرحله</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center text-sm">✕</button>
        </div>

        
        <div className="grid grid-cols-2 gap-3 flex-shrink-0">
          
          
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/60 text-lg flex items-center justify-center mx-auto">👦</div>
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-200">علی</div>
              <div className="font-en text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">{aliTotal} <span className="text-xs font-normal">امتیاز</span></div>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1 font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{aliWins} پیروزی در آزمون</span>
            </div>
          </div>

          
          <div className="p-4 rounded-2xl bg-pink-50/60 dark:bg-slate-800 border border-pink-200 dark:border-slate-700 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/60 text-lg flex items-center justify-center mx-auto">👧</div>
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-200">فاطمه</div>
              <div className="font-en text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">{fatemehTotal} <span className="text-xs font-normal">امتیاز</span></div>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1 font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{fatemehWins} پیروزی در آزمون</span>
            </div>
          </div>

        </div>

        
        <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex-shrink-0 text-xs">
          <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-300">
            <span>درصد تسلط به زبان انگلیسی:</span>
            <span className="font-en font-black text-rose-500">
              {Math.round(((unlockedStages.ali + unlockedStages.fatemeh) / 20) * 100)}%
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-rose-500 to-purpleLove-600 h-full rounded-full transition-all duration-700" 
              style={{ width: `${Math.round(((unlockedStages.ali + unlockedStages.fatemeh) / 20) * 100)}%` }}
            ></div>
          </div>
        </div>

        
        <div className="overflow-y-auto flex-1 space-y-2 pr-1 pl-1">
          <span className="text-xs font-bold text-slate-400 block">ریز نمرات مراحل ۱۰ گانه:</span>
          
          <div className="space-y-1.5 text-xs">
            {STAGES.map(stage => {
              const a = aliScores[stage.id];
              const f = fatemehScores[stage.id];
              const isAliAhead = a !== undefined && f !== undefined && a > f;
              const isFatemehAhead = a !== undefined && f !== undefined && f > a;
              const isTied = a !== undefined && f !== undefined && a === f;

              return (
                <div key={stage.id} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-[11px]">
                      {stage.id}
                    </span>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-white block">{stage.titleFa}</span>
                      <span className="text-[10px] text-slate-400 font-en">{stage.cityEn}</span>
                    </div>
                  </div>

                  
                  <div className="flex items-center gap-4 font-en font-black text-xs">
                    <span className={`px-2 py-0.5 rounded-md ${isAliAhead ? 'bg-blue-100 text-blue-700' : 'text-slate-500'}`}>
                      علی: {a !== undefined ? `${a}` : '-'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md ${isFatemehAhead ? 'bg-pink-100 text-rose-700' : 'text-slate-500'}`}>
                      فاطمه: {f !== undefined ? `${f}` : '-'}
                    </span>
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
