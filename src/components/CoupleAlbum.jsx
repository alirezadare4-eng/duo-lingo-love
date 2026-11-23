import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Calendar, Plus, Image as ImageIcon, Sparkles } from 'lucide-react';

export const CoupleAlbum = ({ onClose }) => {
  const { 
    couplePhotos, 
    addPhoto, 
    calculateDaysTogether, 
    anniversaryDate, 
    updateAnniversaryDate 
  } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCapFa, setNewCapFa] = useState('');
  const [newCapEn, setNewCapEn] = useState('');
  const [editDate, setEditDate] = useState(false);
  const [dateInput, setDateInput] = useState(anniversaryDate);

  const daysTogether = calculateDaysTogether();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newUrl) return;
    addPhoto({
      id: 'p-' + Date.now(),
      url: newUrl,
      captionFa: newCapFa || 'یک لحظه قشنگ دونفره',
      captionEn: newCapEn || 'A beautiful moment together in love.',
      date: 'امروز'
    });
    setNewUrl('');
    setNewCapFa('');
    setNewCapEn('');
    setIsAdding(false);
  };

  const handleSaveDate = () => {
    updateAnniversaryDate(dateInput);
    setEditDate(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-5 md:p-6 shadow-2xl border border-rose-200 dark:border-slate-800 space-y-5 my-auto max-h-[90vh] flex flex-col">
        
        
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">📸</span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  آلبوم خاطرات و روزشمار عشق
                </h3>
                <p className="text-xs text-slate-400">ثبت زیباترین لحظات من و فاطمه با زیرنویس‌های انگلیسی</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 flex items-center justify-center text-sm"
            >
              ✕
            </button>
          </div>

          
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purpleLove-600 text-white shadow-lg shadow-rose-500/20 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-rose-100 uppercase tracking-wider block">روزشمار پیوند قلبی</span>
              <div className="text-2xl md:text-3xl font-extrabold flex items-center gap-2 mt-0.5">
                <span>{daysTogether}</span>
                <span className="text-sm font-normal">روز با هم در عشق و آموزش</span>
                <Heart className="w-5 h-5 fill-white animate-pulse" />
              </div>
            </div>

            <div className="text-left">
              {editDate ? (
                <div className="flex items-center gap-1.5 bg-white/20 p-1.5 rounded-xl">
                  <input 
                    type="date" 
                    value={dateInput} 
                    onChange={(e) => setDateInput(e.target.value)}
                    className="text-xs text-slate-900 bg-white rounded-lg px-2 py-1 outline-none"
                  />
                  <button onClick={handleSaveDate} className="text-xs font-bold bg-white text-rose-600 px-2 py-1 rounded-lg">ذخیره</button>
                </div>
              ) : (
                <button 
                  onClick={() => setEditDate(true)}
                  className="text-xs font-bold bg-white/20 hover:bg-white/30 border border-white/30 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>تنظیم تاریخ شروع ({anniversaryDate})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        
        <div className="flex-shrink-0">
          {!isAdding ? (
            <button 
              onClick={() => setIsAdding(true)}
              className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-bold text-xs hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن عکس خاطره‌انگیز جدید با زیرنویس انگلیسی</span>
            </button>
          ) : (
            <form onSubmit={handleAdd} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span>ثبت عکس جدید در آلبوم</span>
                <button type="button" onClick={() => setIsAdding(false)} className="text-slate-400">لغو</button>
              </div>
              <input 
                type="url" 
                placeholder="لینک مستقیم تصویر (URL)..." 
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white outline-none focus:border-rose-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="زیرنویس انگلیسی (English Caption)..." 
                  value={newCapEn}
                  onChange={(e) => setNewCapEn(e.target.value)}
                  className="font-en text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white outline-none"
                />
                <input 
                  type="text" 
                  placeholder="زیرنویس فارسی..." 
                  value={newCapFa}
                  onChange={(e) => setNewCapFa(e.target.value)}
                  className="text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white outline-none"
                />
              </div>
              <button 
                type="submit"
                className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md"
              >
                ثبت در آلبوم 💖
              </button>
            </form>
          )}
        </div>

        
        <div className="overflow-y-auto flex-1 space-y-4 pr-1 pl-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {couplePhotos.map((photo) => (
              <div key={photo.id} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt="خاطره دونفره" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <span className="absolute bottom-2 left-2 text-[10px] bg-slate-900/70 text-white px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {photo.date}
                  </span>
                </div>
                <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <p className="font-en text-xs font-bold text-slate-900 dark:text-white italic">
                    "{photo.captionEn}"
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {photo.captionFa}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
