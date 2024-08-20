/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "monday-ui-react-core/dist/Button" {
  import { ButtonHTMLAttributes, FC } from "react";

  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: "submit";
    disabled?: boolean;
    loading?: boolean;
  }

  const Button: FC<ButtonProps> & {
    types: {
      SUBMIT: "submit";
    };
  };
  export default Button;
}

declare module "monday-ui-react-core/dist/Dropdown" {
  import { FC } from "react";
  import type { OrderOption } from "../types";

  interface DropdownProps extends EventHandler<HTMLDivElement> {
    placeholder?: string;
    onOptionSelect?: (option: OrderOption) => void;
    onOptionRemove?: () => void;
    onClear?: () => void;
    options: OrderOption[];
    onChange?: (option: OrderOption[]) => void;
    value?: OrderOption[];
    isLoading?: boolean;
    multi?: boolean;
    multiline?: boolean;
  }

  const Dropdown: FC<DropdownProps>;
  export default Dropdown;
}

declare module "monday-ui-react-core/dist/Text" {
  import { FC, HTMLAttributes } from "react";

  interface TextProps extends HTMLAttributes<HTMLDivElement> {
    color?: "primary" | "secondary";
    type?: "text1" | "text2" | "text3";
  }

  const Text: FC<TextProps> & {
    types: {
      TEXT1: "text1";
      TEXT2: "text2";
      TEXT3: "text3";
    };
  };
  export default Text;
}

declare module "monday-ui-react-core/dist/TextField" {
  import { FC, InputHTMLAttributes } from "react";

  interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    value: any;
    onChange: (event: any) => void;
    size?: "small" | "medium" | "large";
    requiredAsterisk?: boolean;
  }

  const TextField: FC<TextFieldProps> & {
    sizes: {
      SMALL: "small";
      MEDIUM: "medium";
      LARGE: "large";
    };
    types: {
      TEXT: "text";
      NUMBER: "number";
    };
  };
  export default TextField;
}
