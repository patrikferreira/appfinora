"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import pt from "./locales/pt/translation.json";
import es from "./locales/es/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    es: { translation: es },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
  nsSeparator: false,
  returnEmptyString: false,
  parseMissingKeyHandler: (key) => {
    return key;
  },
});

const originalT = i18n.t.bind(i18n);
i18n.t = ((...args: Parameters<typeof i18n.t>) => {
  const [key, ...rest] = args;
  const normalizedKey = typeof key === "string" ? key.toLowerCase() : key;
  const newArgs: unknown[] = [normalizedKey, ...rest];
  const result = originalT(...(newArgs as Parameters<typeof i18n.t>));

  if (typeof result === "string" && result.length > 0) {
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}) as typeof i18n.t;

export default i18n;
