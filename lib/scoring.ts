import { sections, Question } from "./questions";
import { siteConfig } from "@/site.config";

export type Answers = Record<string, string | string[] | Record<string, string>>;

export interface CategoryScore {
    name: string;
    score: number;
    maxScore: number;
    percent: number;
}

export interface SavingsPotential {
    hoursPerWeek: number;
    hoursPerYear: number;
    eurosPerYear: number;
}

export interface ScoreResult {
    percent: number;
    maturityLevel: (typeof siteConfig.scoring.maturityLevels)[number];
    categories: CategoryScore[];
    savings: SavingsPotential | null;
    recommendations: string[];
}

// Sections that contribute to scoring (by string id)
const SCORING_SECTIONS = [
    { id: "ki_status", name: "KI-Status" },
    { id: "processes", name: "Prozesse & Automatisierung" },
    { id: "data", name: "Daten & Infrastruktur" },
    { id: "marketing", name: "Marketing & Sichtbarkeit" },
    { id: "employees", name: "Mitarbeiter & Kompetenzen" },
    { id: "budget", name: "Budget & Bereitschaft" },
];

const SIZE_MULTIPLIERS: Record<string, number> = {
    "1-10": 5,
    "11-50": 25,
    "51-250": 100,
    "251-1000": 400,
    "1000+": 800,
};

const HOURS_MAP: Record<string, number> = {
    under5: 5,
    "5-10": 7.5,
    "10-20": 15,
    "20+": 25,
};

function getQuestionScore(
    question: Question,
    answer: string | string[]
): { score: number; maxScore: number } {
    if (!question.options && question.type !== "scale") return { score: 0, maxScore: 0 };
    const weight = question.scoreWeight || 1;

    if (question.type === "multi" && Array.isArray(answer)) {
        const selectedScores = answer
            .map((v) => {
                const opt = question.options!.find((o) => o.value === v);
                return opt?.score || 0;
            })
            .sort((a, b) => b - a)
            .slice(0, 4);
        const score = selectedScores.reduce((sum, s) => sum + s, 0) * weight;
        const maxScores = (question.options || [])
            .map((o) => o.score || 0)
            .sort((a, b) => b - a)
            .slice(0, 4);
        const maxScore = maxScores.reduce((sum, s) => sum + s, 0) * weight;
        return { score, maxScore };
    }

    if (question.type === "scale" && typeof answer === "string") {
        const val = parseInt(answer, 10);
        return { score: val * weight, maxScore: (question.scaleMax || 5) * weight };
    }

    if (typeof answer === "string" && question.options) {
        const opt = question.options.find((o) => o.value === answer);
        const score = (opt?.score || 0) * weight;
        const maxScore = Math.max(...question.options.map((o) => o.score || 0)) * weight;
        return { score, maxScore };
    }

    return { score: 0, maxScore: 0 };
}

function getMaxScoreForQuestion(question: Question): number {
    const weight = question.scoreWeight || 1;
    if (question.type === "multi") {
        const maxScores = (question.options || [])
            .map((o) => o.score || 0)
            .sort((a, b) => b - a)
            .slice(0, 4);
        return maxScores.reduce((sum, s) => sum + s, 0) * weight;
    }
    if (question.type === "scale") {
        return (question.scaleMax || 5) * weight;
    }
    return Math.max(...(question.options || []).map((o) => o.score || 0)) * weight;
}

export function calculateScore(answers: Answers): ScoreResult {
    const categories: CategoryScore[] = [];
    let totalScore = 0;
    let totalMaxScore = 0;

    for (const { id, name } of SCORING_SECTIONS) {
        const section = sections.find((s) => s.id === id);
        if (!section) continue;

        let catScore = 0;
        let catMax = 0;

        for (const question of section.questions) {
            const hasScoring =
                question.options?.some((o) => o.score !== undefined) ||
                question.type === "scale";
            if (!hasScoring) continue;

            const answer = answers[question.id];
            if (answer !== undefined && answer !== "") {
                const { score, maxScore } = getQuestionScore(question, answer as string | string[]);
                catScore += score;
                catMax += maxScore;
            } else {
                catMax += getMaxScoreForQuestion(question);
            }
        }

        const percent = catMax > 0 ? Math.round((catScore / catMax) * 100) : 0;
        categories.push({ name, score: catScore, maxScore: catMax, percent });
        totalScore += catScore;
        totalMaxScore += catMax;
    }

    const percent = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

    const maturityLevel =
        siteConfig.scoring.maturityLevels.find((l) => percent >= l.min && percent <= l.max) ||
        siteConfig.scoring.maturityLevels[0];

    // Savings potential
    let savings: SavingsPotential | null = null;
    const repHours = answers.repetitive_hours as string;
    const compSize = answers.company_size as string;
    if (repHours && compSize) {
        const baseHours = HOURS_MAP[repHours] || 5;
        const multiplier = SIZE_MULTIPLIERS[compSize] || 5;
        const hoursPerWeek = Math.round(baseHours * multiplier * 0.3 * 0.3);
        const hoursPerYear = hoursPerWeek * 48;
        const eurosPerYear = hoursPerYear * 50;
        savings = { hoursPerWeek, hoursPerYear, eurosPerYear };
    }

    // Recommendations
    const recommendations: string[] = [];
    const kiUsage = answers.ki_usage as string;
    if (kiUsage === "none" || kiUsage === "experiments") {
        recommendations.push("Starten Sie mit KI-Assistenten wie ChatGPT oder Claude für erste Anwendungsfälle wie Textgenerierung, E-Mail-Entwürfe und Rechercheaufgaben.");
    }
    const kiStrategy = answers.ki_strategy as string;
    if (kiStrategy === "none" || kiStrategy === "planning") {
        recommendations.push("Entwickeln Sie eine KI-Strategie mit konkreten Zielen, Pilotprojekten und messbaren KPIs für Ihr Unternehmen.");
    }
    const dataStruct = answers.data_structure as string;
    if (dataStruct === "unstructured" || dataStruct === "none") {
        recommendations.push("Investieren Sie in Datenstrukturierung und -qualität – saubere Daten sind die Grundlage für erfolgreiche KI-Projekte.");
    }
    const kiVis = answers.ki_visibility as string;
    if (kiVis === "rarely" || kiVis === "unknown") {
        recommendations.push("Optimieren Sie Ihre Online-Präsenz für KI-Suchsysteme (GEO) – immer mehr Kunden nutzen ChatGPT und Perplexity statt Google.");
    }
    const kiAff = answers.ki_affinity as string;
    if (kiAff === "none" || kiAff === "experiments") {
        recommendations.push("Schulen Sie Ihr Team in KI-Kompetenzen – regelmäßige Workshops und Trainings beschleunigen die Adoption erheblich.");
    }
    const kiBudget = answers.ki_budget as string;
    if (kiBudget === "none") {
        recommendations.push("Planen Sie ein dediziertes KI-Budget ein – selbst kleine Investitionen können große Effizienzgewinne erzielen.");
    }
    if (percent < 60) {
        recommendations.push("Ein KI-Readiness-Workshop mit erfahrenen Beratern kann Ihnen helfen, die richtigen Prioritäten zu setzen und schnell Ergebnisse zu erzielen.");
    }

    return {
        percent,
        maturityLevel,
        categories,
        savings,
        recommendations: recommendations.slice(0, 5),
    };
}
