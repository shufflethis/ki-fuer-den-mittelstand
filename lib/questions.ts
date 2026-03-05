export type QuestionType = "text" | "dropdown" | "radio" | "multi" | "scale" | "matrix";

export interface Option {
  label: string;
  value: string;
  score?: number;
}

export interface MatrixRow {
  key: string;
  label: string;
}

export interface MatrixColumn {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Option[];
  matrixRows?: MatrixRow[];
  matrixColumns?: MatrixColumn[];
  scoreWeight?: number;
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
}

export interface Section {
  id: string;
  sectionNumber: number;
  title: string;
  emoji: string;
  subtitle: string;
  scoreWeight?: number;
  questions: Question[];
}

export const sections: Section[] = [
  {
    id: "company",
    sectionNumber: 1,
    title: "Unternehmensdaten",
    emoji: "🏢",
    subtitle: "Wir beginnen mit einigen Informationen zu Ihrem Unternehmen.",
    questions: [
      {
        id: "company_name",
        type: "text",
        label: "Ihr Unternehmen",
        placeholder: "Firmenname",
        required: true,
      },
      {
        id: "website",
        type: "text",
        label: "Website",
        placeholder: "www.beispiel.de",
      },
      {
        id: "industry",
        type: "dropdown",
        label: "Branche",
        required: true,
        options: [
          { label: "Industrie / Produktion", value: "industrie" },
          { label: "Handel / E-Commerce", value: "handel" },
          { label: "Dienstleistungen", value: "dienstleistungen" },
          { label: "Immobilien", value: "immobilien" },
          { label: "Gesundheit / Pharma", value: "gesundheit" },
          { label: "Finanzen / Versicherungen", value: "finanzen" },
          { label: "Software / IT", value: "software" },
          { label: "Medien / Marketing", value: "medien" },
          { label: "Bau / Handwerk", value: "bau" },
          { label: "Öffentlicher Sektor", value: "oeffentlich" },
          { label: "Sonstiges", value: "sonstiges" },
        ],
      },
      {
        id: "company_size",
        type: "dropdown",
        label: "Unternehmensgröße (Mitarbeitende)",
        required: true,
        options: [
          { label: "1–10", value: "1-10", score: 1 },
          { label: "11–50", value: "11-50", score: 2 },
          { label: "51–250", value: "51-250", score: 3 },
          { label: "251–1.000", value: "251-1000", score: 4 },
          { label: "1.000+", value: "1000+", score: 5 },
        ],
      },
      {
        id: "revenue",
        type: "dropdown",
        label: "Jahresumsatz (optional)",
        options: [
          { label: "unter 1 Mio. €", value: "unter-1m" },
          { label: "1–10 Mio. €", value: "1-10m" },
          { label: "10–50 Mio. €", value: "10-50m" },
          { label: "50–250 Mio. €", value: "50-250m" },
          { label: "250 Mio. €+", value: "250m+" },
        ],
      },
      {
        id: "role",
        type: "dropdown",
        label: "Ihre Rolle",
        required: true,
        options: [
          { label: "Geschäftsführer / Inhaber", value: "gf" },
          { label: "Vorstand / C-Level", value: "clevel" },
          { label: "Abteilungsleiter", value: "abteilungsleiter" },
          { label: "Digital / Marketing Lead", value: "digital" },
          { label: "IT Leitung", value: "it" },
          { label: "Innovation / Strategie", value: "innovation" },
          { label: "Sonstiges", value: "sonstiges" },
        ],
      },
    ],
  },
  {
    id: "structure",
    sectionNumber: 2,
    title: "Unternehmensstruktur",
    emoji: "👥",
    subtitle: "Welche Abteilungen gibt es und wie sind sie aufgestellt?",
    questions: [
      {
        id: "departments",
        type: "multi",
        label: "Welche Abteilungen gibt es in Ihrem Unternehmen?",
        options: [
          { label: "Vertrieb / Sales", value: "vertrieb" },
          { label: "Marketing", value: "marketing" },
          { label: "Kundenservice / Support", value: "service" },
          { label: "HR / Recruiting", value: "hr" },
          { label: "Produktion / Operations", value: "produktion" },
          { label: "Einkauf / Supply Chain", value: "einkauf" },
          { label: "IT / Software", value: "it" },
          { label: "Finanzen / Controlling", value: "finanzen" },
          { label: "Recht / Compliance", value: "recht" },
          { label: "Management / Strategie", value: "management" },
        ],
      },
      {
        id: "dept_headcount",
        type: "matrix",
        label: "Ungefähre Teamgröße pro Abteilung",
        matrixRows: [
          { key: "marketing", label: "Marketing" },
          { key: "sales", label: "Sales" },
          { key: "service", label: "Service" },
          { key: "administration", label: "Administration" },
          { key: "it", label: "IT" },
        ],
        matrixColumns: [
          { value: "0", label: "0" },
          { value: "1-5", label: "1–5" },
          { value: "6-20", label: "6–20" },
          { value: "20+", label: "20+" },
        ],
      },
    ],
  },
  {
    id: "ki_status",
    sectionNumber: 3,
    title: "Aktueller KI-Status",
    emoji: "🤖",
    subtitle: "Wie sieht der aktuelle Stand beim KI-Einsatz aus?",
    scoreWeight: 2,
    questions: [
      {
        id: "ki_usage",
        type: "radio",
        label: "Nutzt Ihr Unternehmen bereits KI-Tools?",
        scoreWeight: 2,
        required: true,
        options: [
          { label: "Nein, bisher nicht", value: "none", score: 0 },
          { label: "Erste Experimente / Tests", value: "experiments", score: 5 },
          { label: "Regelmäßige Nutzung einzelner Tools", value: "regular", score: 10 },
          { label: "Teil von bestehenden Prozessen", value: "processes", score: 15 },
          { label: "Strategischer Bestandteil", value: "strategic", score: 20 },
        ],
      },
      {
        id: "ki_tools",
        type: "multi",
        label: "Welche KI-Tools werden eingesetzt?",
        scoreWeight: 1,
        options: [
          { label: "ChatGPT / Claude", value: "chatgpt", score: 2 },
          { label: "Microsoft Copilot", value: "copilot", score: 3 },
          { label: "Midjourney / DALL-E", value: "midjourney", score: 2 },
          { label: "ElevenLabs / Voice AI", value: "elevenlabs", score: 3 },
          { label: "HeyGen / Video AI", value: "heygen", score: 3 },
          { label: "Marketing Automation", value: "marketing-auto", score: 4 },
          { label: "AI Analytics", value: "ai-analytics", score: 4 },
          { label: "Individuelle KI-Lösungen", value: "custom", score: 5 },
          { label: "Keine", value: "none", score: 0 },
        ],
      },
      {
        id: "ki_strategy",
        type: "radio",
        label: "Gibt es eine KI-Strategie in Ihrem Unternehmen?",
        scoreWeight: 2,
        required: true,
        options: [
          { label: "Nein", value: "none", score: 0 },
          { label: "In Planung", value: "planning", score: 3 },
          { label: "Erste Pilotprojekte", value: "pilots", score: 6 },
          { label: "Ja, in einzelnen Abteilungen", value: "partial", score: 9 },
          { label: "Ja, unternehmensweite Strategie", value: "full", score: 12 },
        ],
      },
    ],
  },
  {
    id: "processes",
    sectionNumber: 4,
    title: "Prozesse & Automatisierung",
    emoji: "⚙️",
    subtitle: "Wo fallen repetitive Aufgaben an und was könnte automatisiert werden?",
    questions: [
      {
        id: "time_consuming",
        type: "multi",
        label: "Welche Bereiche sind besonders zeitintensiv?",
        options: [
          { label: "Kundenanfragen / Support", value: "support" },
          { label: "Content / Marketing", value: "content" },
          { label: "Reporting / Analyse", value: "reporting" },
          { label: "Datenaufbereitung", value: "daten" },
          { label: "Angebotserstellung", value: "angebote" },
          { label: "Terminmanagement", value: "termine" },
          { label: "Recruiting / Bewerbungen", value: "recruiting" },
          { label: "Interne Kommunikation", value: "kommunikation" },
          { label: "Dokumentation", value: "dokumentation" },
          { label: "Produktion / Planung", value: "produktion" },
        ],
      },
      {
        id: "efficiency_loss",
        type: "text",
        label: "Wo sehen Sie die größten Effizienz-Verluste?",
        placeholder: "Beschreiben Sie kurz...",
      },
      {
        id: "automate_wish",
        type: "text",
        label: "Was würden Sie am liebsten automatisieren?",
        placeholder: "z.B. E-Mail-Beantwortung, Reporting...",
      },
      {
        id: "repetitive_hours",
        type: "radio",
        label: "Wie viele Stunden pro Woche werden für repetitive Aufgaben aufgewendet?",
        scoreWeight: 1.5,
        options: [
          { label: "Unter 5 Stunden", value: "under5", score: 2 },
          { label: "5–10 Stunden", value: "5-10", score: 4 },
          { label: "10–20 Stunden", value: "10-20", score: 6 },
          { label: "20+ Stunden", value: "20+", score: 8 },
        ],
      },
    ],
  },
  {
    id: "data",
    sectionNumber: 5,
    title: "Daten & Infrastruktur",
    emoji: "💾",
    subtitle: "Wie sind Ihre Daten organisiert und welche IT-Ressourcen stehen bereit?",
    questions: [
      {
        id: "data_location",
        type: "multi",
        label: "Wo liegen Ihre Unternehmensdaten?",
        options: [
          { label: "CRM-System", value: "crm", score: 3 },
          { label: "ERP-System", value: "erp", score: 3 },
          { label: "Excel / Google Sheets", value: "excel", score: 1 },
          { label: "Cloud-Tools (SaaS)", value: "cloud", score: 2 },
          { label: "Data Warehouse", value: "warehouse", score: 4 },
          { label: "Verteilt / unklar", value: "verteilt", score: 0 },
        ],
      },
      {
        id: "data_structure",
        type: "radio",
        label: "Wie strukturiert sind Ihre Daten?",
        scoreWeight: 1.5,
        required: true,
        options: [
          { label: "Sehr strukturiert & gut zugänglich", value: "structured", score: 8 },
          { label: "Teilweise strukturiert", value: "partial", score: 5 },
          { label: "Größtenteils unstrukturiert", value: "unstructured", score: 2 },
          { label: "Kaum vorhandene Datenbasis", value: "none", score: 0 },
        ],
      },
      {
        id: "internal_devs",
        type: "radio",
        label: "Haben Sie interne IT-/Entwicklungs-Ressourcen?",
        scoreWeight: 1,
        options: [
          { label: "Nein", value: "none", score: 0 },
          { label: "1–2 Personen", value: "small", score: 3 },
          { label: "Team von 3–10 Personen", value: "medium", score: 6 },
          { label: "Große IT-Abteilung", value: "large", score: 8 },
        ],
      },
    ],
  },
  {
    id: "marketing",
    sectionNumber: 6,
    title: "Marketing & Sichtbarkeit",
    emoji: "📡",
    subtitle: "Wie ist Ihr Unternehmen digital aufgestellt?",
    questions: [
      {
        id: "channels",
        type: "multi",
        label: "Welche Kanäle nutzen Sie?",
        options: [
          { label: "Website / SEO", value: "website", score: 2 },
          { label: "Social Media", value: "social", score: 2 },
          { label: "LinkedIn", value: "linkedin", score: 3 },
          { label: "Instagram / TikTok", value: "instagram", score: 2 },
          { label: "YouTube", value: "youtube", score: 2 },
          { label: "Reddit / Communities", value: "reddit", score: 2 },
          { label: "Newsletter", value: "newsletter", score: 2 },
          { label: "Paid Ads", value: "ads", score: 2 },
        ],
      },
      {
        id: "ki_visibility",
        type: "radio",
        label: "Wird Ihr Unternehmen in KI-Suchsystemen (z.B. ChatGPT, Perplexity) gefunden?",
        scoreWeight: 2,
        options: [
          { label: "Ja, regelmäßig", value: "regular", score: 10 },
          { label: "Teilweise", value: "partial", score: 6 },
          { label: "Kaum / selten", value: "rarely", score: 2 },
          { label: "Weiß ich nicht", value: "unknown", score: 0 },
        ],
      },
      {
        id: "ki_visibility_importance",
        type: "scale",
        label: "Wie wichtig ist Ihnen die Sichtbarkeit in KI-Suchsystemen?",
        scaleMin: 1,
        scaleMax: 5,
        scaleMinLabel: "Unwichtig",
        scaleMaxLabel: "Sehr wichtig",
      },
    ],
  },
  {
    id: "employees",
    sectionNumber: 7,
    title: "Mitarbeiter & Kompetenzen",
    emoji: "🎓",
    subtitle: "Wie steht es um KI-Know-how in Ihrem Team?",
    questions: [
      {
        id: "ki_affinity",
        type: "radio",
        label: "Wie schätzen Sie die KI-Affinität Ihres Teams ein?",
        scoreWeight: 1.5,
        required: true,
        options: [
          { label: "Keine Erfahrung", value: "none", score: 0 },
          { label: "Erste Experimente einzelner Mitarbeiter", value: "experiments", score: 3 },
          { label: "Einzelne Experten im Team", value: "experts", score: 6 },
          { label: "Mehrere Teams nutzen KI", value: "teams", score: 9 },
          { label: "KI ist Teil der Unternehmenskultur", value: "culture", score: 12 },
        ],
      },
      {
        id: "ki_training",
        type: "radio",
        label: "Gibt es KI-Schulungen oder Weiterbildungen?",
        scoreWeight: 1,
        options: [
          { label: "Nein", value: "none", score: 0 },
          { label: "Vereinzelt / ad hoc", value: "adhoc", score: 3 },
          { label: "Geplant", value: "planned", score: 5 },
          { label: "Regelmäßig", value: "regular", score: 8 },
        ],
      },
    ],
  },
  {
    id: "challenges",
    sectionNumber: 8,
    title: "Herausforderungen",
    emoji: "🎯",
    subtitle: "Vor welchen Herausforderungen steht Ihr Unternehmen?",
    questions: [
      {
        id: "challenges",
        type: "multi",
        label: "Welche Herausforderungen beschäftigen Sie aktuell?",
        options: [
          { label: "Fachkräftemangel", value: "fachkraefte" },
          { label: "Zu viele manuelle Prozesse", value: "manuell" },
          { label: "Steigende Kosten", value: "kosten" },
          { label: "Langsame Abläufe", value: "langsam" },
          { label: "Geringe digitale Sichtbarkeit", value: "sichtbarkeit" },
          { label: "Ineffiziente Kommunikation", value: "kommunikation" },
          { label: "Wettbewerbsdruck", value: "wettbewerb" },
        ],
      },
      {
        id: "ki_lever",
        type: "text",
        label: "In welchem Bereich könnte KI den größten Hebel bieten?",
        placeholder: "z.B. Kundenkommunikation, Datenanalyse...",
      },
    ],
  },
  {
    id: "budget",
    sectionNumber: 9,
    title: "Budget & Priorität",
    emoji: "💰",
    subtitle: "Wie hoch ist Ihre Investitionsbereitschaft für KI?",
    questions: [
      {
        id: "ki_budget",
        type: "radio",
        label: "Welches Budget ist für KI-Projekte eingeplant?",
        required: true,
        options: [
          { label: "Noch keines", value: "none", score: 0 },
          { label: "Unter 10.000 €", value: "under10k", score: 2 },
          { label: "10.000–50.000 €", value: "10-50k", score: 5 },
          { label: "50.000–200.000 €", value: "50-200k", score: 8 },
          { label: "200.000 €+", value: "200k+", score: 10 },
        ],
      },
      {
        id: "ki_timeline",
        type: "radio",
        label: "Wann möchten Sie mit KI-Projekten starten?",
        required: true,
        options: [
          { label: "Sofort / so schnell wie möglich", value: "asap", score: 10 },
          { label: "Innerhalb der nächsten 3 Monate", value: "3months", score: 7 },
          { label: "Innerhalb der nächsten 12 Monate", value: "12months", score: 4 },
          { label: "Noch offen / unklar", value: "open", score: 1 },
        ],
      },
    ],
  },
  {
    id: "closing",
    sectionNumber: 10,
    title: "Abschluss",
    emoji: "📊",
    subtitle: "Fast geschafft! Noch einige letzte Angaben für Ihr persönliches Ergebnis.",
    questions: [
      {
        id: "want_analysis",
        type: "radio",
        label: "Möchten Sie eine detaillierte Analyse Ihrer Ergebnisse per E-Mail erhalten?",
        options: [
          { label: "Ja, bitte!", value: "yes" },
          { label: "Nein, danke", value: "no" },
        ],
      },
      {
        id: "contact_name",
        type: "text",
        label: "Ihr Name",
        placeholder: "Vor- und Nachname",
        required: true,
      },
      {
        id: "contact_email",
        type: "text",
        label: "Ihre E-Mail-Adresse",
        placeholder: "name@unternehmen.de",
        required: true,
      },
      {
        id: "contact_phone",
        type: "text",
        label: "Telefonnummer (optional)",
        placeholder: "+49 ...",
      },
    ],
  },
];
