/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        "primary-900": "#4078FF",
        "primary-800": "#5C83FF",
        "primary-700": "#728FFF",
        "primary-600": "#869AFF",
        "primary-500": "#97A6FF",
        "primary-400": "#A8B2FF",
        "primary-300": "#B7BFFF",
        "primary-200": "#E3E5FF",
        "primary-100": "#F0F1FF",

        "neutral-900": "#0E1422",
        "neutral-800": "#202533",
        "neutral-700": "#333845",
        "neutral-600": "#474B57",
        "neutral-500": "#5C5F6A",
        "neutral-400": "#71747E",
        "neutral-300": "#878A92",
        "neutral-200": "#B6B7BC",
        "neutral-100": "#E6E7E8",

        "white-900": "#FFFFFF",
        "white-100": "#F6F6F6",
        "white-200": "#E9E9EB",

        "B-900": "#306CEF",
        "B-900": "#477CF1",
        "B-700": "#5E8CF3",
        "B-600": "#759DF4",
        "B-500": "#8CADF6",
        "B-400": "#A3BEF8",
        "B-300": "#BACEFA",
        "B-200": "#D1DEFB",
        "B-100": "#E8EFFD",

        "R-900": "#BE1313",
        "R-900": "#C83727",
        "R-700": "#D14F3A",
        "R-600": "#D9644E",
        "R-500": "#E17862",
        "R-400": "#E88C77",
        "R-300": "#EE9F8D",
        "R-200": "#F8C5B9",
        "R-100": "#FBD9D0",

        "G-900": "#057234",
        "G-900": "#2C7F45",
        "G-700": "#458B56",
        "G-600": "#5A9868",
        "G-500": "#6FA479",
        "G-400": "#83B18B",
        "G-300": "#98BE9E",
        "G-200": "#C1D8C4",
        "G-100": "#D5E5D7",

        "Y-900": "#F3B40A",
        "Y-900": "#F6BB33",
        "Y-700": "#F9C14C",
        "Y-600": "#FBC862",
        "Y-500": "#FDCF76",
        "Y-400": "#FFD58A",
        "Y-300": "#FFDC9E",
        "Y-200": "#FFEAC4",
        "Y-100": "#FFF1D8",

        "blue-700": "#2547D0",
        "blue-500": "#335CFF",
        "blue-50": "#EBF1FF",
        green: "#21C16B",
        green: "#D1FBE9",
        red: "#FB3748",
        red: "#FFD5D8",
      },
      fontSize: {
        "heading-1": [
          "2.5rem",
          {
            lineHeight: "150%",
            fontWeight: "600",
          },
        ],
        "heading-2": [
          "2rem",
          {
            fontWeight: "600",
          },
        ],
        "heading-3": [
          "1.5rem",
          {
            fontWeight: "700",
          },
        ],
        "heading-4-medium": [
          "1.125rem",
          {
            fontWeight: "500",
          },
        ],
        "heading-4-semi-bold": [
          "1.125rem",
          {
            fontWeight: "600",
          },
        ],
        "heading-5": [
          "1rem",
          {
            fontWeight: "600",
          },
        ],
        "heading-6": [
          "0.875rem",
          {
            fontWeight: "500",
          },
        ],
        "body-regular": [
          "0.875rem",
          {
            lineHeight: "175%",
          },
        ],
        "body-medium": [
          "0.875rem",
          {
            lineHeight: "175%",
            fontWeight: "500",
          },
        ],
        "label-normal": [
          "0.75rem",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        "body-medium": [
          "0.75rem",
          {
            lineHeight: "175%",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
};
