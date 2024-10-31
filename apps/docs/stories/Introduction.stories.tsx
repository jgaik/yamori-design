import type { Meta, StoryObj } from "@storybook/react";

const IntroductionComponent: React.FC = () => (
  <div>
    <h1>Yamori Design</h1>
  </div>
);

IntroductionComponent.displayName = "Introduction";

export default {
  component: IntroductionComponent,
  tags: ["!autodocs"],
  parameters: { actions: { disable: true }, controls: { disable: true } },
} satisfies Meta<typeof IntroductionComponent>;

export const Introduction: StoryObj<typeof IntroductionComponent> = {};
