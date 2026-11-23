import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, Clock, CheckCircle2, AlertTriangle, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExamModal = ({ stage, onClose, onExamFinished }) => {
  const { speak, currentUser, partnerName, scores, recordExamScore } = useApp();
  const exam = stage?.exam;

  const [timeLeft, setTimeLeft] = useState(exam?.timeLimitSeconds || 120);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [arrangeChips, setArrangeChips] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showTieBreaker, setShowTieBreaker] = useState(false);
  const [tieBreakerAnswer, setTieBreakerAnswer] = useState(null);

  const questions = exam?.questions || [];
  const currentQ = questions[currentQIndex];

  // Timer Countdown
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished, userAnswers]);

  if (!stage || !exam) return null;

  const handleSelectOption = (idx) => {
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleArrangeChipClick = (word) => {
    setArrangeChips(prev => [...prev, word]);
  };

  const handleArrangeChipRemove = (index) => {
    setArrangeChips(prev => prev.filter((_, i) => i !== index));
  };

  const handleNextQuestion = () => {
    // If arrange question, store string
    if (currentQ.type === 'arrange') {
      setUserAnswers(prev => ({ ...prev, [currentQ.id]: arrangeChips }));
      setArrangeChips([]);
    }

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      finishExam();
    }
  };

  const finishExam = () => {
    let earnedPoints = 0;

    questions.forEach(q => {
      const userAns = userAnswers[q.id];
      if (q.type === 'arrange') {
        const built = Array.isArray(userAns) ? userAns.join(' ') : (arrangeChips.join(' ') || '');
        const target = q.answer.join(' ');
        if (built === target) earnedPoints += q.points;
      } else {
        if (userAns === q.answer) {
          earnedPoints += q.points;
        }
      }
    });

    setFinalScore(earnedPoints);
    recordExamScore({ stageId: stage.id, user: currentUser, score: earnedPoints });

    // Compare with partner
    const partnerScore = scores[partnerName]?.[stage.id];

    if (partnerScore !== undefined && partnerScore === earnedPoints) {
      // Tie! Trigger tie-breaker
      setShowTieBreaker(true);
    } else {
      setIsFinished(true);
      if (earnedPoints >= (partnerScore || 0)) {
        try {
          confetti({ particleCount: 100, spread: 80 });
        } catch (e) {}
      }
    }
  };

  const handleTieBreakerSubmit = () => {
    const isCorrect = tieBreakerAnswer === exam.tieBreaker.answer;
    const finalBonusScore = finalScore + (isCorrect ? 5 : 0);
    setFinalScore(finalBonusScore);
    recordExamScore({ stageId: stage.id, user: currentUser, score: finalBonusScore });
    setShowTieBreaker(false);
    setIsFinished(true);
  };

  // Partner Score Comparison
  const partnerScore = scores[partnerName]?.[stage.id];
  const isWinner = partnerScore === undefined ? true : finalScore >= partnerScore;
  const isLoser = partnerScore !== undefined && finalScore < partnerScore;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-rose-300 dark:border-rose-900/60 space-y-5 my-auto max-h-[92vh] flex flex-col">
        
        {!isFinished && !showTieBreaker ? (
          
          <>
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">⏱️</span>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    آزمون ۱۰۰ نمره‌ای مرحله {stage.id}
                  </h3>
                  <span className="text-[11px] text-slate-400">سوال {currentQIndex + 1} از {questions.length}</span>
                </div>
              </div>

              
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-en font-black text-xs ${
                timeLeft < 30 ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>

            
            <div className="overflow-y-auto flex-1 space-y-4 pr-1 pl-1 text-xs">
              
              <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold">
                <span>بارم: {currentQ.points} نمره</span>
                <span>نوع: {currentQ.type === 'audio' ? 'شنیداری' : currentQ.type === 'arrange' ? 'مرتب‌کردن' : 'چندگزینه‌ای'}</span>
              </div>

              
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h4>

              
              {currentQ.audioText && (
                <div className="flex justify-center py-2">
                  <button 
                    onClick={() => speak(currentQ.audioText)}
                    className="px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/25 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>شنیدن سوال صوتی 🔊</span>
                  </button>
                </div>
              )}

              
              {currentQ.type === 'arrange' && (
                <div className="space-y-3">
                  <div className="min-h-[50px] p-3 rounded-2xl border-2 border-dashed border-rose-300 dark:border-rose-900 bg-rose-50/40 dark:bg-slate-800 flex items-center justify-center gap-2 flex-wrap">
                    {arrangeChips.length === 0 ? (
                      <span className="text-slate-400">روی کلمات کلیک کنید تا جمله ساخته شود...</span>
                    ) : (
                      arrangeChips.map((chip, idx) => (
                        <button 
                          key={idx}
                          onClick={() => handleArrangeChipRemove(idx)}
                          className="font-en text-xs font-bold bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-slate-700 px-3 py-1.5 rounded-xl shadow-sm hover:bg-rose-100"
                        >
                          {chip} ✕
                        </button>
                      ))
                    )}
                  </div>

                  <div className="flex justify-center gap-2 flex-wrap pt-2">
                    {currentQ.chips.map((chip, idx) => {
                      const countUsed = arrangeChips.filter(c => c === chip).length;
                      const countTotal = currentQ.chips.filter(c => c === chip).length;
                      const isDone = countUsed >= countTotal;
                      return (
                        <button 
                          key={idx}
                          disabled={isDone}
                          onClick={() => handleArrangeChipClick(chip)}
                          className={`font-en text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${
                            isDone 
                              ? 'opacity-30 cursor-not-allowed bg-slate-100 dark:bg-slate-800' 
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:border-rose-400'
                          }`}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              
              {currentQ.options && (
                <div className="grid grid-cols-1 gap-2 pt-2">
                  {currentQ.options.map((opt, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                        userAnswers[currentQ.id] === idx 
                          ? 'border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold' 
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{opt}</span>
                      {userAnswers[currentQ.id] === idx && <CheckCircle2 className="w-4 h-4 text-rose-500" />}
                    </button>
                  ))}
                </div>
              )}

            </div>

            
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between gap-3 flex-shrink-0">
              <button 
                onClick={onClose} 
                className="text-xs text-slate-400 hover:text-slate-600 px-3 py-2"
              >
                انصراف و خروج
              </button>
              <button 
                onClick={handleNextQuestion}
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all"
              >
                {currentQIndex < questions.length - 1 ? 'سوال بعدی ←' : 'ثبت پاسخ‌ها و محاسبه نمره 🏁'}
              </button>
            </div>
          </>
        ) : showTieBreaker ? (
          
          <div className="space-y-4 text-center py-4">
            <span className="text-3xl animate-bounce">⚡🤝</span>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-amber-600">تساوی نمرات! سوال امتیازی طلایی</h3>
              <p className="text-xs text-slate-500">نمره شما و {partnerName === 'ali' ? 'علی' : 'فاطمه'} برابر شد! هر کس این سوال را درست پاسخ دهد برنده نهایی خواهد بود:</p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-slate-800 rounded-2xl border border-amber-200 text-right space-y-3">
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {exam.tieBreaker.question}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {exam.tieBreaker.options.map((opt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setTieBreakerAnswer(idx)}
                    className={`p-3 rounded-xl border text-xs font-bold text-right transition-all ${
                      tieBreakerAnswer === idx ? 'border-2 border-amber-500 bg-amber-100 dark:bg-amber-950 text-amber-800' : 'bg-white dark:bg-slate-900 border-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button 
              disabled={tieBreakerAnswer === null}
              onClick={handleTieBreakerSubmit}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-30 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition-all"
            >
              ثبت پاسخ سوال امتیازی 👑
            </button>
          </div>
        ) : (
          
          <div className="space-y-5 text-center py-2">
            <div className="text-4xl animate-bounce">
              {isWinner ? '👑🎉' : '👏❤️'}
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {isWinner ? 'تبریک! شما برنده این مرحله شدید' : 'خسته نباشی عشقم! رقابت عالی بود'}
              </h3>
              <p className="text-xs text-slate-400">آزمون جامع ۱۰۰ نمره‌ای مرحله {stage.id}</p>
            </div>

            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-rose-50 dark:bg-slate-800 border-2 border-rose-400 rounded-2xl">
                <span className="text-xs font-bold text-slate-500 block">نمره شما ({currentUser === 'ali' ? 'علی' : 'فاطمه'}):</span>
                <div className="font-en text-3xl font-black text-rose-600 mt-1">{finalScore} / 100</div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <span className="text-xs font-bold text-slate-500 block">نمره {partnerName === 'ali' ? 'علی' : 'فاطمه'}:</span>
                <div className="font-en text-3xl font-black text-slate-700 dark:text-slate-300 mt-1">
                  {partnerScore !== undefined ? `${partnerScore} / 100` : 'در انتظار...'}
                </div>
              </div>
            </div>

            
            {isWinner ? (
              <div className="p-4 bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-amber-300 dark:border-amber-900/60 text-xs space-y-2">
                <p className="font-extrabold text-amber-800 dark:text-amber-400 flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  <span>حق تعیین جایزه دلخواه برای شماست!</span>
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  فرم «جایزه‌ام این است که...» را پر کنید تا به عنوان حکم در صندوقچه ثبت شود.
                </p>
                <button 
                  onClick={() => { onClose(); onExamFinished(true); }}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-rose-500/25 transition-all"
                >
                  تعیین جایزه دلخواه من 🎁✨
                </button>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 text-xs space-y-2">
                <p className="font-bold text-slate-700 dark:text-slate-300">
                  {partnerName === 'ali' ? 'علی' : 'فاطمه'} نمره بالاتری کسب کرد و جایزه‌اش را تعیین خواهد کرد!
                </p>
                <button 
                  onClick={onClose}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs py-3 rounded-xl transition-all"
                >
                  بستن و بازگشت به نقشه
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
