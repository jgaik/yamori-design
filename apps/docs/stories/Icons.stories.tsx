import { Meta, StoryObj } from "@storybook/react";
import * as IconComponents from "@yamori-design/icons";

const IconsComponent: React.FC = () => (
  <table>
    <thead>
      <tr>
        <th scope="col">Icon</th>
        <th scope="col">Name</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(IconComponents).map(([displayName, IconComponent]) => (
        <tr key={displayName}>
          <td>
            <IconComponent />
          </td>
          <td>{displayName}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

IconsComponent.displayName = "Icons";

export default {
  component: IconsComponent,
  tags: ["!autodocs"],
  parameters: { actions: { disable: true }, controls: { disable: true } },
} satisfies Meta;

export const Icons: StoryObj = {};
