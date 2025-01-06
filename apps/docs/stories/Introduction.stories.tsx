import type { Meta, StoryObj } from "@storybook/react";
import { GeckoIcon, HomeIcon } from "@yamori-design/icons";
import { Link, Table } from "@yamori-design/react-components";
import "@yamori-design/styles/dist/components/link.css";
import "./introduction.scss";

const figmaLink = (
  <Link
    target="_blank"
    href="https://www.figma.com/design/gyF4sBtOpM0nPVu7BsYgoJ/Yamori-Design?m=auto&t=ijTz0XYG4e0fKAx1-1"
  >
    Figma
  </Link>
);

const packagesDescriptions = {
  "react-components": "Collection of React components",
  styles: "Collection of global and component stylesheets and utility mixins",
  icons: "Collection of SVG Icon components and assets",
};

const IntroductionComponent: React.FC = () => (
  <div className="introduction-story">
    <header>
      <h1>
        <GeckoIcon />
        Yamori Design
      </h1>
      <nav>
        <Link href={location.origin}>
          <HomeIcon className="introduction-story__home" />
        </Link>
        <Link href="https://github.com/jgaik/yamori-design" target="_blank">
          <img
            className="introduction-story__github"
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            alt="GitHub"
          />
        </Link>
      </nav>
    </header>

    <p>
      This is the implementation of the design system created for my personal
      web projects. The design system is available on {figmaLink}.
    </p>

    <p>
      The implementation consists of {Object.keys(packagesDescriptions).length}{" "}
      node packages distributed under <b>@yamori-design</b> scope.
    </p>
    <Table
      rowData={Object.entries(packagesDescriptions).map(
        ([packageName, description]) => ({ packageName, description })
      )}
      columns={[
        {
          id: "packageName",
          header: "Package Name",
          valueGetter: ({ data }) => data.packageName,
          cellRenderer: ({ value }) => (
            <Link
              target="_blank"
              href={`https://www.npmjs.com/package/@yamori-design/${value}`}
            >
              @yamori-design/{value}
            </Link>
          ),
        },
        {
          id: "description",
          header: "Description",
          valueGetter: ({ data }) => data.description,
        },
      ]}
      getRowId={(data) => data.packageName}
    />
  </div>
);

IntroductionComponent.displayName = "Introduction";

export default {
  component: IntroductionComponent,
  tags: ["!autodocs"],
  parameters: { actions: { disable: true }, controls: { disable: true } },
} satisfies Meta;

export const Introduction: StoryObj = {};
