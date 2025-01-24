import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryFn } from "@storybook/react";
import { GeckoIcon } from "@yamori-design/icons";
import {
  SearchInput as SearchInputComponent,
  SearchInputProps,
} from "@yamori-design/react-components";

export default {
  component: SearchInputComponent,
  tags: ["!dev"],
  argTypes: {
    prefix: {
      control: "boolean",
    },
    suffix: {
      control: "boolean",
    },
  },
  args: {
    disabled: false,
    placeholder: "Placeholder",
    prefix: false,
    suffix: false,
  },
} satisfies Meta<SearchInputProps>;

export const SearchInput: StoryFn<SearchInputProps> = ({
  prefix,
  suffix,
  ...args
}) => {
  const [{ value = "" }, updateArgs] = useArgs();

  return (
    <SearchInputComponent
      {...args}
      prefix={prefix && <GeckoIcon />}
      suffix={suffix && <GeckoIcon />}
      value={value}
      onChange={(newValue) => updateArgs({ value: newValue })}
    />
  );
};
