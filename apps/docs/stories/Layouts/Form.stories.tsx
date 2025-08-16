import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Form as FormComponent,
  FormProps,
  Input,
  PasswordInput,
  Textarea,
} from "@yamori-design/react-components";

const FORM_CHILDREN = [Input, Textarea, PasswordInput];

export default {
  component: FormComponent,
  tags: ["!autodocs"],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<FormProps>;

export const Form: StoryObj<FormProps> = {};
Form.args = {
  children: [
    ...FORM_CHILDREN.map((Component) => (
      <FormComponent.Field key={Component.name} label={Component.name}>
        <Component id={Component.name} />
      </FormComponent.Field>
    )),
    <Button>Button</Button>,
  ],
};
