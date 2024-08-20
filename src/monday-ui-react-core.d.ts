/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "monday-ui-react-core/dist/Button" {
  import { ButtonHTMLAttributes, FC } from "react";

  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
  }

  const Button: FC<ButtonProps> & {
    types: {
      BUTTON: "button";
      SUBMIT: "submit";
      RESET: "reset";
    };
  };
  export default Button;
}

declare module "monday-ui-react-core/dist/Dropdown" {
  import { FC } from "react";

  interface DropdownProps extends EventHandler<HTMLDivElement> {
    onOptionSelect?: (selected: { label: string; value: any }) => void;
    onOptionRemove?: () => void;
    onClear?: () => void;
    options: { label: string; value: any }[];
    onChange?: (selected: { label: string; value: any }[]) => void;
    value?: { label: string; value: any }[];
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
    size?: "small" | "medium" | "large";
    weight?: "light" | "regular" | "bold";
    type?: "text1" | "text2" | "text3";
  }

  const Text: FC<TextProps> & {
    sizes: {
      SMALL: "small";
      MEDIUM: "medium";
      LARGE: "large";
    };
    weights: {
      LIGHT: "light";
      REGULAR: "regular";
      BOLD: "bold";
    };
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
    label?: string;
    value: any;
    onChange: (event: any) => void;
    size?: "small" | "medium" | "large";
    required?: boolean;
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
