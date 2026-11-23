import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Gift, 
  Clock, 
  CheckCircle, 
  ShieldAlert, 
  Flame, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Send,
  AlertCircle
} from 'lucide-react';

export const RewardsVault = ({ onClose }) => {
  const { 
    currentUser, 
    rewardsVault, 
    deliverReward, 
    confirmReward, 
    useVeto, 
    vetoUsed,
    partnerName 
  } = useApp();

  const [activeTab, setActiveTab] = useState('my-rewards'); // 'my-rewards' or 'to-give'
  const [revealedSecrets, setRevealedSecrets] = useState({});

  // Filter rewards
  // 'my-rewards': rewards where winner === currentUser (I earned this)
  const myRewards = rewardsVault.filter(r => r.winner === currentUser);
  // 'to-give': rewards where loser === currentUser (I owe this to my partner)
  const toGiveRewards = rewardsVault.filter(r => r.loser === currentUser);

  const currentList = activeTab === 'my-rewards' ? myRewards : toGiveRewards;

  const toggleSecret = (id) => {
    setRevealedSecrets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate days left from deadline
  const getDaysLeft = (deadlineStr) => {
    try {
      const diff = new Date(deadlineStr) - new Date();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    } catch (e) {
      return 7;
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-5 md:p-6 shadow-2xl border-2 border-amber-300 dark:border-amber-900/60 space-y-5 my-auto max-h-[90vh] flex flex-col">
        
        
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30 animate-bounce">
                📦
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>صندوق گنجینه جوایز عاشقانه</span>
                  <span className="text-[10px] bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                    احکام آزمون‌ها
                  </span>
                </h3>
                <p className="text-xs text-slate-400">جوایزی که برنده در آزمون تعیین کرده است (با مهلت ۷ روزه)</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 flex items-center justify-center text-sm"
            >
              ✕
            </button>
          </div>

          
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] bg-amber-50/70 dark:bg-slate-800/80 border border-amber-200/80 dark:border-slate-700 p-2.5 rounded-2xl">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>وضعیت حق وتوی شما ({currentUser === 'ali' ? 'علی' : 'فاطمه'}):</span>
              <span className={vetoUsed[currentUser] ? "text-rose-500" : "text-emerald-600 font-black"}>
                {vetoUsed[currentUser] ? "استفاده شده ✗" : "موجود و قابل استفاده (۱ بار) ✓"}
              </span>
            </div>
            <span className="text-slate-400 text-[10px]">بردهای متوالی = جایزه ۲ برابری! 🔥</span>
          </div>

          
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pt-3 text-xs font-bold">
            <button 
              onClick={() => setActiveTab('my-rewards')}
              className={`pb-2.5 px-4 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'my-rewards' 
                  ? 'border-rose-500 text-rose-600 dark:text-rose-400' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <span>🎁 جوایز من (طلب‌های من)</span>
              <span className="bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 rounded-full px-2 py-0.5 text-[10px]">
                {myRewards.length}
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('to-give')}
              className={`pb-2.5 px-4 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'to-give' 
                  ? 'border-purpleLove-500 text-purpleLove-600 dark:text-purpleLove-400' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <span>💌 جوایز اهدایی (بدهی‌های من به {currentUser === 'ali' ? 'فاطمه' : 'علی'})</span>
              <span className="bg-purpleLove-100 dark:bg-purpleLove-950 text-purpleLove-600 dark:text-purpleLove-400 rounded-full px-2 py-0.5 text-[10px]">
                {toGiveRewards.length}
              </span>
            </button>
          </div>
        </div>

        
        <div className="overflow-y-auto flex-1 space-y-3 pr-1 pl-1">
          {currentList.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <span className="text-4xl">🕊️</span>
              <p className="text-xs font-bold text-slate-400">هنوز جایزه‌ای در این بخش ثبت نشده است.</p>
              <p className="text-[11px] text-slate-400">با اتمام آزمون هر مرحله، برنده می‌تواند جایزه دلخواهش را تعیین کند!</p>
            </div>
          ) : (
            currentList.map((reward) => {
              const daysLeft = getDaysLeft(reward.deadline);
              const isUrgent = daysLeft <= 2 && reward.status === 'pending';
              const isMyPrize = reward.winner === currentUser;
              const isSecretHidden = reward.isSecret && !revealedSecrets[reward.id] && reward.status === 'pending';

              return (
                <div 
                  key={reward.id} 
                  className={`p-4 rounded-2xl border transition-all space-y-3 ${
                    reward.isVetoed 
                      ? 'bg-slate-100 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700 opacity-60'
                      : reward.status === 'confirmed'
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                        : isUrgent
                          ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-sm'
                  }`}
                >
                  
                  
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                        مرحله {reward.stageId}
                      </span>
                      {reward.isDouble && (
                        <span className="text-[10px] font-extrabold bg-amber-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <Flame className="w-3 h-3 fill-white" />
                          <span>جایزه ۲ برابری!</span>
                        </span>
                      )}
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        برنده: {reward.winner === 'ali' ? '👦 علی' : '👧 فاطمه'}
                      </span>
                    </div>

                    
                    <div className="flex items-center gap-1 text-[11px] font-bold">
                      {reward.isVetoed ? (
                        <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 px-2.5 py-0.5 rounded-full">
                          🛡️ وتو و لغو شد
                        </span>
                      ) : reward.status === 'confirmed' ? (
                        <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>تایید و دریافت شد ✓</span>
                        </span>
                      ) : reward.status === 'delivered' ? (
                        <span className="bg-purpleLove-100 dark:bg-purpleLove-950 text-purpleLove-600 dark:text-purpleLove-400 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <span>🎁 اهدا شده (منتظر تایید)</span>
                        </span>
                      ) : (
                        <span className={`px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          isUrgent ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                        }`}>
                          <Clock className="w-3 h-3" />
                          <span>{daysLeft} روز مهلت باقی مانده</span>
                        </span>
                      )}
                    </div>
                  </div>

                  
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    {isSecretHidden ? (
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-2">
                          <EyeOff className="w-4 h-4 text-purpleLove-500" />
                          <strong className="text-purpleLove-600 dark:text-purpleLove-400">جایزه به عنوان سوپرایز مخفی ثبت شده است!</strong>
                        </span>
                        {isMyPrize && (
                          <button 
                            onClick={() => toggleSecret(reward.id)} 
                            className="text-[10px] text-indigo-500 underline"
                          >
                            مشاهده (برای من که برنده‌ام)
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white leading-relaxed">
                          «{reward.title}»
                        </p>
                        {reward.isSecret && (
                          <span className="text-[10px] text-purpleLove-500 font-bold block">
                            🔒 این جایزه در ابتدا مخفی بود
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  
                  {!reward.isVetoed && reward.status !== 'confirmed' && (
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
                      
                      
                      {!isMyPrize && reward.status === 'pending' && (
                        <button 
                          onClick={() => deliverReward(reward.id)}
                          className="bg-purpleLove-600 hover:bg-purpleLove-700 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>اعلام اهدا و ادای جایزه 🎁</span>
                        </button>
                      )}

                      
                      {isMyPrize && (
                        <button 
                          onClick={() => confirmReward(reward.id)}
                          className={`font-bold px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 ${
                            reward.status === 'delivered' 
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse' 
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{reward.status === 'delivered' ? 'تایید دریافت جایزه ✅ (اهدا شد)' : 'در انتظار دریافت...'}</span>
                        </button>
                      )}

                      
                      {!isMyPrize && reward.status === 'pending' && !vetoUsed[currentUser] && (
                        <button 
                          onClick={() => {
                            if (window.confirm('آیا مطمئن هستید که می‌خواهید از یک بار حق وتوی خود برای این جایزه استفاده کنید؟ این کار قابل بازگشت نیست.')) {
                              useVeto(reward.id, currentUser);
                            }
                          }}
                          className="text-slate-400 hover:text-rose-500 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1"
                          title="باطل کردن این جایزه (فقط ۱ بار برای هر نفر)"
                        >
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                          <span>استفاده از حق وتو 🛡️</span>
                        </button>
                      )}

                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
