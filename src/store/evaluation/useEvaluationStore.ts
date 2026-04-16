import { create } from 'zustand';

interface EvaluationStore {
  completedForms: string[];
  depressionRisk: number; // 0-100
  anxietyRisk: number; // 0-100
  
  markFormCompleted: (formId: string) => void;
  setRisks: (depression: number, anxiety: number) => void;
  clearEvaluations: () => void;
}

export const useEvaluationStore = create<EvaluationStore>((set) => ({
  completedForms: [],
  depressionRisk: 0,
  anxietyRisk: 0,

  markFormCompleted: (formId) => 
    set((state) => {
      if (state.completedForms.includes(formId)) return state;
      return { completedForms: [...state.completedForms, formId] };
    }),

  setRisks: (depression, anxiety) => 
    set({ depressionRisk: depression, anxietyRisk: anxiety }),
    
  clearEvaluations: () => 
    set({ completedForms: [], depressionRisk: 0, anxietyRisk: 0 }),
}));
