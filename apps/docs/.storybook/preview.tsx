import React, { useEffect } from "react";
import { Preview } from "@storybook/react";

import "@yamori-design/styles/dist/global.css";
import "./preview.scss";

type Theme = "light" | "dark" | "system";

export default {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: ["system", "light", "dark"] satisfies Theme[],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "system",
  },
  decorators: [
    (Story, context) => {
      const selectedTheme = (context.globals.theme as Theme) || "system";

      // TODO move to context or util
      useEffect(() => {
        if (selectedTheme === "system") {
          document.documentElement.removeAttribute("data-yamori-theme");
        } else {
          document.documentElement.setAttribute(
            "data-yamori-theme",
            selectedTheme
          );
        }
      }, [selectedTheme]);

      return <Story />;
    },
  ],
} satisfies Preview;
