import React, { useState } from 'react';
import { getActiveFirebaseConfig, saveFirebaseConfig, isFirebaseConnected } from '../firebase';
import { Key, RefreshCw, CheckCircle, Smartphone } from 'lucide-react';

export const FirebaseSettingsModal = ({ onClose }) => {
  const currentConfig = getActiveFirebaseConfig();
  const [apiKey, setApiKey] = useState(currentConfig.apiKey || '');
  const [authDomain, setAuthDomain] = useState(currentConfig.authDomain || '');
  const [projectId, setProjectId] = useState(currentConfig.projectId || '');
  const [storageBucket, setStorageBucket] = useState(currentConfig.storageBucket || '');
  const [messagingSenderId, setMessagingSenderId] = useState(currentConfig.messagingSenderId || '');
  const [appId, setAppId] = useState(currentConfig.appId || '');

  const handleSave = (e) => {
    e.preventDefault();
    saveFirebaseConfig({
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-rose-200 dark:border-slate-800 space-y-4 max-h-[88vh] flex flex-col">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-500">
              <Key className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                تنظیمات اتصال Firebase و همگام‌سازی بین دو گوشی
              </h3>
              <p className="text-[11px] text-slate-400">همگام‌سازی ابری و آنی تمام درس‌ها و جوایز میان علی و فاطمه</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center text-sm">✕</button>
        </div>

        
        <div className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs flex-shrink-0 ${
          isFirebaseConnected 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300' 
            : 'bg-amber-50 dark:bg-slate-800 border-amber-200 text-amber-800 dark:text-amber-300'
        }`}>
          <Smartphone className="w-5 h-5 flex-shrink-0" />
          <div className="space-y-0.5">
            <strong>وضعیت همگام‌سازی: {isFirebaseConnected ? 'متصل به سرور ابری Firebase (Cloud Firestore)' : 'فعال در حالت محلی / مولتی‌تب (آماده اتصال ابری)'}</strong>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              برنامه هم‌اکنون به صورت کامل و زنده کار می‌کند. برای سینک شدن بین دو گوشی در اینترنت، اطلاعات پروژه Firebase خود را در کادرهای زیر وارد کنید.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="overflow-y-auto flex-1 space-y-3 pr-1 text-xs">
          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">API Key:</label>
            <input 
              type="text" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)} 
              placeholder="AIzaSy..." 
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">Project ID:</label>
              <input 
                type="text" 
                value={projectId} 
                onChange={(e) => setProjectId(e.target.value)} 
                placeholder="my-duo-app" 
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">Auth Domain:</label>
              <input 
                type="text" 
                value={authDomain} 
                onChange={(e) => setAuthDomain(e.target.value)} 
                placeholder="my-duo-app.firebaseapp.com" 
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">Messaging Sender ID:</label>
              <input 
                type="text" 
                value={messagingSenderId} 
                onChange={(e) => setMessagingSenderId(e.target.value)} 
                placeholder="1234567890" 
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">App ID:</label>
              <input 
                type="text" 
                value={appId} 
                onChange={(e) => setAppId(e.target.value)} 
                placeholder="1:123456:web:abcd" 
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none font-mono"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>ذخیره تنظیمات و اتصال به Firebase</span>
          </button>
        </form>

      </div>
    </div>
  );
};
