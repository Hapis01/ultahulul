export interface BirthdayConfig {
  fullName: string;
  nickname: string;
  petName: string;
  age: number;
  birthday: string; // YYYY-MM-DD
  targetDateTime: string; // ISO with timezone
  secretCode: string;
  theme: string;
}

export interface MusicConfig {
  title: string;
  artist?: string;
  file: string;
}

export interface MemoryItem {
  id: number;
  image: string;
  title: string;
  date: string;
  caption: string;
  location?: string;
  story?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  sweetExplanation?: string;
}

export interface QuizScoreFeedback {
  minScore: number;
  maxScore: number;
  title: string;
  message: string;
}

export interface MemoryGameCardItem {
  id: number;
  iconName: 'heart' | 'star' | 'gift' | 'camera' | 'moon' | 'sparkles';
  isSpecial: boolean;
  message: string;
  specialTitle?: string;
  specialPhoto?: string;
  specialNote?: string;
}

export interface FunnySectionData {
  title: string;
  cards: string[];
  question: string;
  yesButtonText: string;
  noButtonTexts: string[];
  finalNoResponse: string;
}

export interface SpecialPhotoData {
  prefaceLines: string[];
  buttonText: string;
  image: string;
  caption: string;
  postRevealLines: string[];
}

export interface TimelineEvent {
  year: string;
  date: string;
  title: string;
  story: string;
  caption: string;
  image?: string;
}

export interface LoveLetterData {
  salutation: string;
  paragraphs: string[];
  signoff: string;
}

export interface EmotionalMomentData {
  introLines: string[];
  thankYouLines: string[];
  photo: string;
  caption: string;
  closingLine: string;
}

export interface FinalSurpriseData {
  congratsTitle: string;
  highlightName: string;
  nickname: string;
  petName: string;
  birthdayDateFormatted: string;
  wishingText: string;
}

export interface FinalLetterData {
  salutation: string;
  paragraphs: string[];
  closing: string;
  stayHereMessage: string;
}
