import React from "react";
import { addons, types } from "@storybook/manager-api";
import { IconButton } from "@storybook/components";
import { HomeIcon } from "@storybook/icons";

// Register the addon
addons.register("home", () => {
  // Register the tool
  addons.add("home/tool", {
    type: types.TOOL,
    title: "Home",
    render: () => (
      <IconButton
        key="home/tool"
        title="Home"
        onClick={() => location.assign(location.origin)}
      >
        <HomeIcon />
      </IconButton>
    ),
  });
});
