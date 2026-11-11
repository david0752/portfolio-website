/**
 * Kapcsolati űrlap (téma, név, e-mail, üzenet + rejtett spamcsapda mező). A téma a közös Select komponens
 * (nem a böngésző saját választója); kötelező, ezért beküldéskor itt ellenőrizzük. A backend POST /api/contact
 * végpontjára küld; betöltés, siker és hiba állapotot mutat. Magyarul a backend hibaüzenete látszik,
 * angolul az általános (lefordított) hibaszöveg.
 */

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";

import { messages, paths, type Lang } from "../../i18n/index.ts";
import { CONTACT_LIMITS, CONTACT_TOPICS, sendContact, type ContactTopic } from "../../utils/contact.ts";
import { buttonPrimary } from "./Button.tsx";
import { Select } from "./Select.tsx";

// Az üzenetmező eddig a magasságig nő a szöveggel, utána görgethető lesz.
const MESSAGE_MAX_HEIGHT = 200;

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success"; text: string } | { kind: "error"; text: string };

const fieldClass =
  "mt-2 w-full rounded-lg border border-line bg-card-navy px-4 py-3 text-ice-white placeholder:text-slate transition-colors focus:border-signal-blue focus:outline-none focus-visible:outline-2 focus-visible:outline-neon-cyan";

export function ContactForm({ lang }: { lang: Lang }) {
  const t = messages(lang);
  const f = t.contact.form;
  const [topic, setTopic] = useState<ContactTopic | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [topicError, setTopicError] = useState(false);
  const topicRef = useRef<HTMLButtonElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Az üzenetmező magassága a tartalmához igazodik (a rows az alapmagasság), a felső határ felett görget.
  // A nyelvváltás is számít, mert más a placeholder hossza.
  useLayoutEffect(() => {
    const field = messageRef.current;
    if (!field) return;
    field.style.height = "auto";
    const height = Math.min(field.scrollHeight, MESSAGE_MAX_HEIGHT);
    field.style.height = `${height}px`;
    field.style.overflowY = field.scrollHeight > MESSAGE_MAX_HEIGHT ? "auto" : "hidden";
  }, [message, lang]);

  // A választó nem natív mező, ezért a böngésző nem ellenőrzi. A küldés gomb kattintásakor is ezt nézzük először
  // (a böngésző saját ellenőrzése előtt), mert a téma az első mező, a hibának is ott kell előbb látszania.
  function requireTopic(): boolean {
    if (topic) return true;
    setTopicError(true);
    topicRef.current?.focus();
    return false;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!requireTopic()) return;
    setStatus({ kind: "sending" });

    try {
      await sendContact({ topic, name, email, message, website });
      setStatus({ kind: "success", text: f.success });
      setTopic("");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      const backendText = error instanceof Error ? error.message : "";
      setStatus({ kind: "error", text: lang === "hu" && backendText ? backendText : f.genericError });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={handleSubmit} className="rounded-[14px] border border-line bg-deep-navy p-6 sm:p-8" noValidate={false}>
      <div className="mb-5">
        <Select
          label={f.topic}
          value={topic}
          placeholder={f.topicPlaceholder}
          options={CONTACT_TOPICS.map((id) => ({ value: id, label: f.topics[id] }))}
          onChange={(value) => {
            setTopic(value);
            setTopicError(false);
          }}
          error={topicError ? f.topicRequired : undefined}
          buttonRef={topicRef}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ice-white">
          {f.name}
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            maxLength={CONTACT_LIMITS.name}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium text-ice-white">
          {f.email}
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={CONTACT_LIMITS.email}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-ice-white">
        {f.message}
        <textarea
          ref={messageRef}
          name="message"
          required
          rows={5}
          minLength={CONTACT_LIMITS.messageMin}
          maxLength={CONTACT_LIMITS.message}
          placeholder={f.messagePlaceholder}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${fieldClass} resize-none`}
        />
      </label>
      <p className="mt-2 text-right font-mono text-xs text-slate" aria-live="polite">
        {message.length} / {CONTACT_LIMITS.message}
      </p>

      {/* Spamcsapda: látogató nem látja és nem tölti ki, a botok igen. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate">
          {f.privacyBefore}
          <a href={paths(lang).privacy} className="text-signal-blue underline underline-offset-4">
            {f.privacyLink}
          </a>
          {f.privacyAfter}
        </p>
        <button
          type="submit"
          disabled={sending}
          onClick={(event) => {
            if (!requireTopic()) event.preventDefault();
          }}
          className={`${buttonPrimary} shrink-0`}
        >
          {sending ? f.sending : f.submit}
        </button>
      </div>

      <div aria-live="polite">
        {status.kind === "success" && (
          <p className="mt-5 rounded-lg border border-signal-blue/40 bg-signal-blue/10 px-4 py-3 text-sm text-ice-white">{status.text}</p>
        )}
        {status.kind === "error" && (
          <p role="alert" className="mt-5 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-ice-white">
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
