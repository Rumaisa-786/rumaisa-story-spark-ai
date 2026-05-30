import { useState, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Mail,
  User,
  FileText,
  Pencil,
  Send,
  GitBranch,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Zap,
} from "lucide-react";

import { instance as axios } from "../../helpers/axios/axionInstance";
import { getBaseUrl } from "../../helpers/config";
import storybook from "../../assets/storybook.png";

type FormData = {
  fullname: string;
  email: string;
  subject: string;
  message: string;
};

type FormField = "fullname" | "email" | "subject" | "message";

const INITIAL_FORM_DATA: FormData = {
  fullname: "",
  email: "",
  subject: "",
  message: "",
};

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    label: "Email us",
    value: "ronichandrasarkar@gmail.com",
    href: "mailto:ronichandrasarkar@gmail.com",
    color: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-500 dark:text-blue-400",
    hoverBorder: "hover:border-blue-500/30",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "ronisarkarexe/story-spark-ai",
    href: "https://github.com/ronisarkarexe/story-spark-ai",
    color: "from-purple-500/10 to-violet-500/10",
    iconColor: "text-purple-500 dark:text-purple-400",
    hoverBorder: "hover:border-purple-500/30",
  },
];

const FORM_FIELDS = [
  {
    id: "contact-fullname",
    name: "fullname" as FormField,
    type: "text",
    label: "Full Name",
    placeholder: "Jane Smith",
    icon: User,
    autoComplete: "name",
  },
  {
    id: "contact-email",
    name: "email" as FormField,
    type: "email",
    label: "Email Address",
    placeholder: "jane@example.com",
    icon: Mail,
    autoComplete: "email",
  },
  {
    id: "contact-subject",
    name: "subject" as FormField,
    type: "text",
    label: "Subject",
    placeholder: "What's this about?",
    icon: FileText,
    autoComplete: "off",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isSubmittingRef = useRef(false);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const fieldName = e.target.name as FormField;
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    const t = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };
    if (!t.fullname || !t.email || !t.subject || !t.message) {
      setError("All fields are required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    try {
      setError("");
      setSuccess(false);
      if (!validateForm()) return;
      setLoading(true);
      const response = await axios.post(`${getBaseUrl()}/contact`, {
        fullname: formData.fullname.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });
      if (response?.data?.success) {
        setSuccess(true);
        setFormData(INITIAL_FORM_DATA);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Contact Form Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please check your connection.",
      );
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 w-full box-border"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none select-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 box-border">
        
        <div className="mb-8 flex flex-col items-center text-center lg:hidden select-none">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/10 dark:border-white/10 bg-blue-500/5 text-blue-600 dark:text-blue-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
            <Zap className="h-3 w-3" aria-hidden="true" />
            Get in Touch
          </span>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12 xl:gap-16 w-full box-border">

          <div className="flex flex-col w-full box-border">
            <span className="mb-6 hidden w-fit items-center gap-1.5 rounded-full border border-blue-500/10 dark:border-white/10 bg-blue-500/5 text-blue-600 dark:text-blue-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wider lg:inline-flex select-none">
              <Zap className="h-3 w-3" aria-hidden="true" />
              Get in Touch
            </span>

            <h1
              id="contact-heading"
              className="font-extrabold tracking-tight text-slate-900 dark:text-white text-3xl sm:text-5xl lg:text-6xl leading-tight"
            >
              Let's Start a <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                Conversation
              </span>
            </h1>

            <div aria-hidden="true" className="h-[2px] w-12 bg-gradient-to-r from-blue-600 to-indigo-600 mt-5 rounded-full select-none" />

            <p className="mt-5 max-w-md text-xs sm:text-sm lg:text-base font-medium leading-relaxed text-slate-600 dark:text-slate-400">
              Have a story idea, a feature suggestion, or just want to say
              hello? We read every message and respond within 24 hours.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 select-none w-full box-border">
              {[
                { value: "24h",   label: "Response time"  },
                { value: "100%",  label: "Read rate"      },
                { value: "Open",  label: "Source project" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white dark:border-white/5 dark:bg-[#111827]/40 p-3 text-center sm:p-4 shadow-sm"
                >
                  <p className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{value}</p>
                  <p className="mt-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mt-6 sm:mt-8 space-y-3 list-none p-0 m-0 w-full box-border" aria-label="Contact channels">
              {CONTACT_CHANNELS.map(({ icon: Icon, label, value, href, color, iconColor, hoverBorder }) => (
                <li key={label} className="w-full">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label}: ${value}`}
                    className={`group flex items-center gap-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827]/30 p-3 sm:p-4 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-[1.005] hover:shadow-md ${hoverBorder}`}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/10 bg-gradient-to-br ${color} ${iconColor} select-none`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 select-none">
                        {label}
                      </span>
                      <span className="block truncate text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-slate-400 transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-600 dark:group-hover:text-slate-300 select-none"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div aria-hidden="true" className="relative mt-10 hidden items-end lg:flex select-none w-full box-border">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl -z-10 opacity-40 pointer-events-none" />
              <img
                src={storybook}
                alt=""
                className="relative z-10 w-full max-w-[280px] xl:max-w-[320px] object-contain drop-shadow-xl"
              />
            </div>
          </div>

          <div className="w-full lg:sticky lg:top-24 box-border">
            <div className="w-full bg-white dark:bg-[#111827]/40 border border-slate-200 dark:border-white/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 box-border">
              
              <div className="mb-6 select-none">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Send a Message
                </h2>
                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                  We'll evaluate and get back to you within 24 hours.
                </p>
              </div>

              <form
                onSubmit={submitHandler}
                noValidate
                aria-label="Contact form"
                className="space-y-4 w-full box-border"
              >
                {FORM_FIELDS.map(({ id, name, type, label, placeholder, icon: Icon, autoComplete }) => (
                  <div key={id} className="group w-full">
                    <label
                      htmlFor={id}
                      className="mb-1.5 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 select-none"
                    >
                      {label}
                    </label>
                    <div className="relative w-full">
                      <Icon
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors duration-150 group-focus-within:text-blue-500"
                      />
                      <input
                        id={id}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={changeHandler}
                        required
                        autoComplete={autoComplete}
                        className="w-full h-11 bg-slate-50 text-slate-800 border border-slate-200 placeholder-slate-400 dark:bg-slate-900/50 dark:border-white/10 dark:text-slate-100 dark:placeholder-slate-500 rounded-xl pl-10 pr-4 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all duration-150 box-border"
                      />
                    </div>
                  </div>
                ))}

                <div className="group w-full">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 select-none"
                  >
                    Message
                  </label>
                  <div className="relative w-full">
                    <Pencil
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 transition-colors duration-150 group-focus-within:text-blue-500"
                    />
                    <textarea
                      id="contact-message"
                      rows={5}
                      name="message"
                      placeholder="Tell us what's on your mind…"
                      value={formData.message}
                      onChange={changeHandler}
                      required
                      className="w-full resize-none bg-slate-50 text-slate-800 border border-slate-200 placeholder-slate-400 dark:bg-slate-900/50 dark:border-white/10 dark:text-slate-100 dark:placeholder-slate-500 rounded-xl pb-4 pl-10 pr-4 pt-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all duration-150 box-border leading-relaxed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  aria-label={loading ? "Sending message…" : "Send message"}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl shadow-md shadow-blue-500/10 transition-all duration-150 active:scale-[0.98] disabled:opacity-50 select-none uppercase tracking-wider cursor-pointer mt-1 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {success && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] px-4 py-3.5 mt-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
                    <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 tracking-tight">
                      Message sent — we'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {error && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.02] px-4 py-3.5 mt-4"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400" aria-hidden="true" />
                    <p className="text-xs sm:text-sm font-semibold text-red-500 dark:text-red-400 tracking-tight">{error}</p>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}