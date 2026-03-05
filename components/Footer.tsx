"use client";
import { useState } from "react";
import { siteConfig } from "@/site.config";

function LegalModal({
    title,
    onClose,
    children,
}: {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}) {
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="mb-6 font-headline text-2xl font-bold text-brand-black">
                    {title}
                </h2>
                <div className="prose prose-sm max-w-none text-gray-600">{children}</div>
            </div>
        </div>
    );
}

function ImpressumContent() {
    const l = siteConfig.legal;
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Angaben gemäß § 5 DDG</h3>
            <p>
                {l.companyName}
                <br />
                {l.street}
                <br />
                {l.zip} {l.city}
            </p>
            <h3 className="text-lg font-semibold">Vertreten durch:</h3>
            <p>{l.managingDirector}</p>
            <h3 className="text-lg font-semibold">Kontakt:</h3>
            <p>
                Telefon: {l.phone}
                <br />
                E-Mail: {l.email}
            </p>
            <h3 className="text-lg font-semibold">Registereintrag:</h3>
            <p>
                Eintragung im Handelsregister.
                <br />
                Registergericht: {l.registerCourt}
                <br />
                Registernummer: {l.registerNumber}
            </p>
            <h3 className="text-lg font-semibold">Umsatzsteuer:</h3>
            <p>
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
                <br />
                {l.vatId}
            </p>
            <h3 className="text-lg font-semibold">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
            </h3>
            <p>
                {l.responsibleContent}
                <br />
                {l.street}
                <br />
                {l.zip} {l.city}
            </p>
            <h3 className="text-lg font-semibold">Streitschlichtung</h3>
            <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
                einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
            <p className="mt-8 text-sm text-gray-500">
                Hier findest du unseren Disclaimer und unsere Datenschutzerklärung über die Links im Footer.
            </p>
        </div>
    );
}

function DatenschutzContent() {
    const l = siteConfig.legal;
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">1. Datenschutz auf einen Blick</h3>
            <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
                Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
            </p>
            <h3 className="text-lg font-semibold">2. Verantwortliche Stelle</h3>
            <p>
                {l.companyName}, {l.street}, {l.zip} {l.city}
                <br />
                Telefon: {l.phone}
                <br />
                E-Mail: {l.email}
            </p>
            <h3 className="text-lg font-semibold">3. Datenerfassung auf dieser Website</h3>
            <p>
                <strong>Fragebogen-Daten:</strong> Wenn Sie unsere KI-Potenzialanalyse
                ausfüllen, werden die von Ihnen eingegebenen Daten auf Grundlage Ihrer
                Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bzw. zur Durchführung
                vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) verarbeitet.
            </p>
            <p>
                <strong>E-Mail-Kommunikation:</strong> Wenn Sie uns Ihre E-Mail-Adresse
                mitteilen, verwenden wir diese, um Ihnen Ihre Ergebnisse und ggf.
                weiterführende Informationen zuzusenden. Sie können diese Kommunikation
                jederzeit abbestellen, indem Sie auf den Abmeldelink in der E-Mail klicken
                oder uns direkt kontaktieren.
            </p>
            <h3 className="text-lg font-semibold">4. Hosting</h3>
            <p>
                Diese Website wird bei Vercel Inc. gehostet. Weitere Informationen finden
                Sie in der Datenschutzerklärung von Vercel unter
                https://vercel.com/legal/privacy-policy.
            </p>
            <h3 className="text-lg font-semibold">5. Ihre Rechte</h3>
            <p>
                Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung,
                Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch
                bezüglich Ihrer personenbezogenen Daten. Wenden Sie sich hierzu an:{" "}
                {l.email}
            </p>
        </div>
    );
}

