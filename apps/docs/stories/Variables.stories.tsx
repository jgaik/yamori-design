import { Meta, StoryObj } from "@storybook/react";
import { useMemo } from "react";

const NON_COLOR_CATEGORIES = [
  "border-radius",
  "border-width",
  "spacing",
] as const;

function getAllVariables() {
  return Array.from(document.styleSheets)
    .filter(
      (sheet) =>
        sheet.href === null || sheet.href.startsWith(window.location.origin)
    )
    .reduce<string[]>((acc, sheet) => {
      const newAcc = [...acc];

      for (let rulesIdx = 0; rulesIdx < sheet.cssRules.length; rulesIdx++) {
        const rule = sheet.cssRules[rulesIdx];

        if (
          rule instanceof CSSStyleRule &&
          /^:root(\[.*])?$/.test(rule.selectorText)
        ) {
          newAcc.push(
            ...Array.from(rule.style).filter((style) =>
              style.startsWith("--yamori")
            )
          );
        }
      }

      return newAcc;
    }, []);
}

type VariablesProps = { variables: string[] };

const ColorVariables: React.FC<VariablesProps> = ({ variables }) => (
  <details open>
    <summary>Colors</summary>
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col" colSpan={2}>
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {variables.map((colorVariable) => (
          <tr key={colorVariable}>
            <td>{colorVariable}</td>
            <td>
              <div
                style={{
                  backgroundColor: `var(${colorVariable})`,
                  width: "1rem",
                  borderStyle: "solid",
                  borderColor: "lightgrey",
                  borderWidth: 1,
                  height: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </td>
            <td>
              {getComputedStyle(document.documentElement).getPropertyValue(
                colorVariable
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </details>
);

const SpacingVariables: React.FC<VariablesProps> = ({ variables }) => (
  <details open>
    <summary>Spacing</summary>
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col" colSpan={2}>
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {variables.map((spacingVariable) => (
          <tr key={spacingVariable}>
            <td>{spacingVariable}</td>
            <td>
              <div
                style={{
                  display: "flex",
                  columnGap: `var(${spacingVariable})`,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "1rem",
                    height: "1rem",
                    backgroundColor: "var(--yamori-theme-primary)",
                  }}
                />
                <div
                  style={{
                    width: "1rem",
                    height: "1rem",
                    backgroundColor: "var(--yamori-theme-primary)",
                  }}
                />
              </div>
            </td>
            <td>
              {getComputedStyle(document.documentElement).getPropertyValue(
                spacingVariable
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </details>
);

const BorderWidthVariables: React.FC<VariablesProps> = ({ variables }) => (
  <details open>
    <summary>Border Width</summary>
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col" colSpan={2}>
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {variables.map((borderWidthVariable) => (
          <tr key={borderWidthVariable}>
            <td>{borderWidthVariable}</td>
            <td>
              <div
                style={{
                  boxSizing: "border-box",
                  borderColor: "var(--yamori-theme-primary)",
                  borderWidth: `var(${borderWidthVariable})`,
                  borderStyle: "solid",
                  width: "1rem",
                  height: "1rem",
                }}
              />
            </td>
            <td>
              {getComputedStyle(document.documentElement).getPropertyValue(
                borderWidthVariable
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </details>
);

const BorderRadiusVariables: React.FC<VariablesProps> = ({ variables }) => (
  <details open>
    <summary>Border Radius</summary>
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col" colSpan={2}>
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {variables.map((borderRadiusVariable) => (
          <tr key={borderRadiusVariable}>
            <td>{borderRadiusVariable}</td>
            <td>
              <div
                style={{
                  boxSizing: "border-box",
                  borderColor: "var(--yamori-theme-primary)",
                  borderRadius: `var(${borderRadiusVariable})`,
                  borderStyle: "solid",
                  borderWidth: 1,
                  width: "1rem",
                  height: "1rem",
                }}
              />
            </td>
            <td>
              {getComputedStyle(document.documentElement).getPropertyValue(
                borderRadiusVariable
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </details>
);

const IconsComponent: React.FC = () => {
  const cssVariables = useMemo(() => getAllVariables(), []);

  const groupedVariables = cssVariables.reduce<Record<string, string[]>>(
    (acc, variable) => {
      const newAcc = { ...acc };

      const nonColorCategory = NON_COLOR_CATEGORIES.find((category) =>
        variable.includes(category)
      );

      if (nonColorCategory) {
        newAcc[nonColorCategory].push(variable);
      } else {
        newAcc["color"].push(variable);
      }

      return newAcc;
    },
    { color: [], spacing: [], "border-radius": [], "border-width": [] }
  );

  return (
    <>
      <BorderRadiusVariables variables={groupedVariables["border-radius"]} />
      <BorderWidthVariables variables={groupedVariables["border-width"]} />
      <SpacingVariables variables={groupedVariables["spacing"]} />
      <ColorVariables variables={groupedVariables["color"]} />
    </>
  );
};

IconsComponent.displayName = "Variables";

export default {
  component: IconsComponent,
  tags: ["!autodocs"],
  parameters: { actions: { disable: true }, controls: { disable: true } },
} satisfies Meta;

export const Variables: StoryObj = {};
