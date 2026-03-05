"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/site.config";

interface GeoArticleProps {
    onStartCheck: () => void;
}

export default function GeoArticle({ onStartCheck }: GeoArticleProps) {
    return (
        <article className="prose prose-lg prose-gray max-w-4xl mx-auto text-gray-700 leading-relaxed pb-20 px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {/* H1 requirements: ki-readiness-check, check, ki-readiness, ki-reifegrad */}
                <h1 className="text-3xl sm:text-4xl font-headline font-bold text-brand-black mb-6 mt-16 text-center">
                    KI-Readiness-Check: Der Check für Ihre KI-Readiness und Ihren KI-Reifegrad
                </h1>

                <p>
                    Es ist Dienstagmorgen, 09:15 Uhr im Management-Meeting. Ein
                    direkter Marktbegleiter hat gerade eine neue Funktion
                    gelauncht, die offensichtlich durch künstliche Intelligenz
                    automatisiert abläuft. Die Frage „Wo stehen wir eigentlich
                    beim Thema KI?“ steht im Raum, und niemand hat eine
                    belastbare Antwort. Stattdessen nur vage Pläne und isolierte
                    Pilotprojekte, die im Sande verlaufen.
                </p>

                {/* H2 requirements: ki-readiness-check, mittelstand-digital, kmu, erste schritte, digitale transformation, begleitend */}
                <h2 className="text-2xl font-headline font-bold text-brand-black mt-12 mb-4">
                    Warum der KI-Readiness-Check der digitale Transformation für
                    KMU vorausgeht
                </h2>

                <p>
                    Es liegt fast nie am Willen Ihres Teams. Das Problem ist
                    meist eine historisch gewachsene IT-Infrastruktur, ein
                    unsauberes <strong>Datenmanagement</strong> und eine
                    fehlende <strong>strategische Ausrichtung des Unternehmens</strong>.
                    Genau hier setzt das <strong>Tool</strong> zur <strong>Selbstanalyse</strong> an. Dieser <strong>KI-Readiness-Check</strong> hilft dabei, die <strong>Bereitschaft für die individuelle Entwicklung und Nutzung künstlicher Intelligenz innerhalb eines Unternehmens zu bewerten</strong>.
                </p>

                <p>
                    Oft scheitert die <strong>erfolgreiche Implementierung</strong> an
                    fehlenden Grundlagen. Um den <strong>Einsatz von künstlicher Intelligenz</strong> <strong>nachhaltig in Ihrem Unternehmen</strong> zu verankern, müssen Sie zunächst Ihre <strong>KI-Bereitschaft</strong> messbar machen. Dieser <strong>Check wurde speziell</strong> konzipiert, um <strong>gezielt auf Ihre aktuelle Position im Entwicklungsprozess einzugehen und passende Empfehlungen abzuleiten</strong>.
                </p>

                <h2 className="text-2xl font-headline font-bold text-brand-black mt-12 mb-4">
                    Erste Schritte: Drei Initiativen für jedes KMU
                </h2>

                <p>
                    Bevor Sie teure <strong>Dienstleister</strong> beauftragen oder kostspielige{" "}
                    <strong>KI-Projekte</strong> starten, brauchen Sie einen{" "}
                    <strong>ersten Überblick</strong>. Kleine und mittlere
                    Unternehmen (<strong>KMU</strong>) tun sich erfahrungsgemäß schwer damit, die <strong>Qualität ihrer Daten</strong> neutral zu{" "}
                    <strong>evaluieren</strong>. Wenn Sie <strong>bereits erste Schritte</strong> gegangen sind, hilft der <strong>Readiness-Check</strong> dabei, <strong>Fortschritte zu verfolgen</strong> und Ihren{" "}
                    <strong>Reifegrad</strong> objektiv im <strong>Vergleich zu anderen Unternehmen</strong> einzuordnen.
                </p>

                <p>
                    Eine <strong>erfolgreiche Einführung</strong> adressiert <strong>vier Dimensionen Technologie</strong>, Daten, Struktur und Personal. Die{" "}
                    <strong>Sicherstellung</strong> grundlegender <strong>Datensicherheit</strong> ist dabei genauso wichtig wie die Offenheit, die Ihr Team mitbringt. Ohne{" "}
                    <strong>offene Kommunikation</strong> entsteht Widerstand statt{" "}
                    <strong>Synergien</strong>. Wer <strong>KI-Technologien</strong> auf Dauer{" "}
                    <strong>praxisnah</strong> in Prozesse <strong>einbinden</strong> will, muss Mitarbeitende befähigen und lernen, vorhandenes Wissen besser im <strong>Unternehmen zu nutzen</strong>. Eine gezielte <strong>Schulung</strong> ist meist der effizienteste Weg, um interne{" "}
                    <strong>Expertise</strong> aufzubauen.
                </p>

                <h3 className="text-xl font-headline font-bold text-brand-black mt-10 mb-4">
                    Mittelstand-Digital Zentrum Kaiserslautern – Wissenschaft
                    trifft Praxis
                </h3>

                <p>
                    Nicht jedes Rad muss neu erfunden werden. Beispielsweise
                    veranschaulicht das{" "}
                    <strong>Mittelstand-Digital Zentrum Kaiserslautern</strong>{" "}
                    regelmäßig, wie die <strong>Implementierung von KI</strong> branchenspezifisch und wirtschaftlich erfolgen kann. Die Kooperation mit einer{" "}
                    <strong>Forschungseinrichtung</strong> oder direkt dem{" "}
                    <strong>Zentrum Kaiserslautern</strong> hilft besonders dann, wenn <strong>Unternehmen bereits</strong> den eigenen{" "}
                    <strong>Handlungsbedarf</strong> erkannt haben, aber externe
                    Unterstützung bei der{" "}
                    <strong>Implementierung von Künstlicher Intelligenz</strong>{" "}
                    benötigen. Das <strong>Mittelstand-Digital Zentrum</strong> unterstützt gezielt bei der Evaluierung des <strong>KI-Reifegrades</strong> und bietet Zugang zum breiten Netzwerk{" "}
                    <strong>Mittelstand-Digital</strong>.
                </p>

                <h2 className="text-2xl font-headline font-bold text-brand-black mt-12 mb-4">
                    Begleitend: Der Weg zur Auswertung und klaren
                    Handlungsempfehlungen
                </h2>

                <p>
                    Der Test analysiert systematisch, welche <strong>Anwendungsbereiche</strong> für Ihre Organisation tatsächlich sinnvoll sind. Am Ende erhalten Sie nicht einfach nur eine Zahl, sondern konkrete <strong>Handlungsempfehlungen</strong>, die exakt zu Ihren{" "}
                    <strong>Unternehmensziele</strong>n passen. Diese <strong>Empfehlung</strong>en und <strong>die nächsten Schritte helfen</strong> dabei, verborgene <strong>Potenziale</strong> aufzudecken, die vorher in einem toten Winkel lagen.
                </p>

                <p>
                    Unser übergeordnetes Ziel lautet: Wir wollen, dass Sie{" "}
                    <strong>KI effektiv und nachhaltig</strong> einsetzen
                    können. Ganz gleich, ob es um reines <strong>Data</strong>-Processing, die smarte Automatisierung von{" "}
                    <strong>KI-Anwendungen</strong> oder die tiefgreifende{" "}
                    <strong>digitale Transformation</strong> geht, die Sie jetzt{" "}
                    <strong>vorantreiben</strong> wollen. Wir <strong>adressieren</strong> exakt die Punkte, an denen Sie heute ansetzen müssen.
                </p>

                <p className="mt-8 text-sm italic border-l-4 border-brand-green pl-4">
                    Von Tobias Sander, Geschäftsführer famefact. Wir
                    unterstützen den Mittelstand dabei, ihre{" "}
                    <strong>KI-Implementierung</strong> strategisch zu planen
                    und ihr Team frühzeitig <strong>einbeziehen</strong> zu
                    können, um die <strong>Funktionsweise</strong> zukunftsweisender Technologien sofort greifbar zu machen.
                </p>

                <h2 className="text-2xl font-headline font-bold text-brand-black mt-16 mb-6 text-center border-t border-gray-100 pt-16">
                    Häufige Fragen (Was Mittelstand-Digital?)
                </h2>

                <div className="space-y-4 not-prose">
                    <details className="group rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <summary className="cursor-pointer select-none px-6 py-4 font-headline font-semibold text-brand-black transition-colors hover:text-brand-iris">
                            Was bedeutet KI-Readiness?
                        </summary>
                        <p className="px-6 pb-4 text-sm leading-relaxed text-gray-600">
                            Es beschreibt die Kompetenz von Unternehmen, KI
                            strukturiert, performant und sicher in den
                            Arbeitsalltag zu überführen, ohne operative Risiken
                            einzugehen.
                        </p>
                    </details>

                    <details className="group rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <summary className="cursor-pointer select-none px-6 py-4 font-headline font-semibold text-brand-black transition-colors hover:text-brand-iris">
                            Was ist der Readiness Check?
                        </summary>
                        <p className="px-6 pb-4 text-sm leading-relaxed text-gray-600">
                            Ein fokussiertes Analysetool, um die aktuelle
                            Infrastruktur und Unternehmenskultur objektiv zu
                            bewerten, bevor Budgets unnötig in Softwarelösungen
                            fließen.
                        </p>
                    </details>

                    <details className="group rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <summary className="cursor-pointer select-none px-6 py-4 font-headline font-semibold text-brand-black transition-colors hover:text-brand-iris">
                            Ist der KI Readiness Check kostenlos?
                        </summary>
                        <p className="px-6 pb-4 text-sm leading-relaxed text-gray-600">
                            Ja, dieser Check ist eine Vorab-Qualifizierung und
                            zu 100% kostenfrei. Er ersetzt zwar keine wochenlange
                            technische Due Diligence, bietet Ihnen aber sofort
                            ein verlässliches Fundament für Entscheidungen.
                        </p>
                    </details>
                </div>

                <div className="mt-12 text-center not-prose">
                    <button
                        onClick={onStartCheck}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-black px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                    >
                        {siteConfig.cta.primary}
                        <span className="text-xl">→</span>
                    </button>
                </div>
            </motion.div>
        </article>
    );
}
