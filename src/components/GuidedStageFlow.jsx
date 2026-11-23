import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Volume2, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Heart, 
  CheckCircle, 
  Clock, 
  Gift, 
  Trophy, 
  Send,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const GuidedStageFlow = ({ stage, onClose, onStageCompleted }) => {
  const { 
    speak, 
    currentUser, 
    partnerName, 
    scores, 
    recordExamScore, 
    addReward 
  } = useApp();

  // Steps: 1 = Lesson, 2 = Flashcards, 3 = Practice, 4 = Exam, 5 = Reward Form
  const [currentStep, setCurrentStep] = useState(1);

  // Flashcards state
  const cards = stage?.flashcards || [];
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Practice state
  const practices = stage?.practice || [];
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [practiceSelectedOpt, setPracticeSelectedOpt] = useState(null);
  const [practiceChips, setPracticeChips] = useState([]);
  const [practiceFeedback, setPracticeFeedback] = useState(null);

  // Exam state
  const exam = stage?.exam;
  const questions = exam?.questions || [];
  const [examQIdx, setExamQIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [examChips, setExamChips] = useState([]);
  const [examTimer, setExamTimer] = useState(exam?.timeLimitSeconds || 120);
  const [examFinished, setExamFinished] = useState(false);
  const [myFinalScore, setMyFinalScore] = useState(0);

  // Reward state
  const [prizeText, setPrizeText] = useState('');
  const [isSecret, setIsSecret] = useState(false);

  // Timer
  useEffect(() => {
    if (currentStep !== 4 || examFinished) return;
    const t = setInterval(() => {
      setExamTimer(prev => {
        if (prev <= 1) {
          clearInterval(t);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [currentStep, examFinished]);

  if (!stage) return null;

  // Flashcard Helpers
  const nextCard = () => {
    setIsFlipped(false);
    if (cardIdx < cards.length - 1) {
      setCardIdx(cardIdx + 1);
    } else {
      setCurrentStep(3); // Auto advance to Practice!
    }
  };

  // Practice Helpers
  const currentPractice = practices[practiceIdx];
  const checkPractice = () => {
    let ok = false;
    if (currentPractice.type === 'arrange') {
      ok = practiceChips.join(' ') === currentPractice.answer.join(' ');
    } else {
      ok = practiceSelectedOpt === currentPractice.answer;
    }

    if (ok) {
      setPracticeFeedback({ isCorrect: true, text: 'آفرین! کاملاً درسته 🎉' });
      if (currentPractice.audioText) speak(currentPractice.audioText);
    } else {
      setPracticeFeedback({ isCorrect: false, text: 'اشتباه بود! یکبار دیگه تلاش کن ❤️' });
    }
  };

  const nextPractice = () => {
    setPracticeFeedback(null);
    setPracticeSelectedOpt(null);
    setPracticeChips([]);
    if (practiceIdx < practices.length - 1) {
      setPracticeIdx(practiceIdx + 1);
    } else {
      setCurrentStep(4); // Auto advance to Exam!
    }
  };

  // Exam Helpers
  const currentExamQ = questions[examQIdx];
  const nextExamQ = () => {
    if (currentExamQ.type === 'arrange') {
      setExamAnswers(prev => ({ ...prev, [currentExamQ.id]: examChips }));
      setExamChips([]);
    }

    if (examQIdx < questions.length - 1) {
      setExamQIdx(examQIdx + 1);
    } else {
      handleFinishExam();
    }
  };

  const handleFinishExam = () => {
    let score = 0;
    questions.forEach(q => {
      const a = examAnswers[q.id];
      if (q.type === 'arrange') {
        const built = Array.isArray(a) ? a.join(' ') : (examChips.join(' ') || '');
        if (built === q.answer.join(' ')) score += q.points;
      } else {
        if (a === q.answer) score += q.points;
      }
    });

    setMyFinalScore(score);
    setExamFinished(true);
    recordExamScore({ stageId: stage.id, user: currentUser, score });

    try {
      confetti({ particleCount: 90, spread: 70 });
    } catch (e) {}
  };

  // Submit Prize
  const handleRewardSubmit = (e) => {
    e.preventDefault();
    if (!prizeText.trim()) return;

    addReward({
      stageId: stage.id,
      winner: currentUser,
      loser: partnerName,
      title: prizeText.trim(),
      isSecret
    });

    onStageCompleted();
    onClose();
  };

  // Step Titles
  const stepTitles = [
    { num: 1, label: 'درس کوتاه', icon: '📖' },
    { num: 2, label: 'فلش‌کارت', icon: '🗂️' },
    { num: 3, label: 'تمرین', icon: '✏️' },
    { num: 4, label: 'آزمون ۱۰۰ نمره‌ای', icon: '🏆' },
    { num: 5, label: 'جایزه برنده', icon: '🎁' }
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-5 md:p-6 shadow-2xl border-2 border-rose-300 dark:border-rose-900/60 space-y-5 my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header & Stage Stepper */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex-shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{stage.icon}</span>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>مرحله {stage.id}: {stage.titleFa}</span>
                  <span className="text-[10px] text-rose-500 font-bold">({stage.city})</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-en">{stage.titleEn}</span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex items-center justify-center text-sm">✕</button>
          </div>

          {/* Guided Step Progress Bar */}
          <div className="flex items-center justify-between gap-1 text-[11px] font-bold">
            {stepTitles.map(st => (
              <div 
                key={st.num} 
                className={`flex-1 py-1.5 px-1 rounded-xl text-center border transition-all ${
                  currentStep === st.num 
                    ? 'bg-rose-500 text-white border-rose-600 shadow-sm' 
                    : currentStep > st.num 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-300 dark:border-emerald-800' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{st.icon} {st.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: SHORT LESSON */}
        {currentStep === 1 && (
          <div className="overflow-y-auto flex-1 space-y-4 pr-1 text-xs">
            <div className="p-3.5 bg-rose-50/70 dark:bg-slate-800 rounded-2xl border border-rose-200/80 dark:border-slate-700 leading-relaxed text-slate-700 dark:text-slate-300">
              {stage.lesson.intro}
            </div>

            <div className="space-y-1.5">
              <strong className="text-slate-900 dark:text-white block">نکات کلیدی این مرحله:</strong>
              {stage.lesson.keyPoints.map((pt, i) => (
                <div key={i} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="text-rose-500 font-bold">✓</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <strong className="text-slate-900 dark:text-white block">واژگان با تلفظ صوتی:</strong>
              <div className="grid grid-cols-2 gap-2">
                {stage.lesson.vocabulary.map((v, i) => (
                  <div key={i} className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                    <div>
                      <strong className="font-en text-slate-900 dark:text-white block">{v.en}</strong>
                      <span className="text-slate-500 text-[11px]">{v.fa}</span>
                    </div>
                    <button onClick={() => speak(v.en)} className="text-rose-500 p-1 hover:bg-rose-50 rounded-lg">🔊</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-850 rounded-2xl border border-rose-200 dark:border-rose-900/60">
              <span className="text-[10px] font-bold text-rose-500 block">مثال اختصاصی درباره من و فاطمه:</span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">{stage.lesson.personalExample}</p>
            </div>
          </div>
        )}

        {/* STEP 2: FLASHCARDS */}
        {currentStep === 2 && (
          <div className="overflow-y-auto flex-1 space-y-4 pr-1 text-center text-xs">
            <span className="text-[11px] text-slate-400 font-bold block">فلش‌کارت {cardIdx + 1} از {cards.length}</span>

            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="cursor-pointer min-h-[180px] p-6 rounded-3xl bg-gradient-to-b from-indigo-50/50 via-white to-pink-50/30 dark:from-slate-800 dark:to-slate-850 border-2 border-dashed border-indigo-300 dark:border-slate-700 shadow-md flex flex-col items-center justify-center space-y-2"
            >
              {!isFlipped ? (
                <>
                  <span className="text-[10px] text-indigo-500 font-bold block">English</span>
                  <div className="font-en text-3xl font-extrabold text-slate-900 dark:text-white">{cards[cardIdx]?.front}</div>
                  <div className="font-en text-xs text-slate-400 font-mono">{cards[cardIdx]?.ipa}</div>
                  <button onClick={(e) => { e.stopPropagation(); speak(cards[cardIdx]?.front); }} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">🔊 پخش صدا</button>
                  <span className="text-[10px] text-slate-400 pt-2 block">کلیک کنید تا معنی و مثال را ببینید ↻</span>
                </>
              ) : (
                <>
                  <span className="text-[10px] text-rose-500 font-bold block">فارسی و مثال</span>
                  <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400">{cards[cardIdx]?.back}</div>
                  <div className="font-en text-xs text-slate-600 dark:text-slate-300 italic">"{cards[cardIdx]?.example}"</div>
                  <span className="text-[10px] text-slate-400 pt-2 block">کلیک برای چرخش مجدد ↻</span>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button onClick={nextCard} className="py-2.5 bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-amber-400 font-bold rounded-xl border border-amber-200">نیاز به مرور ↻</button>
              <button onClick={nextCard} className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md">کاملاً بلدم ✓</button>
            </div>
          </div>
        )}

        {/* STEP 3: PRACTICE */}
        {currentStep === 3 && (
          <div className="overflow-y-auto flex-1 space-y-4 pr-1 text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold">
              <span>تمرین {practiceIdx + 1} از {practices.length}</span>
              <span>نوع: {currentPractice?.type === 'arrange' ? 'مرتب‌سازی جمله' : 'تستی / شنیداری'}</span>
            </div>

            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{currentPractice?.prompt}</p>

            {currentPractice?.audioText && (
              <div className="text-center">
                <button onClick={() => speak(currentPractice.audioText)} className="px-4 py-2 bg-purpleLove-600 text-white rounded-xl text-xs font-bold shadow-md">
                  🔊 پخش صوت تمرین
                </button>
              </div>
            )}

            {currentPractice?.type === 'arrange' && (
              <div className="space-y-2">
                <div className="min-h-[45px] p-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center gap-1.5 flex-wrap">
                  {practiceChips.length === 0 ? (
                    <span className="text-slate-400">کلمات زیر را انتخاب کنید...</span>
                  ) : (
                    practiceChips.map((c, i) => (
                      <button key={i} onClick={() => setPracticeChips(prev => prev.filter((_, idx) => idx !== i))} className="font-en text-xs font-bold bg-white dark:bg-slate-900 text-purpleLove-600 border border-purpleLove-200 px-2.5 py-1 rounded-lg">
                        {c} ✕
                      </button>
                    ))
                  )}
                </div>

                <div className="flex justify-center gap-1.5 flex-wrap pt-1">
                  {currentPractice.chips.map((chip, i) => (
                    <button key={i} onClick={() => setPracticeChips(prev => [...prev, chip])} className="font-en text-xs font-bold px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentPractice?.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentPractice.options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => setPracticeSelectedOpt(opt)}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      practiceSelectedOpt === opt 
                        ? 'border-2 border-purpleLove-500 bg-purpleLove-50 text-purpleLove-700' 
                        : 'border-slate-200 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {practiceFeedback && (
              <div className={`p-3 rounded-xl text-center font-bold ${practiceFeedback.isCorrect ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
                {practiceFeedback.text}
              </div>
            )}

            <div className="pt-2">
              {!practiceFeedback?.isCorrect ? (
                <button onClick={checkPractice} className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl">بررسی پاسخ ✓</button>
              ) : (
                <button onClick={nextPractice} className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl">تمرین بعدی ←</button>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: EXAM */}
        {currentStep === 4 && (
          <div className="overflow-y-auto flex-1 space-y-4 pr-1 text-xs">
            {!examFinished ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-500">سوال {examQIdx + 1} از {questions.length}</span>
                  <span className="font-en font-black text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">
                    {Math.floor(examTimer / 60)}:{(examTimer % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-relaxed">
                  {currentExamQ?.question}
                </h4>

                {currentExamQ?.audioText && (
                  <div className="text-center py-1">
                    <button onClick={() => speak(currentExamQ.audioText)} className="px-4 py-2 bg-rose-500 text-white font-bold rounded-xl shadow-md">
                      🔊 شنیدن سوال صوتی
                    </button>
                  </div>
                )}

                {currentExamQ?.type === 'arrange' && (
                  <div className="space-y-2">
                    <div className="min-h-[45px] p-2.5 rounded-xl border-2 border-dashed border-rose-300 bg-rose-50/40 flex items-center justify-center gap-1.5 flex-wrap">
                      {examChips.length === 0 ? (
                        <span className="text-slate-400">کلمات را مرتب کنید...</span>
                      ) : (
                        examChips.map((c, i) => (
                          <button key={i} onClick={() => setExamChips(prev => prev.filter((_, idx) => idx !== i))} className="font-en text-xs font-bold bg-white text-rose-600 border border-rose-200 px-2.5 py-1 rounded-lg">
                            {c} ✕
                          </button>
                        ))
                      )}
                    </div>

                    <div className="flex justify-center gap-1.5 flex-wrap pt-1">
                      {currentExamQ.chips.map((chip, i) => (
                        <button key={i} onClick={() => setExamChips(prev => [...prev, chip])} className="font-en text-xs font-bold px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentExamQ?.options && (
                  <div className="grid grid-cols-1 gap-2">
                    {currentExamQ.options.map((opt, i) => (
                      <button 
                        key={i} 
                        onClick={() => setExamAnswers(prev => ({ ...prev, [currentExamQ.id]: i }))}
                        className={`p-3 rounded-xl border text-right font-bold transition-all ${
                          examAnswers[currentExamQ.id] === i ? 'border-2 border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                <button onClick={nextExamQ} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl shadow-md">
                  {examQIdx < questions.length - 1 ? 'سوال بعدی ←' : 'محاسبه نتیجه نهایی آزمون 🏁'}
                </button>
              </>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="text-4xl animate-bounce">👑🎉</div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">آزمون ۱۰۰ نمره‌ای مرحله به پایان رسید!</h3>
                <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 max-w-xs mx-auto">
                  <span className="text-xs text-slate-500 block">نمره شما ({currentUser === 'ali' ? 'علی' : 'فاطمه'}):</span>
                  <div className="font-en text-3xl font-black text-rose-600 mt-1">{myFinalScore} / 100</div>
                </div>
                <p className="text-xs text-amber-800 font-bold bg-amber-50 p-3 rounded-xl border border-amber-200">
                  شما برنده شدید! حق تعیین جایزه دلخواه برای شماست 🎁
                </p>
                <button onClick={() => setCurrentStep(5)} className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-3.5 rounded-xl shadow-md">
                  ورود به فرم تعیین جایزه من 💌
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: PRIZE DECREE FORM */}
        {currentStep === 5 && (
          <form onSubmit={handleRewardSubmit} className="overflow-y-auto flex-1 space-y-3.5 pr-1 text-xs">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <strong className="text-xs text-amber-900 block font-bold">فرم «جایزه‌ام این است که...»</strong>
              <p className="text-[11px] text-amber-800">
                هر جایزه‌ای که دلت می‌خواهد را بنویس تا طرف مقابل موظف به انجام آن شود.
              </p>
            </div>

            <textarea 
              rows={3} 
              required
              placeholder="مثلاً: فردا شب پیتزای دست‌پخت خودت با فیلم مورد علاقه‌ام، یا یک ماساژ کامل..." 
              value={prizeText} 
              onChange={(e) => setPrizeText(e.target.value)} 
              className="w-full p-3 rounded-xl border border-amber-300 bg-amber-50/30 text-slate-900 outline-none"
            />

            <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer font-bold">
              <input type="checkbox" checked={isSecret} onChange={(e) => setIsSecret(e.target.checked)} className="accent-rose-500" />
              <span>این جایزه به عنوان سوپرایز مخفی بماند 🔒</span>
            </label>

            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg">
              صدور حکم جایزه، قفل‌گشایی مرحله بعد و بازگشت به نقشه 🚀
            </button>
          </form>
        )}

        {/* BOTTOM MASTER BUTTON TO ADVANCE LESSON -> FLASHCARDS */}
        {currentStep === 1 && (
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
            <span className="text-[11px] text-slate-400">بخش ۱ از ۴ تکمیل شد</span>
            <button 
              onClick={() => setCurrentStep(2)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>گام بعدی: فلش‌کارت‌های لایتنر</span>
              <span>←</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

