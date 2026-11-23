import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Gift, Lock, Sparkles, Send } from 'lucide-react';

export const RewardModal = ({ stageId, onClose, onRewardSaved }) => {
  const { currentUser, partnerName, addReward } = useApp();
  const [prizeText, setPrizeText] = useState('');
  const [isSecret, setIsSecret] = useState(false);

  const quickIdeas = [
    'ماساژ ۳۰ دقیقه‌ای شانه و گردن 💆‍♀️',
    'آماده کردن صبحانه اختصاصی با قهوه و یک شاخه گل در تخت ☕',
    'دعوت به رستوران یا کافه دلخواهم با حساب تو 🍝',
    'شستن تمام ظرف‌ها و مرتب کردن اتاق برای این هفته 🧹',
    'خرید هدیه یا کتاب مورد علاقه‌ام 🎁',
    'نوشتن یک نامه عاشقانه ۳ خطی به زبان انگلیسی 💌'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prizeText.trim()) return;

    addReward({
      stageId: stageId || 1,
      winner: currentUser,
      loser: partnerName,
      title: prizeText.trim(),
      isSecret
    });

    onRewardSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-amber-300 dark:border-amber-900/60 space-y-5 animate-float">
        
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md">
              👑
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                فرم صدور حکم و جایزه توسط برنده
              </h3>
              <p className="text-xs text-slate-400">
                برنده: {currentUser === 'ali' ? 'علی 👦' : 'فاطمه 👧'} | مسئول اجرا: {partnerName === 'ali' ? 'علی 👦' : 'فاطمه 👧'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center text-sm">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-rose-500" />
              <span>جایزه‌ام این است که...</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="مثلاً: فردا شب پیتزای دست‌پخت خودت با فیلم مورد علاقه‌ام، یا یک ماساژ کامل..."
              value={prizeText}
              onChange={(e) => setPrizeText(e.target.value)}
              className="w-full text-xs p-3.5 rounded-2xl border border-amber-300 dark:border-slate-700 bg-amber-50/30 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-amber-500 shadow-inner leading-relaxed"
            />
          </div>

          
          <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors">
            <input 
              type="checkbox" 
              checked={isSecret} 
              onChange={(e) => setIsSecret(e.target.checked)} 
              className="w-4 h-4 text-purpleLove-600 rounded accent-purpleLove-600"
            />
            <Lock className="w-3.5 h-3.5 text-purpleLove-500" />
            <span>این جایزه به عنوان سوپرایز مخفی بماند (تا زمان اهدا توسط طرف مقابل دیده نشود!)</span>
          </label>

          
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-400 font-bold block">ایده‌های سریع (برای انتخاب کلیک کنید):</span>
            <div className="flex flex-wrap gap-1.5">
              {quickIdeas.map((idea, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setPrizeText(idea)}
                  className="text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg transition-colors text-right"
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>

          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-600 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>صدور رسمی حکم و ثبت در صندوق گنجینه جوایز 💌</span>
          </button>

        </form>

      </div>
    </div>
  );
};
