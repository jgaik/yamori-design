import { Meta, StoryObj } from "@storybook/react";
import { Details, Table } from "@yamori-design/react-components";
import { useMemo } from "react";

const NON_COLOR_CATEGORIES = [
  "border-radius",
  "border-width",
  "spacing",
  "shadow",
] as const;

function getAllVariables() {
  return Array.from(
    new Set(
      Array.from(document.styleSheets)
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
        }, [])
    )
  );
}

type VariablesProps = {
  summary: string;
  variables: string[];
  cellRenderer: (props: { value: string }) => React.ReactNode;
};

const VariablesTable: React.FC<VariablesProps> = ({
  summary,
  variables,
  cellRenderer,
}) => (
  <Details summary={summary}>
    <Table
      columns={[
        {
          id: "name",
          header: "Name",
          valueGetter: ({ data }) => data.name,
        },
        {
          id: "value",
          header: "Value",
          valueGetter: ({ data }) => [data.name, data.value],
          cellRenderer: [cellRenderer],
          span: 2,
        },
      ]}
      rowData={variables.map((variable) => ({
        name: variable,
        value: getComputedStyle(document.documentElement).getPropertyValue(
          variable
        ),
      }))}
      getRowId={(data) => data.name}
    />
  </Details>
);

const VariablesComponent: React.FC = () => {
  const cssVariables = useMemo(() => getAllVariables(), []);

  const groupedVariables = cssVariables.reduce<
    Record<(typeof NON_COLOR_CATEGORIES)[number] | "color", string[]>
  >(
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
    {
      color: [],
      spacing: [],
      "border-radius": [],
      "border-width": [],
      shadow: [],
    }
  );

  return (
    <>
      <VariablesTable
        summary="Border Radius"
        variables={groupedVariables["border-radius"]}
        cellRenderer={({ value }) => (
          <div
            style={{
              boxSizing: "border-box",
              borderColor: "var(--yamori-theme-primary)",
              borderRadius: `var(${value})`,
              borderStyle: "solid",
              borderWidth: 1,
              width: "1rem",
              height: "1rem",
            }}
          />
        )}
      />
      <VariablesTable
        summary="Border Width"
        variables={groupedVariables["border-width"]}
        cellRenderer={({ value }) => (
          <div
            style={{
              boxSizing: "border-box",
              borderColor: "var(--yamori-theme-primary)",
              borderWidth: `var(${value})`,
              borderStyle: "solid",
              width: "1rem",
              height: "1rem",
            }}
          />
        )}
      />
      <VariablesTable
        summary="Spacing"
        variables={groupedVariables["spacing"]}
        cellRenderer={({ value }) => (
          <div
            style={{
              display: "flex",
              columnGap: `var(${value})`,
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
        )}
      />
      <VariablesTable
        summary="Shadow"
        variables={groupedVariables["shadow"]}
        cellRenderer={({ value }) => (
          <div
            style={{
              boxShadow: `var(${value})`,
              width: "1rem",
              height: "1rem",
            }}
          />
        )}
      />
      <VariablesTable
        summary="Color"
        variables={groupedVariables["color"]}
        cellRenderer={({ value }) => (
          <div
            style={{
              backgroundColor: `var(${value})`,
              width: "1rem",
              borderStyle: "solid",
              borderColor: "lightgrey",
              borderWidth: 1,
              height: "1rem",
              boxSizing: "border-box",
            }}
          />
        )}
      />
    </>
  );
};

VariablesComponent.displayName = "Variables";

export default {
  component: VariablesComponent,
  tags: ["!autodocs"],
  parameters: { actions: { disable: true }, controls: { disable: true } },
} satisfies Meta;

export const Variables: StoryObj = {};
