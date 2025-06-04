/** @type {import('tailwindcss').Config} */

import { tokens } from "./src//design-system/generated/tokens.cjs";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...tokens,
      },
    },
  },
  plugins: [],
};
