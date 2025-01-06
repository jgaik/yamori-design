/* eslint-disable storybook/default-exports */
import { addons } from "@storybook/manager-api";
import { STORY_RENDERED } from "@storybook/core-events";

addons.register("custom", (api) => {
  // Disable until storybook fixes the issue with React 19
  // addons.add("custom/home", {
  //   type: types.TOOL,
  //   title: "Home",
  //   render: () => (
  //     <IconButton
  //       key="home/tool"
  //       title="Home"
  //       onClick={() => location.assign(location.origin)}
  //     >
  //       <HomeIcon />
  //     </IconButton>
  //   ),
  // });

  api.on(STORY_RENDERED, () => {
    const story = api.getCurrentStoryData();

    document.title = `${story.title.replace("/", " / ")} ⋅ Yamori Design`;
  });
});
