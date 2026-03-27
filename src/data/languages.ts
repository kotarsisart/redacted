// 1) Flags
const flagModules = import.meta.glob(
  "/src/assets/icons/langs/*.svg",
  { eager: true, import: "default" }
) as Record<string, string>;

function extractCode(path: string) {
  return path.split("/").pop()?.replace(".svg", "") || "";
}

// 2) Name map
function getLanguageName(code: string): string {
  const names: Record<string, string> = {
    ukrainian: "Українська",
    belorussian: "Беларуская",
    russian: "Русский",
    polish: "Polski",
    czech: "Čeština",
    slovak: "Slovenčina",
    bulgarian: "Български",
    serbian: "Српски",
    croatian: "Hrvatski",
    slovenian: "Slovenščina",
    macedonian: "Македонски",
    english: "English",
    german: "Deutsch",
    dutch: "Nederlands",
    swedish: "Svenska",
    norwegian: "Norsk",
    french: "Français",
    spanish: "Español",
    portuguese: "Português",
    italian: "Italiano",
    romanian: "Română",
    chinese: "中文",
    japanese: "日本語",
    korean: "한국어",
    hindi: "हिन्दी",
    bengali: "বাংলা",
    vietnamese: "Tiếng Việt",
    filipino: "Tagalog",
    arabic: "العربية",
    persian: "فارسی",
  };
  return names[code] || code;
}

// 3) Route codes
function getRouteCode(code: string): string {
  const map: Record<string, string> = {
    ukrainian: "uk",
    belorussian: "be",
    russian: "ru",
    polish: "pl",
    czech: "cs",
    slovak: "sk",
    bulgarian: "bg",
    serbian: "sr",
    croatian: "hr",
    slovenian: "sl",
    macedonian: "mk",
    english: "en",
    german: "de",
    dutch: "nl",
    swedish: "sv",
    norwegian: "no",
    french: "fr",
    spanish: "es",
    portuguese: "pt",
    italian: "it",
    romanian: "ro",
    chinese: "zh",
    japanese: "ja",
    korean: "ko",
    hindi: "hi",
    bengali: "bn",
    vietnamese: "vi",
    filipino: "tl",
    arabic: "ar",
    persian: "fa",
  };
  return map[code] || "en";
}

// 4) Language group classification
function getLanguageGroup(code: string): string {
  const groups: Record<string, string> = {
    ukrainian: "Slavic East",
    belorussian: "Slavic East",
    russian: "Slavic East",

    polish: "Slavic West",
    czech: "Slavic West",
    slovak: "Slavic West",

    bulgarian: "Slavic South",
    serbian: "Slavic South",
    croatian: "Slavic South",
    slovenian: "Slavic South",
    macedonian: "Slavic South",

    english: "European Germanic",
    german: "European Germanic",
    dutch: "European Germanic",
    swedish: "European Germanic",
    norwegian: "European Germanic",

    french: "European Romance",
    spanish: "European Romance",
    portuguese: "European Romance",
    italian: "European Romance",
    romanian: "European Romance",

    chinese: "Asian East",
    japanese: "Asian East",
    korean: "Asian East",

    hindi: "Asian South",
    bengali: "Asian South",
    vietnamese: "Asian South",
    filipino: "Asian South",

    arabic: "Asian Middle East",
    persian: "Asian Middle East",
  };
  return groups[code] || "Asian Other";
}

// 5) Strict types
export type Locale =
  | "en" | "pl" | "uk" | "ru" | "be"
  | "cs" | "sk" | "bg" | "mk" | "sr"
  | "hr" | "sl";

export type MainGroup = "Slavic" | "European" | "Asian";

export type SubGroup =
  | "East"
  | "West"
  | "South"
  | "Germanic"
  | "Romance"
  | "Middle East"
  | "Other";

export interface LanguageItem {
  code: string;
  routeCode: Locale;
  name: string;
  flag: string;
  alt: string;
  mainGroup: MainGroup;
  subGroup: SubGroup;
  enabled: boolean;
}

// 6) Normalize group → {main, sub}
function splitGroup(group: string): { main: MainGroup; sub: SubGroup } {
  if (group === "Asian Middle East") {
    return { main: "Asian", sub: "Middle East" };
  }

  const [mainRaw, subRaw] = group.split(" ");

  const main = (mainRaw as MainGroup) ?? "European";

  let sub: SubGroup;

  switch (subRaw) {
    case "East":
    case "West":
    case "South":
    case "Germanic":
    case "Romance":
    case "Middle":
      sub = subRaw as SubGroup;
      break;
    default:
      sub = "Other";
  }

  return { main, sub };
}

// 7) Active langs
const activeLangs = [
  "ukrainian",
  "belorussian",
  "russian",
  "polish",
  "czech",
  "slovak",
  "bulgarian",
  "serbian",
  "croatian",
  "slovenian",
  "macedonian",
  "english",
];

// 8) Build languages array (fully typed)
export const languages: LanguageItem[] = Object.entries(flagModules).map(
  ([path, flagUrl]) => {
    const code = extractCode(path);

    const group = getLanguageGroup(code);
    const { main, sub } = splitGroup(group);

    const name = getLanguageName(code);
    const enabled = activeLangs.includes(code);

    return {
      code,
      routeCode: getRouteCode(code) as Locale,
      name,
      flag: flagUrl,
      alt: `${name} flag`,
      mainGroup: main,
      subGroup: sub,
      enabled,
    };
  }
);

// 9) Sorting
const mainOrder: MainGroup[] = ["Slavic", "European", "Asian"];

const subOrder: Record<MainGroup, SubGroup[]> = {
  Slavic: ["East", "West", "South"],
  European: ["Germanic", "Romance"],
  Asian: ["East", "South", "Middle East"],
};

const customOrder = [
  "ukrainian",
  "belorussian",
  "russian",
];

languages.sort((a, b) => {
  const mainA = mainOrder.indexOf(a.mainGroup);
  const mainB = mainOrder.indexOf(b.mainGroup);
  if (mainA !== mainB) return mainA - mainB;

  const subA = subOrder[a.mainGroup].indexOf(a.subGroup);
  const subB = subOrder[b.mainGroup].indexOf(b.subGroup);
  if (subA !== subB) return subA - subB;
  
  const indexA = customOrder.indexOf(a.code);
  const indexB = customOrder.indexOf(b.code);

  if (indexA !== -1 && indexB !== -1) {
    return indexA - indexB;
  }
  return a.name.localeCompare(b.name);
});
