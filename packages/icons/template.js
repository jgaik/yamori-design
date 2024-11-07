const template = (variables, { tpl }) => {
  return tpl`
${variables.imports};

${variables.interfaces};

const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);


${variables.exports};
ForwardRef.displayName = '${variables.componentName.replace(/^SVG/i, "")}';
`;
};

module.exports = template;
