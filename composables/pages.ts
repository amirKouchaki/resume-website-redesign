export const usePages = () =>
  useState("pages", () => [
    { id: "home", title: "Home" },
    { id: "skills", title: "Skills" },
    { id: "projects", title: "Projects" },
    { id: "contact-me", title: "Contact Me" },
  ]);
