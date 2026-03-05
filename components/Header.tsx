"use client";
import { siteConfig } from "@/site.config";

interface HeaderProps {
    mode: "landing" | "questionnaire" | "results";
    currentSection?: number;
    totalSections?: number;
    progressPercent?: number;
}

export default function Header({
    mode,
    currentSection,
    totalSections = 10,
    progressPercent = 0,
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-100/50 bg-white/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-black text-sm font-bold text-brand-green">
                        KI
                    </span>
                    <span className="font-headline text-lg font-semibold text-brand-black">
                        {siteConfig.siteName}
                    </span>
                </div>

                {/* Questionnaire progress or Phone */}
                {mode === "questionnaire" && currentSection ? (
                    <div className="flex items-center gap-4">
                        <span className="hidden text-sm text-gray-500 sm:inline">
                            Abschnitt {currentSection} von {totalSections}
                        </span>
                        <span className="text-sm font-semibold text-brand-black">
                            {progressPercent}%
                        </span>
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-brand-greige/50 sm:w-40">
                            <div
                                className="h-full rounded-full transition-all duration-500 ease-out"
                                style={{
                                    width: `${progressPercent}%`,
                                    background: `linear-gradient(90deg, #bbd8a7, #a387c1)`,
                                }}
                            />
                        </div>
                    </div>
                ) : mode === "results" ? (
                    <span className="text-sm text-gray-500">✅ Ergebnis</span>
                ) : (
                    <a
                        href={`tel:${siteConfig.legal.phone}`}
                        className="hidden text-sm text-gray-600 transition-colors hover:text-brand-black sm:inline-flex sm:items-center sm:gap-1"
                    >
                        📞 {siteConfig.legal.phone}
                    </a>
                )}
            </div>
        </header>
    );
}
