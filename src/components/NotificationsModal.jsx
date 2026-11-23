import React from 'react';
import { useApp } from '../context/AppContext';
import { requestPushPermission } from '../firebase';
import { Bell, CheckCheck, Gift, Clock, ShieldAlert, Sparkles } from 'lucide-react';

export const NotificationsModal = ({ onClose }) => {
  const { notifications, markNotificationsAsRead } = useApp();

  const handleEnablePush = async () => {
    const res = await requestPushPermission();
    if (res.granted) {
      alert('اعلان‌های موبایل و وب با موفقیت فعال شدند! 🔔');
    } else {
      alert(res.reason || 'فعال‌سازی اعلان با خطا مواجه شد.');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 dark:border-slate-800 space-y-4 max-h-[85vh] flex flex-col">
        
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500">
              <Bell className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                صندوق اعلان‌ها و هشدارها
              </h3>
              <p className="text-[11px] text-slate-400">ثبت جایزه جدید، اهدا شدن، نزدیک شدن مهلت ۷ روزه</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center text-sm">✕</button>
        </div>

        
        <div className="p-3 bg-gradient-to-r from-rose-50 to-purpleLove-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl border border-rose-200 dark:border-slate-700 flex items-center justify-between gap-2 flex-shrink-0">
          <div className="text-[11px] text-slate-700 dark:text-slate-300">
            <strong>اعلان‌های روی گوشی:</strong>
            <span className="block text-[10px] text-slate-400">ارسال نوتیفیکیشن هنگام ثبت جایزه توسط پارتنر</span>
          </div>
          <button 
            onClick={handleEnablePush}
            className="text-[11px] font-bold bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-xl shadow-sm transition-all"
          >
            فعال‌سازی 📲
          </button>
        </div>

        
        <div className="overflow-y-auto flex-1 space-y-2.5 pr-1 pl-1">
          {notifications.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-6">اعلان جدیدی وجود ندارد.</p>
          ) : (
            notifications.map(n => (
              <div 
                key={n.id} 
                className={`p-3.5 rounded-2xl border transition-all text-xs space-y-1 ${
                  n.unread 
                    ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 shadow-sm' 
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    {n.type === 'reward' && <Gift className="w-3.5 h-3.5 text-amber-500" />}
                    {n.type === 'deadline' && <Clock className="w-3.5 h-3.5 text-rose-500" />}
                    {n.type === 'delivered' && <Sparkles className="w-3.5 h-3.5 text-emerald-500" />}
                    {n.type === 'veto' && <ShieldAlert className="w-3.5 h-3.5 text-purpleLove-500" />}
                    <span>{n.title}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">{n.date}</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {n.message}
                </p>
              </div>
            ))
          )}
        </div>

        
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center flex-shrink-0">
          <button 
            onClick={markNotificationsAsRead}
            className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-4 h-4" />
            <span>علامت‌گذاری همه به عنوان خوانده شده</span>
          </button>
          <button 
            onClick={onClose}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-xs font-bold"
          >
            بستن
          </button>
        </div>

      </div>
    </div>
  );
};
