import React from "react";
import { addons, types } from "@storybook/manager-api";
import { IconButton } from "@storybook/components";
import { HomeIcon } from "@storybook/icons";
import { STORY_RENDERED } from "@storybook/core-events";

addons.register("custom", (api) => {
  addons.add("custom/home", {
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

  api.on(STORY_RENDERED, () => {
    const story = api.getCurrentStoryData();

    document.title = `${story.title.replace("/", " / ")} ⋅ Yamori Design`;
  });
});
