"use client";

import type { i18n as I18n } from "i18next";
import { PropsWithChildren, useMemo } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import {
  DEFAULT_LABELS,
  Labels,
  LabelsProvider,
} from "@yamori-design/react-components";
import { YAMORI_NAMESPACE } from "./resources";

const LabelsBridge: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation(YAMORI_NAMESPACE);

  const labels = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(DEFAULT_LABELS).map(([key, fallback]) => [
          key,
          t(key, { defaultValue: fallback }),
        ]),
      ) as Labels,
    [t],
  );

  return <LabelsProvider labels={labels}>{children}</LabelsProvider>;
};

export type I18nProviderProps = PropsWithChildren<{
  i18n: I18n;
}>;

export const I18nProvider: React.FC<I18nProviderProps> = ({
  i18n,
  children,
}) => (
  <I18nextProvider i18n={i18n}>
    <LabelsBridge>{children}</LabelsBridge>
  </I18nextProvider>
);
