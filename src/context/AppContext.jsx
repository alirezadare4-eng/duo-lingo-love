import React, { createContext, useContext, useState, useEffect } from 'react';
import { STAGES } from '../data/stages';
import { syncStateToCloud, listenToCloudSync } from '../firebase';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const INITIAL_STATE = {
  currentUser: 'ali', // 'ali' or 'fatemeh'
  partnerName: 'fatemeh',
  darkMode: false,
  soundEnabled: true,
  anniversaryDate: '2024-03-20', // Default anniversary date (قابل تغییر)
  vetoUsed: {
    ali: false,
    fatemeh: false
  },
  winStreak: {
    lastWinner: null,
    count: 0
  },
  scores: {
    ali: { 1: 85, 2: 90 },
    fatemeh: { 1: 100, 2: 95 }
  },
  unlockedStages: {
    ali: 2,
    fatemeh: 2
  },
  flashcardMastery: {}, // { stageId: { cardId: true/false } }
  rewardsVault: [
    {
      id: 'rw-1',
      stageId: 1,
      winner: 'fatemeh',
      loser: 'ali',
      title: 'آماده کردن صبحانه اختصاصی با قهوه و یک شاخه گل در تخت',
      isSecret: false,
      status: 'confirmed', // confirmed, delivered, pending, vetoed
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      deadline: new Date(Date.now() + 4 * 86400000).toISOString(),
      isDouble: false,
      isVetoed: false
    },
    {
      id: 'rw-2',
      stageId: 2,
      winner: 'fatemeh',
      loser: 'ali',
      title: 'ماساژ ۴۰ دقیقه‌ای شانه و گردن بعد از یک روز خسته‌کننده',
      isSecret: false,
      status: 'pending',
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      deadline: new Date(Date.now() + 6 * 86400000).toISOString(),
      isDouble: true,
      isVetoed: false
    }
  ],
  couplePhotos: [
    {
      id: 'p1',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
      captionFa: 'اولین سفر دونفره‌مان؛ جایی که قول دادیم با هم رشد کنیم.',
      captionEn: 'Our first trip together; where we promised to grow hand in hand.',
      date: '۱۴۰۳/۰۴/۱۵'
    },
    {
      id: 'p2',
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
      captionFa: 'غروب پاییزی و صحبت درباره رویاهای آینده.',
      captionEn: 'Autumn sunset, dreaming about our future in English.',
      date: '۱۴۰۳/۰۷/۲۲'
    }
  ],
  notifications: [
    {
      id: 'n1',
      title: 'جایزه جدید ثبت شد 🎁',
      message: 'سارا/فاطمه جایزه مرحله ۲ را تعیین کرد: ماساژ ۴۰ دقیقه.',
      date: 'دیروز',
      unread: true,
      type: 'reward'
    },
    {
      id: 'n2',
      title: 'مهلت جایزه نزدیک است! ⏳',
      message: '۶ روز تا پایان مهلت اهدای جایزه مرحله ۲ باقی مانده است.',
      date: 'امروز',
      unread: true,
      type: 'deadline'
    }
  ]
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem('duolove_full_state');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading stored state:', e);
    }
    return INITIAL_STATE;
  });

  // Dark mode effect
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // Sync to Cloud / Local Storage on changes
  useEffect(() => {
    try {
      localStorage.setItem('duolove_full_state', JSON.stringify(state));
      syncStateToCloud(state);
    } catch (e) {
      console.warn('Sync error', e);
    }
  }, [state]);

  // Listen to remote changes from partner
  useEffect(() => {
    const unsubscribe = listenToCloudSync((remoteState) => {
      if (remoteState && typeof remoteState === 'object') {
        setState((prev) => ({
          ...prev,
          ...remoteState,
          currentUser: prev.currentUser // Preserve who is viewing this device
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Actions
  const switchUser = (user) => {
    setState((prev) => ({
      ...prev,
      currentUser: user,
      partnerName: user === 'ali' ? 'fatemeh' : 'ali'
    }));
  };

  const toggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const toggleSound = () => {
    setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const speak = (text) => {
    if (!state.soundEnabled) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.82;
      window.speechSynthesis.speak(utterance);
    }
  };

  const recordExamScore = ({ stageId, user, score }) => {
    setState((prev) => {
      const updatedScores = {
        ...prev.scores,
        [user]: {
          ...(prev.scores[user] || {}),
          [stageId]: score
        }
      };

      // Check if unlocked
      const currentUnlocked = prev.unlockedStages[user] || 1;
      const nextUnlocked = Math.max(currentUnlocked, stageId + 1);
      const updatedUnlocked = {
        ...prev.unlockedStages,
        [user]: nextUnlocked
      };

      return {
        ...prev,
        scores: updatedScores,
        unlockedStages: updatedUnlocked
      };
    });
  };

  const addReward = ({ stageId, winner, loser, title, isSecret }) => {
    setState((prev) => {
      // Check win streak
      let streakCount = 1;
      let isDouble = false;
      if (prev.winStreak.lastWinner === winner) {
        streakCount = prev.winStreak.count + 1;
        if (streakCount >= 2) {
          isDouble = true;
        }
      }

      const newReward = {
        id: 'rw-' + Date.now(),
        stageId,
        winner,
        loser,
        title,
        isSecret: Boolean(isSecret),
        status: 'pending',
        createdAt: new Date().toISOString(),
        deadline: new Date(Date.now() + 7 * 86400000).toISOString(),
        isDouble,
        isVetoed: false
      };

      // Add Notification
      const winnerName = winner === 'ali' ? 'علی' : 'فاطمه';
      const newNotif = {
        id: 'n-' + Date.now(),
        title: isDouble ? 'جایزه ۲ برابری جدید! 🎁🔥' : 'جایزه جدید ثبت شد 🎁',
        message: `${winnerName} جایزه مرحله ${stageId} را تعیین کرد: ${isSecret ? '🔒 جایزه مخفی است!' : title}`,
        date: 'هم‌اکنون',
        unread: true,
        type: 'reward'
      };

      // Confetti explosion
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      return {
        ...prev,
        rewardsVault: [newReward, ...prev.rewardsVault],
        winStreak: {
          lastWinner: winner,
          count: streakCount
        },
        notifications: [newNotif, ...prev.notifications]
      };
    });
  };

  const deliverReward = (rewardId) => {
    setState((prev) => {
      const updated = prev.rewardsVault.map((rw) => {
        if (rw.id === rewardId) {
          return { ...rw, status: 'delivered', deliveredAt: new Date().toISOString() };
        }
        return rw;
      });

      const rw = prev.rewardsVault.find((r) => r.id === rewardId);
      const loserName = rw?.loser === 'ali' ? 'علی' : 'فاطمه';
      const newNotif = {
        id: 'n-' + Date.now(),
        title: 'جایزه اهدا شد! 💌',
        message: `${loserName} اعلام کرد که جایزه را اهدا کرد. لطفاً تایید دریافت کنید!`,
        date: 'هم‌اکنون',
        unread: true,
        type: 'delivered'
      };

      return {
        ...prev,
        rewardsVault: updated,
        notifications: [newNotif, ...prev.notifications]
      };
    });
  };

  const confirmReward = (rewardId) => {
    setState((prev) => {
      const updated = prev.rewardsVault.map((rw) => {
        if (rw.id === rewardId) {
          return { ...rw, status: 'confirmed', confirmedAt: new Date().toISOString() };
        }
        return rw;
      });

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          colors: ['#f43f5e', '#a855f7', '#fbbf24']
        });
      } catch (e) {}

      return {
        ...prev,
        rewardsVault: updated
      };
    });
  };

  const useVeto = (rewardId, user) => {
    setState((prev) => {
      if (prev.vetoUsed[user]) {
        alert('شما قبلاً از یک بار حق وتوی خود استفاده کرده‌اید!');
        return prev;
      }

      const updated = prev.rewardsVault.map((rw) => {
        if (rw.id === rewardId) {
          return { ...rw, isVetoed: true, status: 'vetoed' };
        }
        return rw;
      });

      const userName = user === 'ali' ? 'علی' : 'فاطمه';
      const newNotif = {
        id: 'n-' + Date.now(),
        title: 'یک جایزه وتو شد! 🛡️',
        message: `${userName} از حق وتوی خود استفاده کرد و یک جایزه را باطل نمود.`,
        date: 'هم‌اکنون',
        unread: true,
        type: 'veto'
      };

      return {
        ...prev,
        vetoUsed: {
          ...prev.vetoUsed,
          [user]: true
        },
        rewardsVault: updated,
        notifications: [newNotif, ...prev.notifications]
      };
    });
  };

  const markNotificationsAsRead = () => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, unread: false }))
    }));
  };

  const addPhoto = (newPhoto) => {
    setState((prev) => ({
      ...prev,
      couplePhotos: [newPhoto, ...prev.couplePhotos]
    }));
  };

  const updateAnniversaryDate = (newDate) => {
    setState((prev) => ({ ...prev, anniversaryDate: newDate }));
  };

  // Calculate days together
  const calculateDaysTogether = () => {
    try {
      const start = new Date(state.anniversaryDate);
      const now = new Date();
      const diffTime = Math.abs(now - start);
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    } catch (e) {
      return 365;
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        switchUser,
        toggleDarkMode,
        toggleSound,
        speak,
        recordExamScore,
        addReward,
        deliverReward,
        confirmReward,
        useVeto,
        markNotificationsAsRead,
        addPhoto,
        updateAnniversaryDate,
        calculateDaysTogether
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

