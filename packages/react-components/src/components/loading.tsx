import { ComponentPropsWithRef, useMemo } from "react";
import { usePackageTranslation } from "../i18n";
import { SpinnerIcon } from "@yamori-design/icons";
import { bemClassNamesCreator } from "../utilities";
import "@yamori-design/styles/dist/components/loading.css";

export type LoadingProps = Omit<ComponentPropsWithRef<"span">, "children">;

export const Loading: React.FC<LoadingProps> = ({ className, ...props }) => {
  const { t } = usePackageTranslation();

  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("loading", className),
    [className]
  );

  return (
    <span className={bemClassNames["loading"]} role="progressbar" {...props}>
      <SpinnerIcon />
      {t("loading")}
    </span>
  );
};
