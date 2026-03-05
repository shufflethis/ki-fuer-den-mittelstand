"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuestionnaireFlow from "@/components/QuestionnaireFlow";
import ResultsView from "@/components/ResultsView";
import Footer from "@/components/Footer";
import { calculateScore, type Answers, type ScoreResult } from "@/lib/scoring";
import { siteConfig } from "@/site.config";

type AppState = "landing" | "questionnaire" | "results";

export default function Home() {
  const [state, setState] = useState<AppState>("landing");
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [answers, setAnswers] = useState<Answers>({});

  const handleStart = () => {
    setState("questionnaire");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionChange = useCallback((sectionIndex: number, percent: number) => {
    setCurrentSection(sectionIndex + 1);
    setProgress(percent);
  }, []);

  const handleComplete = useCallback((finalAnswers: Answers) => {
    setAnswers(finalAnswers);
    const scoreResult = calculateScore(finalAnswers);
    setResult(scoreResult);
    setState("results");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Fire-and-forget submission
    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: finalAnswers,
        score: scoreResult,
        domain: siteConfig.domain,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Silently fail — results are already shown
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header
        mode={state}
        currentSection={currentSection}
        totalSections={10}
        progressPercent={progress}
      />

      {state === "landing" && <HeroSection onStartCheck={handleStart} />}

      {state === "questionnaire" && (
        <QuestionnaireFlow
          onComplete={handleComplete}
          onSectionChange={handleSectionChange}
        />
      )}

      {state === "results" && result && (
        <ResultsView
          result={result}
          companyName={(answers.company_name as string) || ""}
        />
      )}

      <Footer />
    </div>
  );
}
