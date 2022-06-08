
## Base dependency installation:
```bash
yarn install
```

## To configure React Universal Icon System with next.js
### Install dev dependencies for out `svgConfig` helper
```bash
yarn add -D webpack-shell-plugin-next@^2.2.2 @svgr/webpack@^6.2.1 svg-sprite-loader@^6.0.11
```
### In webpack config use `svgConfig` helper
```js
const { svgConfig } = require('react-universal-icon-system/webpack-helpers');
//...
webpack: (config, { isServer }) => {
  svgConfig(config, { isServer });
  return config;
},
```

### Create command and file
Command in `package.json`
```json
"icons:generate-and-watch": "node init-svg-watchers.js",
```
File in root of next.js project `init-svg-watchers.js`
```js
const { initSvgWatchers } = require('react-universal-icon-system/svg-map-generator');

initSvgWatchers();
```

### Create icons folders structure
Somewhere in your app create folder for icons, fox example `icons`
Inside it required that structure
- `sprite` folder for sprite icons
- `standalone` folder for basic icons
- `index.tsx` empty file, svg-watcher will autofill it when a new icon was added.

### Modify next.js types declarations for svg's
This can help us to correctly see attributes suggestions on imported svgs.
- In `tsconfig.json` in `include` remove `next-env.d.ts` and instead include two files: "custom-next-env.d.ts", "next-static.d.ts"`

In custom-next-env.d.ts we replace reference from `next/image-types/global` to `next/types/global`
```ts
/// <reference types="next" />
/// <reference types="next/types/global" />
```
And content from `next/image-types/global` we paste in `next-static.d.ts` with this modifications:
- Find `declare module '*.svg'`
- Comment or remove this declaration
- Paste this 2 declarations instead

```ts
declare module '*.svg?sprite' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
```

Run the development server:
```bash
yarn dev
```

