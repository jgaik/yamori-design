import classNames from "classnames";

type NameWithModifiers<Name extends string> =
  | Name
  | [name: Name, modifiers: Record<string, unknown>];

export class BemClassNamesCreator {
  constructor(private prefix?: string) {
    this.prefix = prefix;
  }

  public create<Name extends string>(
    block: NameWithModifiers<Name>,
    className: string | undefined,
    ...elements: NameWithModifiers<Name>[]
  ): Record<Name, string> {
    const blockName = typeof block === "string" ? block : block[0];
    const blockModifiers = typeof block === "string" ? {} : block[1];

    const blockNames = [
      this.prefix ? `${this.prefix}-${blockName}` : blockName,
      ...(className?.trim().split(/\s+/) ?? []),
    ];

    const elementsNames = elements.map<[Name, Record<string, unknown>]>(
      (element) => (typeof element === "string" ? [element, {}] : element)
    );

    const returnObject = {
      [blockName]: blockNames
        .map((name) =>
          classNames(
            name,
            Object.fromEntries(
              Object.entries(blockModifiers).map(([key, value]) => [
                `${name}--${key}`,
                value,
              ])
            )
          )
        )
        .join(" "),
    };

    elementsNames.forEach((element) => {
      const [elementName, elementModifiers] = element;

      returnObject[elementName] = blockNames
        .map((name) =>
          classNames(
            `${name}__${elementName}`,
            Object.fromEntries(
              Object.entries(elementModifiers).map(([key, value]) => [
                `${name}__${elementName}--${key}`,
                value,
              ])
            )
          )
        )
        .join(" ");
    });

    return returnObject as Record<Name, string>;
  }
}

export const bemClassNamesCreator = new BemClassNamesCreator("yamori");
