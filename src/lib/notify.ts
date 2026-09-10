/**
 * Lead notification by email, over Resend's REST API.
 *
 * Uses fetch directly rather than an SDK so the project gains no new
 * dependency. Returns false instead of throwing: a notification failure must
 * never lose a lead that was already written to the database.
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

export function isNotifyConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.LEAD_NOTIFY_TO &&
      process.env.LEAD_NOTIFY_FROM,
  );
}

const row = (label: string, value?: string) =>
  value ? `<tr><td style="padding:6px 12px 6px 0;color:#666">${label}</td><td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td></tr>` : "";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function notifyNewLead(lead: LeadEmail): Promise<boolean> {
  if (!isNotifyConfigured()) return false;

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="margin:0 0 4px">New quote request — ${escapeHtml(lead.quoteId)}</h2>
      <p style="margin:0 0 16px;color:#666">Auto Moj website</p>
      <table style="border-collapse:collapse;font-size:14px">
        ${row("Name", lead.name)}
        ${row("Phone", lead.phone)}
        ${row("Email", lead.email)}
        ${row("Postcode", lead.postcode)}
        ${row("Registration", lead.regNumber)}
        ${row("Damage", lead.damageType)}
        ${row("Preferred date", lead.preferredDate)}
        ${row("Contact by", lead.contactMethod)}
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
