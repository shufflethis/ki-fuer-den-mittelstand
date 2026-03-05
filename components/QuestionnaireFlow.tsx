"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { sections, type Question } from "@/lib/questions";
import type { Answers } from "@/lib/scoring";

interface QuestionnaireFlowProps {
    onComplete: (answers: Answers) => void;
    onSectionChange: (sectionIndex: number, percent: number) => void;
}

const fadeUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function TextInput({
    question,
    value,
    onChange,
}: {
    question: Question;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <input
            type={question.id === "contact_email" ? "email" : "text"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-brand-black
        outline-none transition-colors placeholder:text-gray-400
        focus:border-brand-green focus:ring-1 focus:ring-brand-green/30"
        />
    );
}

function DropdownInput({
    question,
    value,
    onChange,
}: {
    question: Question;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3
        text-brand-black outline-none transition-colors
        focus:border-brand-green focus:ring-1 focus:ring-brand-green/30"
        >
            <option value="">Bitte wählen...</option>
            {question.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}

function RadioInput({
    question,
    value,
    onChange,
}: {
    question: Question;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="space-y-2">
            {question.options?.map((opt) => {
                const selected = value === opt.value;
                return (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange(opt.value)}
                        className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3
              text-left transition-all duration-200
              ${selected
                                ? "border-brand-green bg-brand-dusty-green/50 shadow-sm"
                                : "border-gray-200 bg-white hover:border-brand-green/50 hover:bg-brand-dusty-green/20"
                            }`}
                    >
                        <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors
                ${selected ? "border-brand-green bg-brand-green" : "border-gray-300"}`}
                        >
                            {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                        </span>
                        <span className="text-sm font-medium text-brand-black">{opt.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

function MultiInput({
    question,
    value,
    onChange,
}: {
    question: Question;
    value: string[];
    onChange: (v: string[]) => void;
}) {
    const toggle = (optValue: string) => {
        if (value.includes(optValue)) {
            onChange(value.filter((v) => v !== optValue));
        } else {
            onChange([...value, optValue]);
        }
    };

    return (
        <div className="grid gap-2 sm:grid-cols-2">
            {question.options?.map((opt) => {
                const selected = value.includes(opt.value);
                return (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggle(opt.value)}
                        className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3
              text-left transition-all duration-200
              ${selected
                                ? "border-brand-green bg-brand-dusty-green/50 shadow-sm"
                                : "border-gray-200 bg-white hover:border-brand-green/50 hover:bg-brand-dusty-green/20"
                            }`}
                    >
                        <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors
                ${selected ? "border-brand-green bg-brand-green" : "border-gray-300"}`}
                        >
                            {selected && (
                                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </span>
                        <span className="text-sm font-medium text-brand-black">{opt.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

function ScaleInput({
    question,
    value,
    onChange,
}: {
    question: Question;
    value: string;
    onChange: (v: string) => void;
}) {
    const min = question.scaleMin || 1;
    const max = question.scaleMax || 5;
    const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    return (
        <div>
            <div className="flex justify-center gap-3">
                {range.map((n) => {
                    const selected = value === String(n);
                    return (
                        <button
                            key={n}
                            type="button"
                            onClick={() => onChange(String(n))}
                            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-semibold
                transition-all duration-200
                ${selected
                                    ? "scale-[1.15] border-brand-iris bg-brand-iris text-white shadow-md"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-brand-iris/50 hover:bg-brand-light-mauve/20"
                                }`}
                        >
                            {n}
                        </button>
                    );
                })}
            </div>
            {(question.scaleMinLabel || question.scaleMaxLabel) && (
                <div className="mt-2 flex justify-between px-2 text-xs text-gray-400">
                    <span>{question.scaleMinLabel || ""}</span>
                    <span>{question.scaleMaxLabel || ""}</span>
                </div>
            )}
        </div>
    );
}

function MatrixInput({
    question,
    value,
    onChange,
}: {
    question: Question;
    value: Record<string, string>;
    onChange: (v: Record<string, string>) => void;
}) {
    const rows = question.matrixRows;
    const columns = question.matrixColumns;
    if (!rows || !columns) return null;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr>
                        <th className="py-2 text-left font-medium text-gray-500" />
                        {columns.map((col) => (
                            <th key={col.value} className="px-2 py-2 text-center font-medium text-gray-500">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.key} className="border-t border-gray-100">
                            <td className="py-3 pr-4 font-medium text-brand-black">{row.label}</td>
                            {columns.map((col) => {
                                const selected = value[row.key] === col.value;
                                return (
                                    <td key={col.value} className="px-2 py-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() => onChange({ ...value, [row.key]: col.value })}
                                            className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full border-2
                        transition-all duration-200
                        ${selected
                                                    ? "border-brand-iris bg-brand-iris text-white"
                                                    : "border-gray-200 hover:border-brand-iris/50"
                                                }`}
                                        >
                                            {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                                        </button>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function QuestionnaireFlow({
    onComplete,
    onSectionChange,
}: QuestionnaireFlowProps) {
    const [idx, setIdx] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});

    const section = sections[idx];
    const progressPercent = Math.round(((idx + 1) / sections.length) * 100);

    useEffect(() => {
        onSectionChange(idx, progressPercent);
    }, [idx, progressPercent, onSectionChange]);

    const setAnswer = useCallback(
        (questionId: string, value: string | string[] | Record<string, string>) => {
            setAnswers((prev) => ({ ...prev, [questionId]: value }));
        },
        []
    );

    const isValid = useCallback(() => {
        return section.questions
            .filter((q) => q.required)
            .every((q) => {
                const val = answers[q.id];
                if (val === undefined || val === "") return false;
                if (Array.isArray(val) && val.length === 0) return false;
                return true;
            });
    }, [section.questions, answers]);

    const goNext = () => {
        if (idx < sections.length - 1) {
            setIdx((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            onComplete(answers);
        }
    };

    const goBack = () => {
        if (idx > 0) {
            setIdx((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const isLastSection = idx === sections.length - 1;

    return (
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
            <AnimatePresence mode="wait">
                <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Section Header */}
                    <div className="mb-8 text-center">
                        <span className="text-4xl">{section.emoji}</span>
                        <h2 className="mt-3 font-headline text-2xl font-bold text-brand-black sm:text-3xl">
                            {section.title}
                        </h2>
                        <p className="mt-2 text-gray-500">{section.subtitle}</p>
                    </div>

                    {/* Questions */}
                    <div className="space-y-6">
                        {section.questions.map((question, i) => (
                            <motion.div key={question.id} custom={i} initial="initial" animate="animate" variants={fadeUp}>
                                <label className="mb-2 block text-sm font-semibold text-brand-black">
                                    {question.label}
                                    {question.required && <span className="ml-1 text-red-400">*</span>}
                                </label>

                                {question.type === "text" && (
                                    <TextInput
                                        question={question}
                                        value={(answers[question.id] as string) || ""}
                                        onChange={(v) => setAnswer(question.id, v)}
                                    />
                                )}

                                {question.type === "dropdown" && (
                                    <DropdownInput
                                        question={question}
                                        value={(answers[question.id] as string) || ""}
                                        onChange={(v) => setAnswer(question.id, v)}
                                    />
                                )}

                                {question.type === "radio" && (
                                    <RadioInput
                                        question={question}
                                        value={(answers[question.id] as string) || ""}
                                        onChange={(v) => setAnswer(question.id, v)}
                                    />
                                )}

                                {question.type === "multi" && (
                                    <MultiInput
                                        question={question}
                                        value={(Array.isArray(answers[question.id]) ? answers[question.id] : []) as string[]}
                                        onChange={(v) => setAnswer(question.id, v)}
                                    />
                                )}

                                {question.type === "scale" && (
                                    <ScaleInput
                                        question={question}
                                        value={(answers[question.id] as string) || ""}
                                        onChange={(v) => setAnswer(question.id, v)}
                                    />
                                )}

                                {question.type === "matrix" && (
                                    <MatrixInput
                                        question={question}
                                        value={(answers[question.id] as Record<string, string>) || {}}
                                        onChange={(v) => setAnswer(question.id, v)}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="mt-10 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={goBack}
                            disabled={idx === 0}
                            className="flex items-center gap-1 rounded-xl px-5 py-3 text-sm font-medium text-gray-500
                transition-colors hover:bg-gray-100 hover:text-brand-black disabled:invisible"
                        >
                            ← Zurück
                        </button>
                        <button
                            type="button"
                            onClick={goNext}
                            disabled={!isValid()}
                            className="flex items-center gap-1 rounded-xl bg-brand-black px-6 py-3 text-sm font-semibold
                text-white shadow-md transition-all
                hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
                disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                        >
                            {isLastSection ? "Ergebnis anzeigen →" : "Weiter →"}
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
