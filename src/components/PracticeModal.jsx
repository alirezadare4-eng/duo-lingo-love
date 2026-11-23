import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export const PracticeModal = ({ stage, onClose, onFinish }) => {
  const { speak } = useApp();
  const practiceList = stage?.practice || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userSelectedChips, setUserSelectedChips] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null); // { isCorrect: bool, text: string }

  if (!stage || practiceList.length === 0) return null;

  const currentItem = practiceList[currentIdx];

  const handleChipClick = (word) => {
    setUserSelectedChips(prev => [...prev, word]);
  };

  const handleRemoveChip = (index) => {
    setUserSelectedChips(prev => prev.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    let isCorrect = false;

    if (currentItem.type === 'arrange') {
      const built = userSelectedChips.join(" ");
      const target = currentItem.answer.join(" ");
      isCorrect = built === target;
    } else {
      isCorrect = selectedOption === currentItem.answer;
    }

    if (isCorrect) {
      setFeedback({ isCorrect: true, text: 'آفرین! کاملاً درسته 🎉' });
      if (currentItem.audioText) speak(currentItem.audioText);
    } else {
      setFeedback({ isCorrect: false, text: 'اشتباه بود! یکبار دیگه تلاش کن ❤️' });
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setUserSelectedChips([]);
    setSelectedOption(null);

    if (currentIdx < practiceList.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-purpleLove-200 dark:border-slate-800 space-y-5">
        
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                کارگاه تمرین تعاملی مرحله {stage.id}
              </h3>
              <span className="text-[11px] text-slate-400">تمرین {currentIdx + 1} از {practiceList.length}</span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center text-sm">✕</button>
        </div>

        
        <div className="space-y-4">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
            {currentItem.prompt}
          </p>

          
          {currentItem.audioText && (
            <div className="flex justify-center">
              <button 
                onClick={() => speak(currentItem.audioText)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purpleLove-600 to-indigo-600 hover:from-purpleLove-700 text-white font-bold text-xs shadow-md shadow-purpleLove-500/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>پخش فایل صوتی تمرین 🔊</span>
              </button>
            </div>
          )}

          
          {currentItem.type === 'arrange' && (
            <div className="space-y-3">
              
              <div className="min-h-[50px] p-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center gap-2 flex-wrap">
                {userSelectedChips.length === 0 ? (
                  <span className="text-xs text-slate-400">روی کلمات زیر کلیک کنید تا جمله ساخته شود...</span>
                ) : (
                  userSelectedChips.map((word, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleRemoveChip(idx)}
                      className="font-en text-xs font-bold bg-purpleLove-100 dark:bg-purpleLove-950 text-purpleLove-700 dark:text-purpleLove-300 border border-purpleLove-300 dark:border-purpleLove-800 px-3 py-1.5 rounded-xl hover:bg-rose-100 transition-all"
                    >
                      {word} ✕
                    </button>
                  ))
                )}
              </div>

              
              <div className="flex justify-center gap-2 flex-wrap pt-2">
                {currentItem.chips.map((chip, idx) => {
                  const usedCount = userSelectedChips.filter(w => w === chip).length;
                  const totalCount = currentItem.chips.filter(w => w === chip).length;
                  const isExhausted = usedCount >= totalCount;

                  return (
                    <button 
                      key={idx}
                      disabled={isExhausted}
                      onClick={() => handleChipClick(chip)}
                      className={`font-en text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${
                        isExhausted 
                          ? 'opacity-30 cursor-not-allowed bg-slate-100 dark:bg-slate-800' 
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:border-purpleLove-400'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          
          {currentItem.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
              {currentItem.options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedOption(opt)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedOption === opt 
                      ? 'border-2 border-purpleLove-500 bg-purpleLove-50 dark:bg-purpleLove-950/60 text-purpleLove-700 dark:text-purpleLove-300 font-bold' 
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          
          {feedback && (
            <div className={`p-3 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5 ${
              feedback.isCorrect ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
            }`}>
              {feedback.isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              <span>{feedback.text}</span>
            </div>
          )}
        </div>

        
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between gap-3">
          {!feedback?.isCorrect ? (
            <button 
              onClick={checkAnswer}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs py-3 rounded-xl shadow-md transition-all"
            >
              بررسی پاسخ ✓
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{currentIdx < practiceList.length - 1 ? 'تمرین بعدی ←' : 'تکمیل تمرینات و آمادگی آزمون 🎉'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