function AGBContent() {
    const l = siteConfig.legal;
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">§1 Geltungsbereich</h3>
            <p>
                Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der
                KI-Potenzialanalyse auf {siteConfig.domain}, betrieben von{" "}
                {l.companyName}, {l.street}, {l.zip} {l.city}.
            </p>
            <h3 className="text-lg font-semibold">§2 Leistungsbeschreibung</h3>
            <p>
                Die KI-Potenzialanalyse ist eine kostenlose, unverbindliche
                Online-Auswertung, die eine algorithmische Einschätzung des
                KI-Reifegrads eines Unternehmens liefert. Die Ergebnisse dienen als
                erste Orientierungshilfe und stellen keine Beratungsleistung dar.
            </p>
            <h3 className="text-lg font-semibold">§3 Haftungsausschluss</h3>
            <p>
                Die Ergebnisse der KI-Potenzialanalyse basieren auf algorithmischen
                Schätzungen und erheben keinen Anspruch auf Vollständigkeit oder
                Richtigkeit. {l.companyName} haftet nicht für Entscheidungen, die auf
                Grundlage der Ergebnisse getroffen werden.
            </p>
            <h3 className="text-lg font-semibold">§4 Urheberrecht</h3>
            <p>
                Alle Inhalte dieser Website (Texte, Grafiken, Code) sind urheberrechtlich
                geschützt. Die Vervielfältigung, Bearbeitung oder Verbreitung bedarf der
                schriftlichen Zustimmung von {l.companyName}.
            </p>
            <h3 className="text-lg font-semibold">§5 Gerichtsstand</h3>
            <p>Gerichtsstand ist Berlin, Deutschland.</p>
        </div>
    );
}

function DisclaimerContent() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Haftung für Inhalte</h3>
            <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
                die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
                jedoch keine Gewähr übernehmen.
            </p>
            <h3 className="text-lg font-semibold">Haftung für Links</h3>
            <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren
                Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten
                Seiten ist stets der jeweilige Anbieter verantwortlich.
            </p>
            <h3 className="text-lg font-semibold">KI-Potenzialanalyse-Ergebnisse</h3>
            <p>
                Die im KI-Readiness-Check berechneten Scores, Einsparprognosen und
                Handlungsempfehlungen sind algorithmische Schätzungen auf Basis Ihrer
                Angaben. Sie ersetzen keine professionelle Unternehmensberatung. Die
                tatsächlichen Potenziale können von den geschätzten Werten abweichen.
            </p>
        </div>
    );
}

export default function Footer() {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const l = siteConfig.legal;

    return (
        <>
            <footer className="bg-brand-black text-white">
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                    <div className="grid gap-8 sm:grid-cols-3">
                        {/* Brand */}
                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green/20 text-sm font-bold text-brand-green">
                                    KI
                                </span>
                                <span className="font-headline text-lg font-semibold">
                                    {siteConfig.siteName}
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-400">
                                {siteConfig.description}
                            </p>
                        </div>

                        {/* Kontakt */}
                        <div>
                            <h3 className="mb-3 font-headline text-sm font-semibold uppercase tracking-wider text-gray-300">
                                Kontakt
                            </h3>
                            <div className="space-y-1 text-sm text-gray-400">
                                <p>{l.companyName}</p>
                                <p>{l.street}</p>
                                <p>
                                    {l.zip} {l.city}
                                </p>
                                <p className="pt-2">
                                    <a
                                        href={`tel:${l.phone}`}
                                        className="transition-colors hover:text-brand-green"
                                    >
                                        {l.phone}
                                    </a>
                                </p>
                                <p>
                                    <a
                                        href={`mailto:${l.email}`}
                                        className="transition-colors hover:text-brand-green"
                                    >
                                        {l.email}
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Rechtliches */}
                        <div>
                            <h3 className="mb-3 font-headline text-sm font-semibold uppercase tracking-wider text-gray-300">
                                Rechtliches
                            </h3>
                            <div className="flex flex-col gap-2 text-sm">
                                {[
                                    { id: "impressum", label: "Impressum" },
                                    { id: "datenschutz", label: "Datenschutzerklärung" },
                                    { id: "agb", label: "AGB" },
                                    { id: "disclaimer", label: "Disclaimer" },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveModal(item.id)}
                                        className="text-left text-gray-400 transition-colors hover:text-brand-green"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} {l.companyName}. Alle Rechte vorbehalten.
                    </div>
                </div>
            </footer>

            {/* Legal Modals */}
            {activeModal === "impressum" && (
                <LegalModal title="Impressum" onClose={() => setActiveModal(null)}>
                    <ImpressumContent />
                </LegalModal>
            )}
            {activeModal === "datenschutz" && (
                <LegalModal
                    title="Datenschutzerklärung"
                    onClose={() => setActiveModal(null)}
                >
                    <DatenschutzContent />
                </LegalModal>
            )}
            {activeModal === "agb" && (
                <LegalModal
                    title="Allgemeine Geschäftsbedingungen"
                    onClose={() => setActiveModal(null)}
                >
                    <AGBContent />
                </LegalModal>
            )}
            {activeModal === "disclaimer" && (
                <LegalModal title="Disclaimer" onClose={() => setActiveModal(null)}>
                    <DisclaimerContent />
                </LegalModal>
            )}
        </>
    );
}
