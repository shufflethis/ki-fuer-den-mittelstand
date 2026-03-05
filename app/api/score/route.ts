import { NextRequest, NextResponse } from "next/server";
import { calculateScore } from "@/lib/scoring";
import type { Answers } from "@/lib/scoring";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { answers } = body as { answers: Answers };

        if (!answers || typeof answers !== "object") {
            return NextResponse.json(
                { error: "Invalid answers payload" },
                { status: 400 }
            );
        }

        const result = calculateScore(answers);

        return NextResponse.json({
            percent: result.percent,
            maturityLevel: result.maturityLevel,
            categories: result.categories,
            recommendations: result.recommendations,
            savings: result.savings,
        });
    } catch (error) {
        console.error("Score error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
