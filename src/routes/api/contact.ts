import { createFileRoute } from "@tanstack/react-router";

type Payload = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  message?: unknown;
  company?: unknown;
  /** Optional extras sent by the /packages form. */
  source?: unknown;
  businessName?: unknown;
  phone?: unknown;
  industry?: unknown;
  packageSelected?: unknown;
  timeline?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(error: string) {
  return Response.json({ success: false, error }, { status: 400 });
}

const HEADER = `
          <div style="margin:0 0 24px">
            <a href="https://royagency.com"><img src="https://royagency.com/email-logo.png" alt="ROY" height="48" style="height:48px;width:auto;border:0;display:block" /></a>
          </div>
        `;

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function readKey(context: unknown): string | undefined {
  const fromProcess =
    typeof process !== "undefined" ? process.env?.["RESEND_API_KEY"] : undefined;
  if (fromProcess) return fromProcess;
  const ctx = context as
    | { cloudflare?: { env?: Record<string, string> }; env?: Record<string, string> }
    | undefined;
  return ctx?.cloudflare?.env?.["RESEND_API_KEY"] ?? ctx?.env?.["RESEND_API_KEY"];
}

async function sendEmail(apiKey: string, body: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend request failed [${res.status}]: ${text}`);
  }
  return res.json();
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request, context }) => {
        let payload: Payload;
        try {
          payload = (await request.json()) as Payload;
        } catch {
          return bad("Invalid request body.");
        }

        if (typeof payload.company === "string" && payload.company.trim() !== "") {
          return Response.json({ success: true });
        }

        const name = typeof payload.name === "string" ? payload.name.trim() : "";
        const email = typeof payload.email === "string" ? payload.email.trim() : "";
        const projectType =
          typeof payload.projectType === "string" ? payload.projectType.trim() : "";
        const message = typeof payload.message === "string" ? payload.message.trim() : "";

        const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
        const isPackages = str(payload.source) === "packages";
        const businessName = str(payload.businessName);
        const phone = str(payload.phone);
        const industry = str(payload.industry);
        const packageSelected = str(payload.packageSelected);
        const timeline = str(payload.timeline);

        if (isPackages) {
          if (!businessName) return bad("Please enter your business name.");
          if (businessName.length > 120)
            return bad("Business name must be 120 characters or fewer.");
          if (phone.length > 40) return bad("Phone must be 40 characters or fewer.");
          if (!industry) return bad("Please select your type of business.");
          if (!packageSelected) return bad("Please pick a package.");
          if (
            industry.length > 120 ||
            packageSelected.length > 200 ||
            timeline.length > 120
          )
            return bad("One of your selections is too long.");
        }

        if (!name) return bad("Please enter your name.");
        if (name.length > 100) return bad("Name must be 100 characters or fewer.");
        if (!email || !EMAIL_RE.test(email) || email.length > 255)
          return bad("Please enter a valid email address.");
        if (projectType.length > 100)
          return bad("Project type must be 100 characters or fewer.");
        if (!message) return bad("Please include a message.");
        if (message.length > 5000)
          return bad("Message must be 5000 characters or fewer.");

        const apiKey = readKey(context);
        if (!apiKey) {
          console.error(
            "Contact form: RESEND_API_KEY is not configured in the server runtime.",
          );
          return Response.json(
            { success: false, error: "Email is not configured." },
            { status: 500 },
          );
        }

        const submittedAt = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          dateStyle: "full",
          timeStyle: "short",
        }).format(new Date());

        const row = (label: string, value: string) =>
          `<p style="margin:0 0 8px"><strong>${label}:</strong> ${esc(value)}</p>`;

        const details = isPackages
          ? [
              row("Full name", name),
              row("Company", businessName),
              row("Email", email),
              row("Phone", phone || "Not provided"),
              row("Industry", industry),
              row("Package selected", packageSelected),
              row("Timeline", timeline || "Not specified"),
            ].join("")
          : [
              row("Name", name),
              row("Email", email),
              row("Project type", projectType || "Not specified"),
            ].join("");

        const heading = isPackages
          ? `Package inquiry from ${esc(name)}`
          : `New inquiry from ${esc(name)}`;

        const notification = `
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">${HEADER}
            <h2 style="margin:0 0 16px">${heading}</h2>
            ${details}
            <p style="margin:0 0 8px"><strong>Submitted:</strong> ${esc(submittedAt)} (America/New_York)</p>
            <p style="margin:16px 0 8px"><strong>Message:</strong></p>
            <div style="white-space:pre-wrap;padding:12px 16px;background:#f5f5f5;border-radius:6px">${esc(message)}</div>
          </div>
        `;

        try {
          await sendEmail(apiKey, {
            from: "ROY Website <hello@royagency.com>",
            to: ["jordan@royagency.com", "josh@royagency.com"],
            reply_to: email,
            subject: isPackages
              ? `Package inquiry from ${name} - ${packageSelected}`
              : `New inquiry from ${name}`,
            html: notification,
          });
        } catch (err) {
          console.error("Contact form: notification email failed.", err);
          return Response.json(
            { success: false, error: "Could not send your message." },
            { status: 500 },
          );
        }

        const autoReply = `
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">${HEADER}
            <p style="margin:0 0 14px">Hi ${esc(name.split(" ")[0] || name)},</p>
            <p style="margin:0 0 14px">Thanks for reaching out. We have your message and someone from our team will get back to you within one business day.</p>
            <p style="margin:0 0 14px">If it is urgent, call us at 614-264-6965.</p>
            <p style="margin:0">ROY<br />Columbus, Ohio</p>
          </div>
        `;

        try {
          await sendEmail(apiKey, {
            from: "ROY Agency <hello@royagency.com>",
            to: [email],
            reply_to: "jordan@royagency.com",
            subject: "Thanks for reaching out to ROY",
            html: autoReply,
          });
        } catch (err) {
          console.error("Contact form: auto-reply failed (lead still captured).", err);
        }

        return Response.json({ success: true });
      },
    },
  },
});
