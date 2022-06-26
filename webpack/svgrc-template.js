// See: https://github.com/gregberge/svgr/issues/303#issuecomment-1030498411
const getAttributeValue = (jsx, name) => {
  return jsx.find((e) => {
    return e.name.name === name;
  });
};

const template = (variables, { tpl }) => {
  const widthAttr = getAttributeValue(variables.jsx.openingElement.attributes, 'width');
  const heightAttr = getAttributeValue(variables.jsx.openingElement.attributes, 'height');
  const viewBoxAttr = getAttributeValue(variables.jsx.openingElement.attributes, 'viewBox');
  // Get width and height attribute values on svg element
  const width = widthAttr?.value?.expression?.value;
  const height = heightAttr?.value?.expression?.value;
  // If native svg element doesn't have width, nor height - prepare from viewBox
  const viewBox = viewBoxAttr?.value?.value;
  const viewBoxParts = viewBox ? viewBox.split(' ').map(Number) : null;
  const widthFromViewBox = viewBoxParts?.[2];
  const heightFromViewBox = viewBoxParts?.[3];
  // Calculate aspect ratio
  let aspectRatio =
    width && height ? width / height || 1 : widthFromViewBox / heightFromViewBox || 1;

  const widthExpr = tpl(
    `props.width || (props.height && Math.floor(+props.height * ${aspectRatio})) || ${
      width || widthFromViewBox
    }`,
  );
  const heightExpr = tpl(
    `props.height || (props.width && Math.floor(+props.width / ${aspectRatio})) || ${
      height || heightFromViewBox
    }`,
  );

  // Update existing or create a new attribute desclaration
  if (widthAttr) {
    widthAttr.value.expression = widthExpr.expression;
  } else {
    variables.jsx.openingElement.attributes.push({
      type: 'JSXAttribute',
      name: { type: 'JSXIdentifier', name: 'width' },
      value: {
        type: 'JSXExpressionContainer',
        expression: widthExpr.expression,
      },
    });
  }

  if (heightAttr) {
    heightAttr.value.expression = heightExpr.expression;
  } else {
    variables.jsx.openingElement.attributes.push({
      type: 'JSXAttribute',
      name: { type: 'JSXIdentifier', name: 'height' },
      value: {
        type: 'JSXExpressionContainer',
        expression: heightExpr.expression,
      },
    });
  }

  return tpl`
${variables.imports};

${variables.interfaces};

const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);
 
${variables.exports};
`;
};

module.exports = template;
