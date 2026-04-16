import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RiskLevel = "low" | "moderate" | "high" | "critical" | null;

export interface RiskReport {
  id: string;
  date: string; // ISO string
  riskLevel: RiskLevel;
  probability: number; // 0–1
  phq9Score: number;
  gad7Score: number;
  sleepHours: number;
  physicalActivityDays: number;
  stressLevel: number; // 1–10
  feedback: string;
  recommendations: string[];
}

interface RiskState {
  currentReport: RiskReport | null;
  isCalculating: boolean;
  lastError: string | null;

  setCurrentReport: (report: RiskReport) => void;
  setCalculating: (value: boolean) => void;
  setError: (error: string | null) => void;
  clearReport: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useRiskStore = create<RiskState>((set) => ({
  currentReport: null,
  isCalculating: false,
  lastError: null,

  setCurrentReport: (report) =>
    set({ currentReport: report, isCalculating: false, lastError: null }),

  setCalculating: (value) => set({ isCalculating: value }),

  setError: (error) => set({ lastError: error, isCalculating: false }),

  clearReport: () =>
    set({ currentReport: null, isCalculating: false, lastError: null }),
}));
