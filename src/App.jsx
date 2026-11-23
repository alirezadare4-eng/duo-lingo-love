import React, { useState } from 'react';
import { Header } from './components/Header';
import { StageRoadmap } from './components/StageRoadmap';
import { GuidedStageFlow } from './components/GuidedStageFlow';
import { TravelMap } from './components/TravelMap';
import { LessonModal } from './components/LessonModal';
import { FlashcardsModal } from './components/FlashcardsModal';
import { PracticeModal } from './components/PracticeModal';
import { ExamModal } from './components/ExamModal';
import { RewardModal } from './components/RewardModal';
import { RewardsVault } from './components/RewardsVault';
import { SecretLoveNoteModal } from './components/SecretLoveNoteModal';
import { CoupleAlbum } from './components/CoupleAlbum';
import { ScoreBoard } from './components/ScoreBoard';
import { NotificationsModal } from './components/NotificationsModal';
import { FirebaseSettingsModal } from './components/FirebaseSettingsModal';
import { STAGES } from './data/stages';
import { MapPin, Gift, Heart, BarChart3, Settings } from 'lucide-react';

export const App = () => {
  const [activeModal, setActiveModal] = useState(null); // 'guided' | 'map' | 'album' | 'vault' | 'scores' | 'notifs' | 'firebase' | 'lesson' | 'flashcards' | 'practice' | 'exam' | 'reward' | 'loveNote'
  const [selectedStage, setSelectedStage] = useState(STAGES[0]);

  // Stage action handlers
  const handleStartGuidedStage = (stage) => {
    setSelectedStage(stage);
    setActiveModal('guided');
  };

  const handleOpenLesson = (stage) => {
    setSelectedStage(stage);
    setActiveModal('lesson');
  };

  const handleOpenFlashcards = (stage) => {
    setSelectedStage(stage);
    setActiveModal('flashcards');
  };

  const handleOpenPractice = (stage) => {
    setSelectedStage(stage);
    setActiveModal('practice');
  };

  const handleOpenExam = (stage) => {
    setSelectedStage(stage);
    setActiveModal('exam');
  };

  const handleOpenLoveNote = (stage) => {
    setSelectedStage(stage);
    setActiveModal('loveNote');
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-rose-100 selection:text-rose-600">
      
      
      <Header 
        onOpenVault={() => setActiveModal('vault')}
        onOpenNotifs={() => setActiveModal('notifs')}
        onOpenAlbum={() => setActiveModal('album')}
        onOpenMap={() => setActiveModal('map')}
        onOpenScores={() => setActiveModal('scores')}
      />

      
      <main className="max-w-4xl mx-auto px-4 pt-4">
        <StageRoadmap 
          onStartGuidedStage={handleStartGuidedStage}
          onOpenLesson={handleOpenLesson}
          onOpenFlashcards={handleOpenFlashcards}
          onOpenPractice={handleOpenPractice}
          onOpenExam={handleOpenExam}
          onOpenLoveNote={handleOpenLoveNote}
        />
      </main>

      
      <nav className="fixed bottom-3 inset-x-0 max-w-md mx-auto px-4 z-40">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-rose-200/80 dark:border-slate-800 rounded-3xl p-2 shadow-xl shadow-rose-500/10 flex items-center justify-around text-[10px] font-bold text-slate-600 dark:text-slate-300">
          
          <button 
            onClick={() => setActiveModal('map')}
            className="flex flex-col items-center gap-1 p-2 rounded-2xl hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <MapPin className="w-5 h-5 text-rose-500" />
            <span>نقشه سفر</span>
          </button>

          <button 
            onClick={() => setActiveModal('vault')}
            className="flex flex-col items-center gap-1 p-2 rounded-2xl hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            <Gift className="w-5 h-5 text-amber-500" />
            <span>صندوق جوایز</span>
          </button>

          <button 
            onClick={() => setActiveModal('album')}
            className="flex flex-col items-center gap-1 p-2 rounded-2xl hover:text-purpleLove-600 dark:hover:text-purpleLove-400 transition-colors"
          >
            <Heart className="w-5 h-5 text-purpleLove-500" />
            <span>آلبوم عشق</span>
          </button>

          <button 
            onClick={() => setActiveModal('scores')}
            className="flex flex-col items-center gap-1 p-2 rounded-2xl hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            <span>جدول امتیاز</span>
          </button>

          <button 
            onClick={() => setActiveModal('firebase')}
            className="flex flex-col items-center gap-1 p-2 rounded-2xl hover:text-slate-900 dark:hover:text-white transition-colors"
            title="تنظیمات همگام‌سازی ابری"
          >
            <Settings className="w-5 h-5 text-slate-400" />
            <span>همگام‌سازی</span>
          </button>

        </div>
      </nav>

      

      
      {/* Guided All-in-One Stage Flow */}
      {activeModal === 'guided' && selectedStage && (
        <GuidedStageFlow 
          stage={selectedStage}
          onClose={() => setActiveModal(null)}
          onStageCompleted={() => setActiveModal(null)}
        />
      )}

      {/* Travel Map Modal */}
      {activeModal === 'map' && (
        <TravelMap 
          onClose={() => setActiveModal(null)}
          onSelectStage={(stageId) => {
            const st = STAGES.find(s => s.id === stageId);
            if (st) handleStartGuidedStage(st);
          }}
          onOpenLoveNote={(stage) => handleOpenLoveNote(stage)}
        />
      )}

      {activeModal === 'lesson' && selectedStage && (
        <LessonModal 
          stage={selectedStage}
          onClose={() => setActiveModal(null)}
          onStartFlashcards={() => setActiveModal('flashcards')}
          onStartPractice={() => setActiveModal('practice')}
          onStartExam={() => setActiveModal('exam')}
        />
      )}

      
      {activeModal === 'flashcards' && selectedStage && (
        <FlashcardsModal 
          stage={selectedStage}
          onClose={() => setActiveModal(null)}
          onFinish={() => setActiveModal('practice')}
        />
      )}

      
      {activeModal === 'practice' && selectedStage && (
        <PracticeModal 
          stage={selectedStage}
          onClose={() => setActiveModal(null)}
          onFinish={() => setActiveModal('exam')}
        />
      )}

      
      {activeModal === 'exam' && selectedStage && (
        <ExamModal 
          stage={selectedStage}
          onClose={() => setActiveModal(null)}
          onExamFinished={(won) => {
            if (won) {
              setActiveModal('reward');
            } else {
              setActiveModal(null);
            }
          }}
        />
      )}

      
      {activeModal === 'reward' && selectedStage && (
        <RewardModal 
          stageId={selectedStage.id}
          onClose={() => setActiveModal(null)}
          onRewardSaved={() => setActiveModal('vault')}
        />
      )}

      
      {activeModal === 'vault' && (
        <RewardsVault onClose={() => setActiveModal(null)} />
      )}

      
      {activeModal === 'loveNote' && selectedStage && (
        <SecretLoveNoteModal 
          stage={selectedStage}
          onClose={() => setActiveModal(null)}
        />
      )}

      
      {activeModal === 'album' && (
        <CoupleAlbum onClose={() => setActiveModal(null)} />
      )}

      
      {activeModal === 'scores' && (
        <ScoreBoard onClose={() => setActiveModal(null)} />
      )}

      
      {activeModal === 'notifs' && (
        <NotificationsModal onClose={() => setActiveModal(null)} />
      )}

      
      {activeModal === 'firebase' && (
        <FirebaseSettingsModal onClose={() => setActiveModal(null)} />
      )}

    </div>
  );
};
