import type { Meta, StoryObj } from "@storybook/react";
import { Fragment, PropsWithChildren } from "react";

const TypographyComponent: React.FC = () => (
  <>
    {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((Heading) => (
      <Fragment key={Heading}>
        <Heading>Heading {Heading}</Heading>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
        <p>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged.
        </p>
      </Fragment>
    ))}
  </>
);

TypographyComponent.displayName = "Typography";

export default {
  component: TypographyComponent,
  tags: ["!autodocs"],
} satisfies Meta<typeof TypographyComponent>;

export const Typography: StoryObj<typeof TypographyComponent> = {};
