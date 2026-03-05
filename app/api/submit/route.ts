import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SlackBlock = Record<string, any>;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { answers, score, domain, timestamp } = body;

        const companyName = answers?.company_name || "Unbekannt";
        const contactName = answers?.contact_name || "Unbekannt";
        const contactEmail = answers?.contact_email || "-";
        const contactPhone = answers?.contact_phone || "-";
        const industry = answers?.industry || "-";
        const companySize = answers?.company_size || "-";
        const kiBudget = answers?.ki_budget || "-";
        const kiTimeline = answers?.ki_timeline || "-";
        const wantAnalysis = answers?.want_analysis || "no";

        const totalPercent = score?.percent ?? 0;
        const maturityLabel = score?.maturityLevel?.label || "-";
        const maturityEmoji = score?.maturityLevel?.emoji || "";
        const savings = score?.savings;

        // ─── Slack Survey Channel ───
        const slackToken = process.env.SLACK_BOT_TOKEN;
        const surveyChannel = process.env.SLACK_SURVEY_CHANNEL;
        const leadsChannel = process.env.SLACK_LEADS_CHANNEL;
        const webhookUrl = process.env.SLACK_WEBHOOK_URL;

        // Survey message (detailed)
        const surveyBlocks: SlackBlock[] = [
            {
                type: "header",
                text: { type: "plain_text", text: `📊 Neuer KI-Readiness Check — ${companyName}`, emoji: true },
            },
            {
                type: "section",
                fields: [
                    { type: "mrkdwn", text: `*Score:*\n${maturityEmoji} ${totalPercent}/100 (${maturityLabel})` },
                    { type: "mrkdwn", text: `*Unternehmen:*\n${companyName}` },
                    { type: "mrkdwn", text: `*Branche:*\n${industry}` },
                    { type: "mrkdwn", text: `*Größe:*\n${companySize}` },
                ],
            },
            {
                type: "section",
                fields: [
                    { type: "mrkdwn", text: `*Kontakt:*\n${contactName}` },
                    { type: "mrkdwn", text: `*E-Mail:*\n${contactEmail}` },
                    { type: "mrkdwn", text: `*Telefon:*\n${contactPhone}` },
                    { type: "mrkdwn", text: `*Analyse gewünscht:*\n${wantAnalysis === "yes" ? "✅ Ja" : "❌ Nein"}` },
                ],
            },
            {
                type: "section",
                fields: [
                    { type: "mrkdwn", text: `*Budget:*\n${kiBudget}` },
                    { type: "mrkdwn", text: `*Timeline:*\n${kiTimeline}` },
                ],
            },
        ];

        if (savings) {
            surveyBlocks.push({
                type: "section",
                fields: [
                    { type: "mrkdwn", text: `*Einsparpotenzial:*\n${savings.hoursPerYear?.toLocaleString("de-DE")} h/Jahr` },
                    { type: "mrkdwn", text: `*€-Potenzial:*\n${savings.eurosPerYear?.toLocaleString("de-DE")} €/Jahr` },
                ],
            });
        }

        // Category breakdown
        if (score?.categories?.length) {
            const catText = score.categories
                .map((c: { name: string; percent: number }) => `• ${c.name}: ${c.percent}%`)
                .join("\n");
            surveyBlocks.push({
                type: "section",
                text: { type: "mrkdwn", text: `*Kategorien:*\n${catText}` },
            });
        }

        surveyBlocks.push(
            { type: "divider" },
            {
                type: "context",
                elements: [
                    { type: "mrkdwn", text: `Domain: ${domain} | ${timestamp}` },
                ],
            }
        );

        // Lead message (compact)
        const leadBlocks = [
            {
                type: "header",
                text: { type: "plain_text", text: `🔥 Neuer Lead — ${companyName}`, emoji: true },
            },
            {
                type: "section",
                fields: [
                    { type: "mrkdwn", text: `*Name:*\n${contactName}` },
                    { type: "mrkdwn", text: `*E-Mail:*\n<mailto:${contactEmail}|${contactEmail}>` },
                    { type: "mrkdwn", text: `*Telefon:*\n${contactPhone !== "-" ? `<tel:${contactPhone}|${contactPhone}>` : "-"}` },
                    { type: "mrkdwn", text: `*Score:*\n${maturityEmoji} ${totalPercent}% (${maturityLabel})` },
                ],
            },
            {
                type: "section",
                fields: [
                    { type: "mrkdwn", text: `*Budget:*\n${kiBudget}` },
                    { type: "mrkdwn", text: `*Unternehmen:*\n${companyName} (${companySize})` },
                ],
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: { type: "plain_text", text: "📧 E-Mail senden" },
                        url: `mailto:${contactEmail}?subject=Ihr KI-Readiness Ergebnis (${totalPercent}%)`,
                    },
                    ...(contactPhone !== "-"
                        ? [
                            {
                                type: "button",
                                text: { type: "plain_text", text: "📞 Anrufen" },
                                url: `tel:${contactPhone}`,
                            },
                        ]
                        : []),
                ],
            },
        ];

        // Send to Slack
        if (slackToken) {
            const sendSlackMessage = async (channel: string, blocks: unknown[]) => {
                await fetch("https://slack.com/api/chat.postMessage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${slackToken}`,
                    },
                    body: JSON.stringify({ channel, blocks }),
                });
            };

            if (surveyChannel) {
                await sendSlackMessage(surveyChannel, surveyBlocks);
            }
            if (leadsChannel) {
                await sendSlackMessage(leadsChannel, leadBlocks);
            }
        } else if (webhookUrl) {
            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blocks: surveyBlocks }),
            });
        }

        // ─── Resend Email ───
        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey && contactEmail && contactEmail !== "-") {
            const recommendations = (score?.recommendations || [])
                .map((r: string) => `<li style="margin-bottom:8px">${r}</li>`)
                .join("");

            const savingsHtml = savings
                ? `<div style="background:#DDEBD3;border-radius:12px;padding:20px;margin:20px 0">
            <h3 style="margin:0 0 12px">💰 Ihr Einsparpotenzial</h3>
            <p style="margin:0;font-size:24px;font-weight:bold">${savings.eurosPerYear?.toLocaleString("de-DE")} € / Jahr</p>
            <p style="margin:4px 0 0;color:#666;font-size:14px">${savings.hoursPerYear?.toLocaleString("de-DE")} Stunden / Jahr einsparbar</p>
          </div>`
                : "";

            const emailHtml = `
        <div style="font-family:'Open Sans',system-ui,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#0D0D0D;padding:24px 32px;border-radius:16px 16px 0 0">
            <span style="display:inline-block;background:#bbd8a7;color:#0D0D0D;font-weight:bold;padding:4px 10px;border-radius:6px;font-size:14px;margin-right:8px">KI</span>
            <span style="color:white;font-weight:600">KI-Readiness Check</span>
          </div>
          <div style="background:white;padding:32px;border:1px solid #eee;border-top:none;border-radius:0 0 16px 16px">
            <h1 style="font-size:24px;margin:0 0 8px">${maturityEmoji} Ihr Ergebnis: ${maturityLabel}</h1>
            <p style="color:#666;margin:0 0 24px">Score: <strong>${totalPercent} von 100</strong></p>

            ${savingsHtml}

            ${recommendations ? `<h3 style="margin:24px 0 12px">🎯 Ihre Empfehlungen</h3><ol style="padding-left:20px;color:#444">${recommendations}</ol>` : ""}

            <div style="text-align:center;margin:32px 0 16px">
              <a href="https://calendly.com/trackbytrack/ki-beratung" style="display:inline-block;background:#bbd8a7;color:#0D0D0D;font-weight:bold;padding:14px 28px;border-radius:12px;text-decoration:none;font-size:16px">
                Kostenloses Beratungsgespräch buchen →
              </a>
            </div>
            <p style="text-align:center;color:#999;font-size:12px">
              Bei Fragen antworten Sie einfach auf diese E-Mail.
            </p>
          </div>
        </div>
      `;

            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${resendKey}`,
                },
                body: JSON.stringify({
                    from: `KI-Readiness Check <noreply@${domain || "ki-fuer-den-mittelstand.de"}>`,
                    to: contactEmail,
                    subject: `${maturityEmoji} Ihr KI-Readiness Ergebnis: ${totalPercent}% — ${maturityLabel}`,
                    html: emailHtml,
                }),
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Submit error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
