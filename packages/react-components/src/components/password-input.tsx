"use client";

import { useMemo, useState } from "react";
import { bemClassNamesCreator } from "../utilities";
import { Input, InputProps } from "./input";
import { Button } from "./button";
import { usePackageTranslation } from "../i18n";
import { EyeClosedIcon, EyeOpenIcon } from "@yamori-design/icons";

export type PasswordInputProps = Omit<InputProps, "type">;

export const PasswordInput: React.FC<PasswordInputProps> = ({
  className,
  disabled,
  suffix,
  ...props
}) => {
  const { t } = usePackageTranslation();
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("password-input", className),
    [className]
  );

  const [showPassword, setShowPassword] = useState(false);

  const inputSuffix = useMemo(
    () => [
      suffix,
      <Button
        key="eye-icon"
        aria-label={showPassword ? t("hidePassword") : t("showPassword")}
        variant="text"
        title={showPassword ? t("hidePassword") : t("showPassword")}
        onClick={() => setShowPassword(!showPassword)}
        disabled={disabled}
      >
        {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </Button>,
    ],
    [disabled, showPassword, suffix, t]
  );

  return (
    <Input
      className={bemClassNames["password-input"]}
      suffix={inputSuffix}
      disabled={disabled}
      type={showPassword ? "text" : "password"}
      {...props}
    />
  );
};
