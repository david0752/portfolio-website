/**
 * Angol szövegek. A Messages típus miatt minden magyar kulcsnak itt is szerepelnie kell.
 */

import type { Messages } from "./hu.ts";

export const en: Messages = {
  nav: {
    work: "My work",
    about: "About",
    experience: "Experience",
    stack: "Stack",
    contact: "Contact",
    cta: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    home: "Home",
  },
  hero: {
    role: "Full-stack web developer",
    titleBefore: "Websites and web systems, from first plan to ",
    titleAccent: "launch",
    titleAfter: ".",
    lead: "I'm Dávid Szántó. I build React frontends and Node.js backends, secure and fast, with an admin interface anyone can use without coding skills.",
    available: "Available for new projects",
    primary: "See my work",
    secondary: "Contact",
  },
  work: {
    eyebrow: "01 / Work",
    title: "Selected work",
    lead: "Real projects for real clients. Each one comes with a detailed case study.",
    caseStudySoon: "Case study coming soon",
    caseStudy: "Case study",
    screenshotSoon: "Screenshot coming soon",
  },
  about: {
    eyebrow: "02 / About",
    title: "Clean code, considered details",
    paragraphs: [
      "I write clean, clear code without needless complexity.",
      "My sites are secure, take care of visitors' data, and work just as well on a phone as on a laptop.",
    ],
  },
  experience: {
    eyebrow: "03 / Experience",
    title: "Education and work",
    lead: "My studies and work, most recent first.",
    present: "present",
  },
  stack: {
    eyebrow: "04 / Stack",
    title: "What I work with",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      ops: "Database and operations",
    },
  },
  contact: {
    eyebrow: "05 / Contact",
    title: "Have a project in mind?",
    lead: "Tell me briefly how I can help. I usually reply within one or two working days.",
    emailLabel: "E-mail",
    form: {
      topic: "How can I help?",
      topicPlaceholder: "Choose a topic",
      topics: {
        "new-site": "New website",
        "existing-site": "Improving or fixing an existing site",
        "web-app": "Web application or admin system",
        other: "Other",
      },
      name: "Name",
      email: "E-mail address",
      message: "Message",
      messagePlaceholder: "What kind of site do you need, and what should it do?",
      submit: "Send message",
      sending: "Sending…",
      success: "Thank you, I got your message! I'll reply soon.",
      genericError: "The message could not be sent. Please try again later, or send me an e-mail.",
      privacyBefore: "By sending the message you accept the ",
      privacyLink: "privacy notice",
      privacyAfter: ".",
    },
  },
  footer: {
    rights: "All rights reserved.",
    privacy: "Privacy",
  },
  notFound: {
    code: "404",
    title: "Page not found",
    lead: "There may be a typo in the address, or the page no longer exists.",
    back: "Back to home",
  },
  pageTitles: {
    home: "Dávid Szántó – Full-stack web developer",
    privacy: "Privacy notice – Dávid Szántó",
    notFound: "Page not found – Dávid Szántó",
  },
};
