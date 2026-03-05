"use client";
import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/site.config";
import { faqItems, howToSteps } from "@/lib/content";

interface HeroSectionProps {
    onStartCheck: () => void;
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
};

export default function HeroSection({ onStartCheck }: HeroSectionProps) {
    const levels = siteConfig.scoring.maturityLevels;
    const author = siteConfig.author;

    return (
        <div>
            {/* ═══════════════════════════════════════════════
                HERO
            ═══════════════════════════════════════════════ */}
            <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20">
                <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand-dusty-green/30 blur-3xl" />
                <div className="pointer-events-none absolute -right-32 top-20 h-[400px] w-[400px] rounded-full bg-brand-light-mauve/20 blur-3xl" />
                <div className="noise-overlay" />

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
                    <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-dusty-green/30 px-4 py-1.5 text-sm font-medium text-brand-black">
                            ✨ Kostenlos · 5 Minuten · Sofort-Ergebnis
                        </span>
                    </motion.div>

                    <motion.h1
                        className="mt-6 font-headline text-4xl font-bold leading-tight text-brand-black sm:text-5xl lg:text-6xl"
                        initial="hidden" animate="visible" custom={1} variants={fadeUp}
                    >
                        Künstliche Intelligenz (KI)
                        <br />
                        <span className="text-brand-iris">für den Mittelstand</span>
                    </motion.h1>

                    <motion.p
                        className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 sm:text-xl"
                        initial="hidden" animate="visible" custom={2} variants={fadeUp}
                    >
                        Kostenlose KI-Potenzialanalyse: Finden Sie in 5 Minuten heraus, wo Ihr mittelständisches Unternehmen beim Einsatz von KI steht — und welche Hebel Sie sofort nutzen können.
                    </motion.p>

                    <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
                        <button
                            onClick={onStartCheck}
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-black px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                        >
                            {siteConfig.cta.primary}
                            <span className="text-xl">→</span>
                        </button>
                    </motion.div>

                    <motion.p
                        className="mt-4 text-sm text-gray-500"
                        initial="hidden" animate="visible" custom={4} variants={fadeUp}
                    >
                        ⭐ Bereits 500+ mittelständische Unternehmen analysiert
                    </motion.p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                MATURITY LEVEL PREVIEW
            ═══════════════════════════════════════════════ */}
            <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
                <motion.h2
                    className="mb-8 text-center font-headline text-2xl font-bold text-brand-black sm:text-3xl"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                >
                    Die 5 KI-Reifegradstufen im Mittelstand
                </motion.h2>
                <div className="grid gap-3 sm:grid-cols-5">
                    {levels.map((level, i) => (
                        <motion.div
                            key={level.level}
                            className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md"
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                        >
                            <span className="text-3xl">{level.emoji}</span>
                            <p className="mt-2 text-sm font-semibold text-brand-black">{level.label}</p>
                            <p className="mt-1 text-xs text-gray-400">Level {level.level}</p>
                            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-greige/40">
                                <div className="h-full rounded-full" style={{
                                    width: `${level.level * 20}%`,
                                    background: `linear-gradient(90deg, #bbd8a7, #a387c1)`,
                                }} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                TRUST SECTION — Why a KI Check
            ═══════════════════════════════════════════════ */}
            <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
                <motion.h2
                    className="mb-8 text-center font-headline text-2xl font-bold text-brand-black sm:text-3xl"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                >
                    Warum eine KI-Potenzialanalyse für Ihr Unternehmen?
                </motion.h2>
                <div className="grid gap-6 sm:grid-cols-3">
                    {[
                        {
                            icon: "📊",
                            title: "KI-Reifegrad objektiv messen",
                            text: "Erhalten Sie eine fundierte Einschätzung, wo Ihr mittelständisches Unternehmen in der digitalen Transformation durch Künstliche Intelligenz wirklich steht — frei von Hype und Buzzwords.",
                        },
                        {
                            icon: "🔍",
                            title: "Mittelstands-Potenziale finden",
                            text: "Finden Sie heraus, in welchen Unternehmensbereichen KI den größten Hebel bietet und wo Sie ohne gigantische IT-Budgets sofort starten können.",
                        },
                        {
                            icon: "💰",
                            title: "Einsparpotenzial berechnen",
                            text: "Unser Algorithmus schätzt das konkrete Einsparpotenzial durch Automatisierung — in Stunden und Euro pro Jahr. Speziell kalibriert für mittelständische Personalstrukturen.",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <span className="text-3xl">{item.icon}</span>
                            <h3 className="mt-3 font-headline text-lg font-semibold text-brand-black">{item.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                GEO CONTENT — Was bringt KI dem Mittelstand?
                ~400 words
            ═══════════════════════════════════════════════ */}
            <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="mb-6 font-headline text-2xl font-bold text-brand-black sm:text-3xl">
                        Was bringt Künstliche Intelligenz dem Mittelstand wirklich?
                    </h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                        <p>
                            Künstliche Intelligenz ist längt kein Thema mehr nur für Konzerne aus dem Silicon Valley. Gerade der deutsche Mittelstand — das Rückgrat unserer Wirtschaft mit über 3,5 Millionen Unternehmen — steht vor der Herausforderung, KI strategisch zu nutzen, um wettbewerbsfähig zu bleiben. Eine Studie des Bundesverbands mittelständische Wirtschaft (BVMW) zeigt: Rund 42 % der mittelständischen Betriebe haben bereits erste Erfahrungen mit KI-Tools gesammelt, doch nur 12 % setzen Künstliche Intelligenz systematisch, compliance-konform und flächendeckend in ihren Geschäftsprozessen ein.
                        </p>
                        <p>
                            Für mittelständische Unternehmen liegen die größten, sofort realisierbaren Potenziale in der intelligenten Automatisierung wiederkehrender Aufgaben. Sei es in der Kundenkommunikation durch intelligente E-Mail-Klassifizierung, in der datengetriebenen Entscheidungsfindung im Vertrieb, bei der Angebotserstellung, in der Personalbeschaffung (Recruiting) oder der Prozessoptimierung im Marketing. Unternehmen mit 50 bis 500 Mitarbeitenden berichten regelmäßig von 15 bis 30 Prozent Effizienzsteigerung bereits im ersten Jahr der KI-Adaption.
                        </p>
                        <p>
                            Der entscheidende Vorteil für den Mittelstand 2025: KI-Softwarelösungen sind heute extrem zugänglich. Cloud-native Tools (SaaS) wie ChatGPT Enterprise, Microsoft 365 Copilot oder spezialisierte KI-Assistenten für den Vertrieb erfordern weder riesige IT-Abteilungen noch monatelange Entwicklungszeiten. Mit einer strukturierten <strong>KI-Potenzialanalyse</strong> identifizieren Sie genau die Ansatzpunkte mit dem höchsten Return on Investment (ROI) — bevor Sie in teure, individuelle Beratungsprojekte investieren.
                        </p>
                        <p>
                            Der allgegenwärtige Fachkräftemangel verschärft die Dringlichkeit zusätzlich. Mittelständler konkurrieren heute mit Konzernen und agilen Startups um die besten Talente. Wer Künstliche Intelligenz als Hebel nutzt, befreit seine wertvollsten Fachkräfte von zeitraubenden Routineaufgaben. So wird KI im Mittelstand nicht zum Jobkiller, sondern zur Lösung eines der drängendsten wirtschaftlichen und demografischen Probleme überhaupt.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════
                HOW-TO SECTION — So funktioniert's
            ═══════════════════════════════════════════════ */}
            <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
                <motion.h2
                    className="mb-8 text-center font-headline text-2xl font-bold text-brand-black sm:text-3xl"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                >
                    So funktioniert unsere KI-Potenzialanalyse für KMU
                </motion.h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {howToSteps.map((step, i) => (
                        <motion.div
                            key={i}
                            className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div className="mb-3 flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-iris/20 text-sm font-bold text-brand-iris">
                                    {i + 1}
                                </span>
                                <span className="text-2xl">{step.icon}</span>
                            </div>
                            <h3 className="font-headline text-base font-semibold text-brand-black">{step.name}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.text}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <button
                        onClick={onStartCheck}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-8 py-4 text-lg font-semibold text-brand-black shadow-md transition-all hover:bg-brand-green-hover hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                    >
                        Jetzt KI-Analyse kostenfrei starten
                        <span className="text-xl">→</span>
                    </button>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                6 DIMENSIONS
            ═══════════════════════════════════════════════ */}
            <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="mb-8 text-center font-headline text-2xl font-bold text-brand-black sm:text-3xl">
                        6 Dimensionen einer erfolgreichen KI-Strategie im Mittelstand
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: "🤖",
                                title: "KI-Status & Strategie",
                                text: "Setzen Ihre Abteilungen bereits ChatGPT oder ähnliche Tools ein? Gibt es einen formulierten Rahmen? Mittelständische Unternehmen, die frühzeitig eine verbindliche KI-Strategie (Guidelines) entwickeln, nutzen Technologie spürbar effizienter.",
                            },
                            {
                                icon: "⚙️",
                                title: "Prozesse & Automatisierung",
                                text: "Die größte Chance für Unternehmen: Reduktion administrativer Kosten. Wir analysieren mit unserer KI-Potenzialanalyse, in welchen operativen Bereichen (Support, HR, Sales) Automatisierung aktuell am meisten Sinn ergibt.",
                            },
                            {
                                icon: "💾",
                                title: "Daten & IT-Infrastruktur",
                                text: "Künstliche Intelligenz kann nur so gut sein wie die Daten, auf denen sie operiert („Garbage in, Garbage out“). Sind Ihre Kunden- und Produktdaten in ERP und CRM strukturiert? Das ist das Fundament für mittlere Unternehmen.",
                            },
                            {
                                icon: "📡",
                                title: "Digitale Sichtbarkeit (GEO)",
                                text: "Werden Ihre Dienstleistungen in LLMs wie Perplexity oder ChatGPT Suchanfragen gefunden? Generative Engine Optimization wird für den Mittelstand in den kommenden Jahren zum entscheidenden Treiber in der B2B-Leadgenerierung.",
                            },
                            {
                                icon: "🎓",
                                title: "Mitarbeiter & KI-Kompetenzen",
                                text: "Der Wandel muss vom Team getragen werden. Ein häufiges Defizit im Mittelstand ist die fehlende Methodik (Prompt Engineering). Wir decken auf, ob interne Trainings oder externe 'KI-Champions' benötigt werden.",
                            },
                            {
                                icon: "💰",
                                title: "Budget & Investitionsbereitschaft",
                                text: "Echtes KI-Potenzial entfaltet sich nicht kostenlos. Schon überschaubare, zielgerichtete Budgets zwischen 5.000 und 15.000 Euro können gewaltige Engpässe auflösen. Wir helfen, den ROI belastbar abzuschätzen.",
                            },
                        ].map((dim, i) => (
                            <motion.div
                                key={i}
                                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                            >
                                <span className="text-3xl">{dim.icon}</span>
                                <h3 className="mt-3 font-headline text-base font-semibold text-brand-black">{dim.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">{dim.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════
                STATS — KI im Mittelstand: Zahlen & Fakten
            ═══════════════════════════════════════════════ */}
            <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="mb-8 text-center font-headline text-2xl font-bold text-brand-black sm:text-3xl">
                        KI im Mittelstand: Zahlen & Fakten zur Beschleunigung
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { value: "42 %", label: "der KMU haben erste KI-Erfahrungen", source: "BVMW Studien 2024" },
                            { value: "12 %", label: "setzen KI derzeit systematisch in Prozessen ein", source: "Bitkom Report" },
                            { value: "30 %", label: "potenzieller Effizienzgewinn durch KI im Büroalltag", source: "McKinsey SME" },
                            { value: "5 Min.", label: "Dauer der kostenfreien KI-Potenzialanalyse", source: "track by track GmbH" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
                                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                <p className="font-headline text-3xl font-bold text-brand-iris">{stat.value}</p>
                                <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
                                {stat.source && <p className="mt-1 text-xs text-gray-400">{stat.source}</p>}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════
                FAQ — 10 Items
            ═══════════════════════════════════════════════ */}
            <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
                <motion.h2
                    className="mb-8 text-center font-headline text-2xl font-bold text-brand-black sm:text-3xl"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                >
                    Häufige Fragen zur KI-Potenzialanalyse
                </motion.h2>
                <div className="space-y-3">
                    {faqItems.map((faq, i) => (
                        <motion.details
                            key={i}
                            className="group rounded-2xl border border-gray-100 bg-white shadow-sm"
                            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                        >
                            <summary className="cursor-pointer select-none px-6 py-4 font-headline font-semibold text-brand-black transition-colors hover:text-brand-iris">
                                {faq.q}
                            </summary>
                            <p className="px-6 pb-4 text-sm leading-relaxed text-gray-600">
                                {faq.a}
                            </p>
                        </motion.details>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                AUTHOR / E-E-A-T
            ═══════════════════════════════════════════════ */}
            <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
                <motion.div
                    className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-iris text-3xl font-bold text-white shadow-inner">
                            TK
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-brand-iris">Strategische Expertise</p>
                            <h3 className="mt-1 font-headline text-xl font-bold text-brand-black">{author.name}</h3>
                            <p className="text-sm font-medium text-gray-500">{author.role}</p>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600">
                                {author.bio}
                            </p>
                            <a
                                href={author.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#004182] hover:shadow-md active:scale-95"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                Mit Tobias auf LinkedIn vernetzen
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════
                BOTTOM CTA
            ═══════════════════════════════════════════════ */}
            <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
                <motion.div
                    className="rounded-3xl bg-brand-black p-8 text-center text-white shadow-lg sm:p-12"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                >
                    <h2 className="font-headline text-2xl font-bold sm:text-3xl">
                        Bereit für Ihre KI-Potenzialanalyse?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-gray-400">
                        In knapp 5 Minuten erfahren Sie, wo Ihr mittelständisches Unternehmen beim Einsatz von KI steht — mit sofortigen Auswertungen und einer messbaren Einsparschätzung.
                    </p>
                    <button
                        onClick={onStartCheck}
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-green px-8 py-4 text-lg font-semibold text-brand-black shadow-md transition-all hover:bg-brand-green-hover hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                    >
                        {siteConfig.cta.primary}
                        <span className="text-xl">→</span>
                    </button>
                    <p className="mt-4 text-xs text-gray-500">Kostenlos und unverbindlich. Keine Anmeldung erforderlich.</p>
                </motion.div>
            </section>
        </div>
    );
}
