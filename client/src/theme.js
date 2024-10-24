import { extendTheme } from "@chakra-ui/react";
import { color } from "framer-motion";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

const theme = extendTheme({
  colors: {
    brand: {
      0: "#FFFFFF", //white
      1: "#000000", //black
      2: "#f7fafc",
      3: "#c0c0c0",
      4: "#708090",
      5: "#2A3439", // medium gray
      100: "#caf0f8",
      200: "#ade8f4",
      300: "#90e0ef",
      400: "#48cae4",
      500: "#00b4d8",
      600: "#0096c7",
      700: "#0077b6",
      800: "#023e8a",
      900: "#03045e",
      accent: "#ff6b6b", // Red accent
      success: "#51cf66", // Green success
      warning: "#ffd43b", // Yellow warning
      muted: "#6c757d", // Muted text
    },
  },

  styles: {
    global: () => ({
      "html, body": {
        background: "brand.0",
        color: "brand.1",
        transition: "background-color 0.2s ease, color 0.2s ease",
      },
      "input:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0px 1000px white inset`,
        backgroundColor: "white !important",
        transition: "background-color 5000s ease-in-out 0s",
      },
      "&:-webkit-autofill:hover": {
        WebkitBoxShadow: `0 0 0px 1000px white inset`,
        backgroundColor: "white !important",
      },
      "&:-webkit-autofill:focus": {
        WebkitBoxShadow: `0 0 0px 1000px white inset`,
        backgroundColor: "white !important",
      },
      "&:-webkit-autofill:active": {
        WebkitBoxShadow: `0 0 0px 1000px white inset`,
        backgroundColor: "white !important",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
    },
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "brand.0",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
    Text: {
      baseStyle: {
        color: "brand.1", // Đặt màu sắc tại baseStyle
      },
    },
  },
});

export default theme;
