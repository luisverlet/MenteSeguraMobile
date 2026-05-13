import { create } from 'zustand';

interface EvaluationStore {
  completedForms: string[];
  depressionRisk: number; // 0-100
  anxietyRisk: number; // 0-100
  lastScore: number; // raw PHQ-9 score (0-27)
  lastScorePercent: number; // percentage of max score (0-100)
  
  markFormCompleted: (formId: string) => void;
  setRisks: (depression: number, anxiety: number) => void;
  setLastResult: (score: number, scorePercent: number) => void;
  clearEvaluations: () => void;
}

export const useEvaluationStore = create<EvaluationStore>((set) => ({
  completedForms: [],
  depressionRisk: 0,
  anxietyRisk: 0,
  lastScore: 0,
  lastScorePercent: 0,

  markFormCompleted: (formId) => 
    set((state) => {
      if (state.completedForms.includes(formId)) return state;
      return { completedForms: [...state.completedForms, formId] };
    }),

  setRisks: (depression, anxiety) => 
    set({ depressionRisk: depression, anxietyRisk: anxiety }),

  setLastResult: (score, scorePercent) =>
    set({ lastScore: score, lastScorePercent: scorePercent }),
    
  clearEvaluations: () => 
    set({ completedForms: [], depressionRisk: 0, anxietyRisk: 0, lastScore: 0, lastScorePercent: 0 }),
}));
