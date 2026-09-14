import { useBirthdayProgress } from './hooks/useBirthdayProgress';
import { useAudio } from './hooks/useAudio';
import { BackgroundStars } from './components/BackgroundStars';
import { ProgressIndicator } from './components/ProgressIndicator';
import { AudioPlayer } from './components/AudioPlayer';
import { SectionTransition } from './components/SectionTransition';

// Chapters
import { Chapter01Opening } from './chapters/Chapter01Opening';
import { Chapter02Countdown } from './chapters/Chapter02Countdown';
import { Chapter03IntroMessage } from './chapters/Chapter03IntroMessage';
import { Chapter04Memories } from './chapters/Chapter04Memories';
import { Chapter05QuizGame } from './chapters/Chapter05QuizGame';
import { Chapter06MemoryGame } from './chapters/Chapter06MemoryGame';
import { Chapter08FunnyMoment } from './chapters/Chapter08FunnyMoment';
import { Chapter09SpecialPhoto } from './chapters/Chapter09SpecialPhoto';
import { Chapter10LoveLetter } from './chapters/Chapter10LoveLetter';
import { Chapter11Emotional } from './chapters/Chapter11Emotional';
import { Chapter12Timeline } from './chapters/Chapter12Timeline';
import { Chapter13FinalLock } from './chapters/Chapter13FinalLock';
import { Chapter14FinalSurprise } from './chapters/Chapter14FinalSurprise';
import { Chapter15FinalLetter } from './chapters/Chapter15FinalLetter';

function App() {
  const {
    currentChapter,
    highestUnlocked,
    totalChapters,
    nextChapter,
    prevChapter,
    goToChapter,
    resetProgress,
  } = useBirthdayProgress();

  const audioHook = useAudio();

  const renderActiveChapter = () => {
    switch (currentChapter) {
      case 0:
        return <Chapter01Opening onNext={nextChapter} audioHook={audioHook} />;
      case 1:
        return <Chapter02Countdown onNext={nextChapter} />;
      case 2:
        return <Chapter03IntroMessage onNext={nextChapter} />;
      case 3:
        return <Chapter04Memories onNext={nextChapter} />;
      case 4:
        return <Chapter05QuizGame onNext={nextChapter} />;
      case 5:
        return <Chapter06MemoryGame onNext={nextChapter} />;
      case 6:
        return <Chapter08FunnyMoment onNext={nextChapter} />;
      case 7:
        return <Chapter09SpecialPhoto onNext={nextChapter} />;
      case 8:
        return <Chapter10LoveLetter onNext={nextChapter} />;
      case 9:
        return <Chapter11Emotional onNext={nextChapter} />;
      case 10:
        return <Chapter12Timeline onNext={nextChapter} />;
      case 11:
        return <Chapter13FinalLock onNext={nextChapter} />;
      case 12:
        return <Chapter14FinalSurprise onNext={nextChapter} />;
      case 13:
        return <Chapter15FinalLetter onRestart={resetProgress} />;
      default:
        return <Chapter01Opening onNext={nextChapter} audioHook={audioHook} />;
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#030b1e] text-slate-100">
      {/* Dreamy Twinkling Stars & Ambient Glow Background */}
      <BackgroundStars />

      {/* Floating Audio Player (Top Right) - Plays music automatically on access */}
      <AudioPlayer audioHook={audioHook} isVisible={true} />

      {/* Main Chapter Journey Display with smooth transitions */}
      <div className="flex-1 flex items-center justify-center w-full z-10 py-6 sm:py-10">
        <SectionTransition chapterKey={currentChapter}>
          {renderActiveChapter()}
        </SectionTransition>
      </div>

      {/* Floating Bottom Journey Progress Indicator */}
      <ProgressIndicator
        currentChapter={currentChapter}
        totalChapters={totalChapters}
        highestUnlocked={highestUnlocked}
        onPrev={prevChapter}
        onNext={nextChapter}
        onSelectChapter={goToChapter}
      />
    </main>
  );
}

export default App;
