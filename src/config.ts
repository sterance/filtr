export const APP_NAME = "filtr";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Input", href: "/input" },
  { label: "Output", href: "/output" },
  { label: "Products", href: "/products" },
];
