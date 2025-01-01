import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { phone: "320px" },
      container: {
        center: true,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        inactive: "#666666",
        selected: "#EEEEEE",
        selected_border: "#00A495",
        board_gray: "#BBBBBB",
        footer: "#F5F5F5",
        header: "#3D414D",
        cateBox: "#42464F",
        convenienceIcon: "#72757D",
        login_bg: "#EFEFEF",
        login_gray: "#9298AC",
        login_btnBg: "#F5F7FA",
        login_btnText: "#3F434E",
        login_arrowGray: "#73788B",
        login_blueBtn: "#3C0FA0",
      },
    },
  },
  plugins: [],
} satisfies Config;
