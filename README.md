# Folder structure
```yaml
- config.iconsFolder
   - sprite — icons(.svg) for inline-sprite
   - standalone — icons(.svg) for standalone output
```

Recommended path — `src/shared/ui/icons`

Limitations: Don't use `public` folder

# Script
```javascript
// {ROOT}/scripts/svg-codegen.js

const { generateSVG } = require("react-svg-codegen");
const path = require("path");


generateSVG({
  iconsFolder: path.resolve(__dirname, "../src/shared/ui/icons"),
  templateFolder: path.resolve(__dirname,"..","node_modules","react-svg-codegen/templates"),
  watch: true,
  storybook: true
});
```

# Webpack

```javascript
const { svgConfig } = require('react-svg-codegen/webpack');

module.exports = svgConfig(webpackConfig)
```

# SSR (Next.js)
```jsx
import { spriteContent } from 'react-svg-codegen/ssr';

<div 
	style={{ position: 'absolute', width: 0, height: 0 }} 
	dangerouslySetInnerHTML={{ __html: spriteContent }} 
/>
```

# Storybook

```javascript
// {ROOT}/.storybook/main.js

const { svgConfig } = require('react-svg-codegen/webpack');

module.exports = {
	webpackFinal: (config, options) => {
		// modify storybook's file-loader rule to avoid conflicts with our svgConfig
		const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

		fileLoaderRule.exclude = /\.svg$/;

		return svgConfig(config);
	}
}
```


# Typings

```typescript
declare module '*.svg?sprite' {
	import React = require('react');
	const src: React.FC<React.SVGProps<SVGSVGElement>>;
	export default src;
}

declare module '*.svg' {
	import React = require('react');
	const src: React.FC<React.SVGProps<SVGSVGElement>>;
	export default src;
}
```
