import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export interface Lesson {
  id: number;
  title: string;
  unit: number;
  icon: LucideIcon;
  color: string;
  content: ReactNode;
}

export interface VocabItem {
  word: string;
  ipa: string;
  meaning: string;
}

export interface ExerciseItem {
  id: number;
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  unit: number;
}
