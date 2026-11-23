import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Bell, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Gift, 
  Flame, 
  Calendar,
  Smartphone,
  MapPin
} from 'lucide-react';

export const Header = ({ onOpenVault, onOpenNotifs, onOpenAlbum, onOpenMap, onOpenScores }) => {
  const { 
    currentUser, 
    partnerName, 
    switchUser, 
    darkMode, 
    toggleDarkMode, 
    soundEnabled, 
    toggleSound, 
    notifications,
    rewardsVault,
    calculateDaysTogether,
    winStreak
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;
  const pendingRewardsCount = rewardsVault.filter(r => r.status === 'pending').length;
  const daysTogether = calculateDaysTogether();

  return (
    <header className="sticky top-2 z-40 max-w-4xl mx-auto px-3 py-2.5">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-rose-200/80 dark:border-slate-800 rounded-3xl p-3 shadow-lg shadow-rose-500/5 transition-all">
        <div className="flex items-center justify-between gap-2">
          
          
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-purpleLove-600 text-white flex items-center justify-center text-lg shadow-md shadow-rose-500/25 animate-heartbeat flex-shrink-0">
              💖
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-en text-sm font-black tracking-tight text-slate-900 dark:text-white">
                  DuoLove
                </span>
                <span className="text-[10px] bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 font-bold px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                  من و فاطمه
                </span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">آموزش انگلیسی از صفر • ۱۰ مرحله تا قله</p>
            </div>
          </div>

          
          <div className="flex items-center gap-2">
            
            
            <button 
              onClick={onOpenAlbum}
              className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 px-2.5 py-1.5 rounded-xl hover:scale-105 transition-transform"
              title="مشاهده آلبوم و روزشمار عشق"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{daysTogether} روز عشق</span>
            </button>

            
            <div className="relative">
              <button 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-slate-700"
              >
                <span>{currentUser === 'ali' ? '👦 علی' : '👧 فاطمه'}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {showUserDropdown && (
                <div className="absolute left-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-1 z-50 text-xs">
                  <div className="text-[10px] text-slate-400 px-2 py-1 font-bold">انتخاب کاربر فعلی:</div>
                  <button 
                    onClick={() => { switchUser('ali'); setShowUserDropdown(false); }}
                    className={`w-full text-right px-3 py-2 rounded-xl flex items-center justify-between ${currentUser === 'ali' ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 font-bold' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
                  >
                    <span>👦 علی (من)</span>
                    {currentUser === 'ali' && <span>✓</span>}
                  </button>
                  <button 
                    onClick={() => { switchUser('fatemeh'); setShowUserDropdown(false); }}
                    className={`w-full text-right px-3 py-2 rounded-xl flex items-center justify-between ${currentUser === 'fatemeh' ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 font-bold' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
                  >
                    <span>👧 فاطمه</span>
                    {currentUser === 'fatemeh' && <span>✓</span>}
                  </button>
                </div>
              )}
            </div>

            
            <button 
              onClick={onOpenVault}
              className="relative p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:scale-105 active:scale-95 transition-all"
              title="صندوق جوایز و احکام"
            >
              <Gift className="w-4 h-4" />
              {pendingRewardsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-en text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {pendingRewardsCount}
                </span>
              )}
            </button>

            
            <button 
              onClick={onOpenNotifs}
              className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              title="اعلان‌ها"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-en text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              title={darkMode ? "حالت روز" : "حالت شب"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            
            <button 
              onClick={toggleSound}
              className={`p-2 rounded-xl transition-all ${soundEnabled ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
              title={soundEnabled ? "صدای تلفظ فعال است" : "صدا خاموش است"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

          </div>

        </div>

        
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          
          <div className="flex items-center gap-1.5">
            <button 
              onClick={onOpenMap}
              className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-100 flex items-center gap-1 transition-all"
            >
              <MapPin className="w-3 h-3" />
              <span>نقشه سفر مشترک</span>
            </button>
            <button 
              onClick={onOpenAlbum}
              className="px-2.5 py-1 rounded-lg bg-purpleLove-50 dark:bg-purpleLove-950/40 text-purpleLove-600 dark:text-purpleLove-400 font-bold hover:bg-purpleLove-100 flex items-center gap-1 transition-all"
            >
              <Heart className="w-3 h-3" />
              <span>آلبوم و روزشمار</span>
            </button>
            <button 
              onClick={onOpenScores}
              className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold hover:bg-amber-100 flex items-center gap-1 transition-all"
            >
              <span>📊 جدول امتیازات</span>
            </button>
          </div>

          
          {winStreak.count >= 2 && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>برد متوالی {winStreak.count}x (جایزه ۲ برابر!)</span>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
