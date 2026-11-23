import React from 'react';
import { STAGES } from '../data/stages';
import { useApp } from '../context/AppContext';
import { Play, CheckCircle2, Trophy, Heart, Sparkles, Lock, RotateCcw } from 'lucide-react';

export const StageRoadmap = ({ onStartGuidedStage, onOpenLoveNote }) => {
  const { currentUser, partnerName, unlockedStages, scores } = useApp();

  const myMaxStage = unlockedStages[currentUser] || 1;
  const partnerMaxStage = unlockedStages[partnerName] || 1;
  const myScores = scores[currentUser] || {};
  const currentActiveStageObj = STAGES.find(s => s.id === myMaxStage) || STAGES[0];

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-24">
      
      {/* TOP MASTER ACTION BUTTON / HERO CARD */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-purpleLove-600 text-white shadow-xl shadow-rose-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
            کلید هوشمند آموزش مرحله‌به‌مرحله
          </span>
          <span className="text-xs font-bold text-rose-100 font-en">
            Stage {currentActiveStageObj.id} of 10
          </span>
        </div>

        <div>
          <h2 className="text-xl font-black tracking-tight">
            مرحله {currentActiveStageObj.id}: {currentActiveStageObj.titleFa}
          </h2>
          <p className="text-xs text-rose-100 mt-1 leading-relaxed">
            مقصد سفر: {currentActiveStageObj.city} • با زدن دکمه زیر، درس، فلش‌کارت، تمرین و آزمون به نوبت و خودکار باز می‌شوند.
          </p>
        </div>

        {/* THE MASTER BUTTON */}
        <button 
          onClick={() => onStartGuidedStage(currentActiveStageObj)}
          className="w-full bg-white hover:bg-rose-50 text-rose-600 font-black text-sm py-3.5 px-6 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Play className="w-5 h-5 fill-rose-600 text-rose-600 group-hover:scale-110 transition-transform" />
          <span>ادامه آموزش مرحله‌به‌مرحله (شروع خودکار) ▶</span>
        </button>
      </div>

      {/* Roadmap Header */}
      <div className="text-center space-y-1 pt-2">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
          مسیر ۱۰ مرحله‌ای من و فاطمه
        </h3>
        <p className="text-xs text-slate-400">
          هر مرحله شامل درس، فلش‌کارت، تمرین و آزمون ۱۰۰ نمره‌ای با جایزه دلخواه برنده است.
        </p>
      </div>

      {/* Linear Path of 10 Stages */}
      <div className="relative py-2 flex flex-col items-center gap-5">
        
        {STAGES.map((stage, idx) => {
          const isUnlocked = stage.id <= myMaxStage;
          const isCompleted = myScores[stage.id] !== undefined;
          const isCurrent = stage.id === myMaxStage;
          const isPartnerHere = partnerMaxStage === stage.id;
          const myScore = myScores[stage.id];

          return (
            <React.Fragment key={stage.id}>
              
              {/* Stage Card */}
              <div 
                className={`w-full rounded-3xl border transition-all relative overflow-hidden ${
                  isCurrent 
                    ? 'bg-white dark:bg-slate-900 border-2 border-rose-500 shadow-xl shadow-rose-500/10'
                    : isCompleted 
                      ? 'bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 shadow-sm'
                      : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                }`}
              >
                
                {isCurrent && (
                  <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold py-1 px-4 flex items-center justify-between">
                    <span>مرحله فعال امروز شما ✨</span>
                    <span className="font-en">Level {stage.id < 10 ? '0' + stage.id : stage.id}</span>
                  </div>
                )}

                <div className="p-4 md:p-5 space-y-4">
                  
                  {/* Main Info Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border ${
                        isCompleted 
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-600'
                          : isCurrent 
                            ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 animate-pulse'
                            : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                      }`}>
                        {isCompleted ? '✓' : stage.icon}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-en text-xs font-black text-rose-500">
                            مرحله {stage.id}
                          </span>
                          <span className="text-[11px] text-slate-400 font-bold">
                            • {stage.city}
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                          {stage.titleFa}
                        </h3>
                        <p className="font-en text-xs text-slate-400 font-medium">
                          {stage.titleEn}
                        </p>
                      </div>
                    </div>

                    {/* Avatars */}
                    <div className="flex items-center gap-1">
                      {isCurrent && (
                        <span className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs shadow-sm" title="موقعیت شما">
                          {currentUser === 'ali' ? '👦' : '👧'}
                        </span>
                      )}
                      {isPartnerHere && (
                        <span className="w-7 h-7 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-xs shadow-sm" title={`موقعیت ${partnerName === 'ali' ? 'علی' : 'فاطمه'}`}>
                          {partnerName === 'ali' ? '👦' : '👧'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Scores Badge if completed */}
                  {myScore !== undefined && (
                    <div className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-slate-600 dark:text-slate-300">نمره آزمون شما:</span>
                        <span className="font-en font-black text-rose-600">{myScore}/100</span>
                      </div>
                      <span className="text-emerald-600 font-bold text-[11px]">پاس شده ✓</span>
                    </div>
                  )}

                  {/* ONE SINGLE MASTER ACTION BUTTON PER STAGE */}
                  <div>
                    {isCurrent ? (
                      <button 
                        onClick={() => onStartGuidedStage(stage)}
                        className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purpleLove-600 hover:from-rose-600 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md shadow-rose-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>ورود به مرحله و شروع آموزش گام‌به‌گام ▶</span>
                      </button>
                    ) : isCompleted ? (
                      <button 
                        onClick={() => onStartGuidedStage(stage)}
                        className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>مرور دوباره این مرحله ↻</span>
                      </button>
                    ) : (
                      <div className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed">
                        <Lock className="w-3.5 h-3.5" />
                        <span>مرحله قفل است (مراحل قبل را تکمیل کنید)</span>
                      </div>
                    )}
                  </div>

                  {/* Secret Love Note Link */}
                  {isUnlocked && (
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <button 
                        onClick={() => onOpenLoveNote(stage)}
                        className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                        <span>مشاهده نامه مخفی عاشقانه این مرحله 💌</span>
                      </button>
                    </div>
                  )}

                </div>
              </div>

              {idx < STAGES.length - 1 && (
                <div className="w-1 h-6 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              )}

            </React.Fragment>
          );
        })}

      </div>

    </div>
  );
};
