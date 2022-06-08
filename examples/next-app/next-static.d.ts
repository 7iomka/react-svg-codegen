/* /// <reference lib="dom" /> */

// Modified Built-in asset types
// images (see https://github.com/vercel/next.js/blob/canary/packages/next/image-types/global.d.ts)
interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}
declare module '*.png' {
  const content: StaticImageData;

  export default content;
}

// XXXXX We don't need this XXXXX
// declare module '*.svg' {
/**
 * Use `any` to avoid conflicts with
 * `@svgr/webpack` plugin or
 * `babel-plugin-inline-react-svg` plugin.
 */
// const content: any

// export default content
// }

// Instead we add own rules for svg's here
declare module '*.svg?sprite' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

// Rest of next/image-types/global.d.ts
declare module '*.jpg' {
  const content: StaticImageData;

  export default content;
}
declare module '*.jpeg' {
  const content: StaticImageData;

  export default content;
}
declare module '*.gif' {
  const content: StaticImageData;

  export default content;
}
declare module '*.webp' {
  const content: StaticImageData;

  export default content;
}
declare module '*.avif' {
  const content: StaticImageData;

  export default content;
}
declare module '*.ico' {
  const content: StaticImageData;

  export default content;
}
declare module '*.bmp' {
  const content: StaticImageData;

  export default content;
}

// media
declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.webm' {
  const src: string;
  export default src;
}
declare module '*.ogg' {
  const src: string;
  export default src;
}
declare module '*.mp3' {
  const src: string;
  export default src;
}
declare module '*.wav' {
  const src: string;
  export default src;
}
declare module '*.flac' {
  const src: string;
  export default src;
}
declare module '*.aac' {
  const src: string;
  export default src;
}

// fonts
declare module '*.woff' {
  const src: string;
  export default src;
}
declare module '*.woff2' {
  const src: string;
  export default src;
}
declare module '*.eot' {
  const src: string;
  export default src;
}
declare module '*.ttf' {
  const src: string;
  export default src;
}
declare module '*.otf' {
  const src: string;
  export default src;
}

// web worker
declare module '*?worker' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

declare module '*?worker&inline' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

declare module '*?raw' {
  const src: string;
  export default src;
}

declare module '*?url' {
  const src: string;
  export default src;
}
