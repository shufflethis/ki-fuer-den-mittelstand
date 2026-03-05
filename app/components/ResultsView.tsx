"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/site.config";
import type { ScoreResult } from "@/lib/scoring";

interface ResultsViewProps {
    result: ScoreResult;
    companyName: string;
}

function formatNumber(n: number): string {
    return n.toLocaleString("de-DE");
}

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
    }),
};

function GaugeRing({ percent }: { percent: number }) {
    const deg = (percent / 100) * 360;
    return (
        <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `conic-gradient(#bbd8a7 0deg, #a387c1 ${deg}deg, #D5CDC3 ${deg}deg, #D5CDC3 360deg)`,
                }}
            />
            <div className="absolute inset-3 rounded-full bg-white" />
            <div className="relative z-10 text-center">
                <span className="font-headline text-4xl font-bold text-brand-black sm:text-5xl">
                    {percent}
                </span>
                <span className="block text-sm text-gray-400">von 100</span>
            </div>
        </div>
    );
}

function CategoryBar({
    name,
    percent,
}: {
    name: string;
    percent: number;
}) {
    const color =
        percent >= 70
            ? "bg-brand-green"
            : percent >= 40
                ? "bg-brand-iris"
                : "bg-brand-light-orange";

    return (
        <div className="flex items-center gap-4">
            <span className="w-48 shrink-0 text-sm font-medium text-brand-black">
                {name}
            </span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-brand-greige/30">
                <motion.div
                    className={`h-full rounded-full ${color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" as const, delay: 0.3 }}
                />
            </div>
            <span className="w-10 text-right text-sm font-semibold text-gray-600">
                {percent}%
            </span>
        </div>
    );
}

export default function ResultsView({
    result,
    companyName,
}: ResultsViewProps) {
    const { percent, maturityLevel, categories, recommendations, savings } = result;
    const levels = siteConfig.scoring.maturityLevels;

    const mailtoSubject = encodeURIComponent(
        `KI-Readiness Check Ergebnis — ${companyName} (Score: ${percent}%)`
    );
    const mailtoBody = encodeURIComponent(
        `Hallo,\n\nunser Unternehmen "${companyName}" hat den KI-Readiness Check abgeschlossen.\n\nErgebnis: ${percent}/100 (${maturityLevel.label})\n\nWir interessieren uns für ein Beratungsgespräch.\n\nMit freundlichen Grüßen`
    );

    return (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
            {/* Score Hero Card */}
            <motion.div
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
                initial="hidden"
                animate="visible"
                custom={0}
                variants={fadeUp}
            >
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
                    <GaugeRing percent={percent} />
                    <div className="text-center sm:text-left">
                        <span className="text-5xl">{maturityLevel.emoji}</span>
                        <h2 className="mt-2 font-headline text-2xl font-bold text-brand-black sm:text-3xl">
                            {maturityLevel.label}
                        </h2>
                        <p className="mt-1 text-gray-500">
                            Level {maturityLevel.level} von 5
                        </p>
                        {companyName && (
                            <p className="mt-1 text-sm text-gray-400">{companyName}</p>
                        )}
                    </div>
                </div>

                {/* Level Progress */}
                <div className="mt-6 flex gap-1">
                    {levels.map((level) => (
                        <div
                            key={level.level}
                            className={`h-2 flex-1 rounded-full transition-colors ${level.level <= maturityLevel.level
                                ? "bg-brand-iris"
                                : "bg-brand-greige/40"
                                }`}
                        />
                    ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-400">
                    {levels.map((level) => (
                        <span key={level.level} className="text-center">
                            {level.emoji}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Category Breakdown */}
            <motion.div
                className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
                initial="hidden"
                animate="visible"
                custom={1}
                variants={fadeUp}
            >
                <h3 className="mb-6 font-headline text-xl font-bold text-brand-black">
                    📊 Detailanalyse nach Kategorie
                </h3>
                <div className="space-y-4">
                    {categories.map((cat) => (
                        <CategoryBar key={cat.name} name={cat.name} percent={cat.percent} />
                    ))}
                </div>
            </motion.div>

            {/* Savings Card */}
            {savings && (
                <motion.div
                    className="mt-6 overflow-hidden rounded-3xl shadow-lg"
                    style={{
                        background: "linear-gradient(135deg, #DDEBD3, #DEEBF7)",
                    }}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    variants={fadeUp}
                >
                    <div className="p-6 sm:p-8">
                        <h3 className="mb-6 font-headline text-xl font-bold text-brand-black">
                            💡 Geschätztes Einsparpotenzial
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl bg-white/70 p-4 text-center backdrop-blur-sm">
                                <p className="font-headline text-3xl font-bold text-brand-black">
                                    {formatNumber(savings.hoursPerWeek)}
                                </p>
                                <p className="mt-1 text-sm text-gray-600">Stunden/Woche</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 p-4 text-center backdrop-blur-sm">
                                <p className="font-headline text-3xl font-bold text-brand-black">
                                    {formatNumber(savings.hoursPerYear)}
                                </p>
                                <p className="mt-1 text-sm text-gray-600">Stunden/Jahr</p>
                            </div>
                            <div className="rounded-2xl bg-white/70 p-4 text-center backdrop-blur-sm">
                                <p className="font-headline text-3xl font-bold text-brand-green-hover">
                                    {formatNumber(savings.eurosPerYear)} €
                                </p>
                                <p className="mt-1 text-sm text-gray-600">geschätzt/Jahr</p>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-gray-500">
                            Schätzung basierend auf 30% Automatisierungspotenzial, 48
                            Arbeitswochen, Ø 50 €/h
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <motion.div
                    className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    variants={fadeUp}
                >
                    <h3 className="mb-4 font-headline text-xl font-bold text-brand-black">
                        🎯 Ihre Handlungsempfehlungen
                    </h3>
                    <ol className="list-inside list-decimal space-y-3">
                        {recommendations.map((rec, i) => (
                            <li
                                key={i}
                                className="text-sm leading-relaxed text-gray-700"
                            >
                                {rec}
                            </li>
                        ))}
                    </ol>
                </motion.div>
            )}

            {/* CTA Card */}
            <motion.div
                className="mt-6 rounded-3xl bg-brand-black p-6 text-center text-white shadow-lg sm:p-8"
                initial="hidden"
                animate="visible"
                custom={4}
                variants={fadeUp}
            >
                <h3 className="font-headline text-2xl font-bold">
                    Bereit für den nächsten Schritt?
                </h3>
                <p className="mx-auto mt-3 max-w-md text-gray-400">
                    Unsere KI-Experten analysieren Ihr Ergebnis und zeigen Ihnen konkrete
                    Maßnahmen mit schnellem ROI.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <a
                        href={siteConfig.cta.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-6 py-3.5 font-semibold
              text-brand-black shadow-md transition-all
              hover:bg-brand-green-hover hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                    >
                        📅 Kostenloses Beratungsgespräch buchen
                    </a>
                    <a
                        href={`mailto:${siteConfig.legal.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-600 px-6 py-3.5
              font-semibold text-white transition-all
              hover:border-gray-400 hover:bg-white/5"
                    >
                        ✉️ Per E-Mail kontaktieren
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
