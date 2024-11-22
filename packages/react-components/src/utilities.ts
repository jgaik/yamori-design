import { BemClassNamesCreator } from "@yamori-shared/react-utilities";

export type OverwriteAndMerge<
  BaseType extends object,
  OverwritingType extends object,
> = Omit<BaseType, keyof OverwritingType> & OverwritingType;

export const bemClassNamesCreator = new BemClassNamesCreator("yamori");
