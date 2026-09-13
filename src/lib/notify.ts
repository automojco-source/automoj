/**
 * Lead notification for new quote requests.
 *
 * Two independent channels, either or both may be configured:
 *  - Telegram (a bot message via the Bot API) — the primary channel.
 *  - Email (via Resend's REST API) — optional, off unless its three env
 *    vars are set.
 *
 * Both use fetch directly rather than an SDK, so neither channel adds a new
 * dependency. Every send function returns false instead of throwing: a
 * notification failure must never lose a lead that was already written to
 * the database.
 */

type LeadEmail = {
  quoteId: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  regNumber: string;
  damageType: string;
  contactMethod: string;
  description?: string;
  preferredDate?: string;
};

export function isTelegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.LEAD_NOTIFY_TO &&
      process.env.LEAD_NOTIFY_FROM,
  );
}

/** True if at least one notification channel is set up. */
export function isNotifyConfigured(): boolean {
  return isTelegramConfigured() || isEmailConfigured();
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Telegram's "MarkdownV2" requires escaping these characters anywhere they
// appear in user-supplied text, or the whole message is rejected.
function escapeMarkdownV2(s: string) {
  return s.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

function telegramLine(label: string, value?: string) {
  if (!value) return "";
  return `*${escapeMarkdownV2(label)}:* ${escapeMarkdownV2(value)}\n`;
}

async function sendTelegram(lead: LeadEmail): Promise<boolean> {
  if (!isTelegramConfigured()) return false;

  const text =
    `🚗 *New quote request* — \`${escapeMarkdownV2(lead.quoteId)}\`\n\n` +
    telegramLine("Name", lead.name) +
    telegramLine("Phone", lead.phone) +
    telegramLine("Email", lead.email) +
    telegramLine("Postcode", lead.postcode) +
    telegramLine("Registration", lead.regNumber) +
    telegramLine("Damage", lead.damageType) +
    telegramLine("Preferred date", lead.preferredDate) +
    telegramLine("Contact by", lead.contactMethod) +
    (lead.description
      ? `\n*Notes:*\n${escapeMarkdownV2(lead.description)}`
      : "");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: "MarkdownV2",
        }),
      },
    );
    if (!res.ok) {
      console.error("[notify] Telegram rejected the message", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[notify] Could not reach Telegram", error);
    return false;
  }
}

const emailRow = (label: string, value?: string) =>
  value ? `<tr><td style="padding:6px 12px 6px 0;color:#666">${label}</td><td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td></tr>` : "";

async function sendEmail(lead: LeadEmail): Promise<boolean> {
  if (!isEmailConfigured()) return false;

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="margin:0 0 4px">New quote request — ${escapeHtml(lead.quoteId)}</h2>
      <p style="margin:0 0 16px;color:#666">Auto Moj website</p>
      <table style="border-collapse:collapse;font-size:14px">
        ${emailRow("Name", lead.name)}
        ${emailRow("Phone", lead.phone)}
        ${emailRow("Email", lead.email)}
        ${emailRow("Postcode", lead.postcode)}
        ${emailRow("Registration", lead.regNumber)}
        ${emailRow("Damage", lead.damageType)}
        ${emailRow("Preferred date", lead.preferredDate)}
        ${emailRow("Contact by", lead.contactMethod)}
      </table>
      ${lead.description ? `<p style="margin:16px 0 0;font-size:14px"><strong>Notes</strong><br>${escapeHtml(lead.description)}</p>` : ""}
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEAD_NOTIFY_FROM,
        to: [process.env.LEAD_NOTIFY_TO],
        reply_to: lead.email,
        subject: `New quote ${lead.quoteId} — ${lead.name} (${lead.regNumber})`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[notify] Resend rejected the message", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[notify] Could not reach Resend", error);
    return false;
  }
}

/**
 * Sends the new-lead notification on every configured channel. Returns true
 * if at least one channel succeeded (or if none is configured yet — the
 * caller only uses this to decide whether it can promise the customer
 * "we'll be in touch shortly" versus falling back to a slower manual check).
 */
export async function notifyNewLead(lead: LeadEmail): Promise<boolean> {
  if (!isNotifyConfigured()) return false;

  const results = await Promise.all([
    isTelegramConfigured() ? sendTelegram(lead) : Promise.resolve(null),
    isEmailConfigured() ? sendEmail(lead) : Promise.resolve(null),
  ]);

  return results.some((r) => r === true);
}
