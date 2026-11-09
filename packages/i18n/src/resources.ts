import { DEFAULT_LABELS, Labels } from "@yamori-design/react-components";

export const YAMORI_NAMESPACE = "yamori-design";

const JA_LABELS: Labels = {
  all: "全て",
  cancel: "取り消し",
  clear: "クリア",
  close: "閉じる",
  dark: "暗い",
  default: "デフォルト",
  delete: "削除",
  down: "下",
  hidePassword: "パスワードを非表示",
  home: "ホーム",
  key: "キー",
  light: "明るい",
  loading: "読み込み中",
  noData: "データなし",
  showPassword: "パスワードを表示",
  up: "上",
  value: "値",
};

export const labelResources = {
  en: { [YAMORI_NAMESPACE]: DEFAULT_LABELS },
  ja: { [YAMORI_NAMESPACE]: JA_LABELS },
};
