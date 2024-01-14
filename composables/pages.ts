import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config.js";

const { theme } = resolveConfig(tailwindConfig) as { theme: any };

export const usePages = () =>
  useState("pages", () => [
    {
      id: "home",
      title: "Home",
      mainColor: theme.colors.secondary,
      secondaryColor: theme.colors["opposite-main"],
    },
    {
      id: "skills",
      title: "Skills",
      mainColor: theme.colors["opposite-main"],
      secondaryColor: theme.colors.secondary,
    },
    {
      id: "projects",
      title: "Projects",
      mainColor: theme.colors.secondary,
      secondaryColor: theme.colors["opposite-main"],
    },
    {
      id: "contact-me",
      title: "Contact Me",
      mainColor: theme.colors.secondary,
      secondaryColor: theme.colors["opposite-main"],
    },
  ]);
