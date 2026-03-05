"use client";

import { useState } from "react";
import { siteConfig } from "@/site.config";

type LegalPage = "impressum" | "datenschutz" | "agb" | "disclaimer" | null;

export default function Footer() {
    const [modal, setModal] = useState<LegalPage>(null);
    const l = siteConfig.legal;

    return (
        <>
            <footer className="bg-brand-black text-white py-12 sm:py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-brand-green/20 text-brand-green font-headline font-bold text-xs rounded-lg">
                                    KI
                                </span>
                                <span className="font-headline font-semibold text-sm">
                                    {siteConfig.siteName}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {siteConfig.description}
                            </p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-headline font-bold text-sm mb-4">Kontakt</h4>
                            <div className="text-gray-400 text-sm space-y-1">
                                <p>{l.companyName}</p>
                                <p>{l.street}</p>
                                <p>{l.zip} {l.city}</p>
                                <p className="pt-2">
                                    <a href={`tel:${l.phone}`} className="hover:text-brand-green transition-colors">
                                        {l.phone}
                                    </a>
                                </p>
                                <p>
                                    <a href={`mailto:${l.email}`} className="hover:text-brand-green transition-colors">
                                        {l.email}
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-headline font-bold text-sm mb-4">Rechtliches</h4>
                            <div className="text-gray-400 text-sm space-y-2">
                                {(
                                    [
                                        ["impressum", "Impressum"],
                                        ["datenschutz", "Datenschutzerklärung"],
                                        ["agb", "AGB"],
                                        ["disclaimer", "Disclaimer"],
                                    ] as const
                                ).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => setModal(key)}
                                        className="block hover:text-brand-green transition-colors"
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} {l.companyName}. Alle Rechte vorbehalten.
                    </div>
                </div>
            </footer>

            {/* Legal Modals */}
            {modal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={() => setModal(null)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-headline text-xl font-bold text-brand-black">
                                {modal === "impressum" && "Impressum"}
                                {modal === "datenschutz" && "Datenschutzerklärung"}
                                {modal === "agb" && "Allgemeine Geschäftsbedingungen"}
                                {modal === "disclaimer" && "Disclaimer"}
                            </h2>
                            <button
                                onClick={() => setModal(null)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="prose prose-sm prose-gray max-w-none text-sm text-gray-600 leading-relaxed">
                            {modal === "impressum" && <ImpressumContent />}
                            {modal === "datenschutz" && <DatenschutzContent />}
                            {modal === "agb" && <AGBContent />}
                            {modal === "disclaimer" && <DisclaimerContent />}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function ImpressumContent() {
    const l = siteConfig.legal;
    return (
        <>
            <h3>Angaben gemäß § 5 TMG</h3>
            <p>
                {l.companyName}<br />
                {l.street}<br />
                {l.zip} {l.city}<br />
                {l.country}
            </p>
            <h3>Vertreten durch</h3>
            <p>Geschäftsführer: {l.managingDirector}</p>
            <h3>Kontakt</h3>
            <p>
                Telefon: {l.phone}<br />
                E-Mail: {l.email}
            </p>
            <h3>Registereintrag</h3>
            <p>
                Registergericht: {l.registerCourt}<br />
                Registernummer: {l.registerNumber}
            </p>
            <h3>Umsatzsteuer-Identifikationsnummer</h3>
            <p>gemäß § 27a Umsatzsteuergesetz: {l.vatId}</p>
            <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
            <p>
                {l.responsibleContent}<br />
                {l.street}<br />
                {l.zip} {l.city}
            </p>
        </>
    );
}

function DatenschutzContent() {
    const l = siteConfig.legal;
    return (
        <>
            <h3>1. Datenschutz auf einen Blick</h3>
            <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
            <h3>2. Allgemeine Hinweise und Pflichtinformationen</h3>
            <h4>Verantwortliche Stelle</h4>
            <p>
                {l.companyName}<br />
                {l.street}, {l.zip} {l.city}<br />
                Telefon: {l.phone}<br />
                E-Mail: {l.email}
            </p>
            <h3>3. Datenerfassung auf dieser Website</h3>
            <h4>Fragebogen-Daten</h4>
            <p>
                Die im KI-Readiness-Fragebogen eingegebenen Daten werden auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bzw. zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) verarbeitet. Die Daten werden ausschließlich zur Berechnung Ihres KI-Reifegrades und ggf. zur personalisierten Beratung verwendet.
            </p>
            <h4>E-Mail-Kommunikation</h4>
            <p>
                Wenn Sie eine persönliche Analyse wünschen und Ihre E-Mail-Adresse angeben, nutzen wir diese für die Zusendung Ihrer Ergebnisse und ggf. weiterführender Informationen. Sie können der Nutzung jederzeit widersprechen, z.B. über den Abmeldelink in jeder E-Mail.
            </p>
            <h3>4. Hosting</h3>
            <p>
                Diese Website wird bei Vercel Inc. gehostet. Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel unter https://vercel.com/legal/privacy-policy.
            </p>
            <h3>5. Ihre Rechte</h3>
            <p>
                Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenden Sie sich hierzu an: {l.email}
            </p>
        </>
    );
}

function AGBContent() {
    const l = siteConfig.legal;
    return (
        <>
            <h3>1. Geltungsbereich</h3>
            <p>
                Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung des KI-Readiness Checks auf {siteConfig.domain}, betrieben von {l.companyName}, {l.street}, {l.zip} {l.city}.
            </p>
            <h3>2. Leistungsbeschreibung</h3>
            <p>
                Der KI-Readiness Check ist ein kostenloser Online-Fragebogen, der eine algorithmische Einschätzung des KI-Reifegrades eines Unternehmens liefert. Die Ergebnisse stellen keine verbindliche Beratungsleistung dar.
            </p>
            <h3>3. Haftungsausschluss</h3>
            <p>
                Die berechneten Scores, Einsparpotenziale und Empfehlungen basieren auf algorithmischen Schätzungen und stellen keine Garantie dar. Eine Haftung für die Richtigkeit, Vollständigkeit oder Aktualität der Ergebnisse wird ausgeschlossen, soweit kein vorsätzliches oder grob fahrlässiges Verhalten vorliegt.
            </p>
            <h3>4. Urheberrecht</h3>
            <p>
                Die Inhalte dieser Website, einschließlich Texte, Grafiken und Methodik des Fragebogens, unterliegen dem deutschen Urheberrecht. Jede Verwertung bedarf der Zustimmung des Betreibers.
            </p>
            <h3>5. Gerichtsstand</h3>
            <p>Gerichtsstand ist Berlin.</p>
        </>
    );
}

function DisclaimerContent() {
    return (
        <>
            <h3>Haftung für Inhalte</h3>
            <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <h3>Haftung für Links</h3>
            <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
            </p>
            <h3>KI-Readiness-Ergebnisse</h3>
            <p>
                Die im Rahmen des KI-Readiness Checks berechneten Ergebnisse (Score, Einsparpotenzial, Reifegrad) sind algorithmische Schätzungen auf Basis Ihrer Angaben. Sie stellen keine verbindliche Beratung, Prognose oder Zusicherung dar. Tatsächliche Ergebnisse können deutlich abweichen. Für strategische Entscheidungen empfehlen wir eine individuelle Beratung.
            </p>
        </>
    );
}
