/* eslint-disable @typescript-eslint/no-use-before-define, @typescript-eslint/no-unused-vars */
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const slash = require('slash');

let watcher;
let isWatching = false;

// eslint-disable-next-line prettier/prettier
const iconsRoot = './src';
const watchPaths = [`${iconsRoot}/**/*`];

function getDirTree(filename) {
  const stats = fs.lstatSync(filename);
  const info = {
    path: filename,
    name: path.basename(filename),
  };

  if (stats.isDirectory()) {
    info.type = 'folder';
    info.children = fs.readdirSync(filename).map((child) => {
      return getDirTree(`${filename}/${child}`);
    });
  } else {
    // Assuming it's a file. In real life it could be a symlink or
    // something else!
    info.type = 'file';
  }

  return info;
}

function toPascalCase(string) {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`,
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

function getFileName(pth, extractedExt = 'svg') {
  // eslint-disable-next-line no-useless-escape
  return slash(path.basename(pth.replace(/^.*[\\\/]/, ''), extractedExt));
}

function getIconsMap() {
  const dirTree = getDirTree(iconsRoot);
  const rootFolders = dirTree.children.filter((fld) => fld.type === 'folder');
  const map = {};
  rootFolders.forEach((folder) => {
    map[folder.name] = {};
    if (folder.children && folder.children.length > 0) {
      map[folder.name] = folder.children.reduce((svgs, cv) => {
        return {
          ...svgs,
          [cv.name]: cv.path,
        };
      }, {});
    }
  });
  return map;
}

function getIconsMapFileContent() {
  const iconsMap = getIconsMap();
  const mapNames = {
    sprite: [],
    standalone: [],
    custom: [],
  };
  return `/* eslint-disable */
// Sprite icons
${Object.keys(iconsMap.sprite || {})
  .map((key) => {
    const importName = toPascalCase(getFileName(key));

    mapNames.sprite.push(importName);
    return `import ${importName} from './${slash(
      path.relative(iconsRoot, iconsMap.sprite[key]),
    )}?sprite';`;
  })
  .join('\n')}
// Standalone svgs
${Object.keys(iconsMap.standalone || {})
  .map((key) => {
    const importName = toPascalCase(getFileName(key));
    mapNames.standalone.push(importName);
    return `import ${importName} from './${slash(
      path.relative(iconsRoot, iconsMap.standalone[key]),
    )}';`;
  })
  .join('\n')}
// Custom svg-components (TSX): TODO: ready yet
${Object.keys(iconsMap.custom || {})
  .map((key) => {
    const importName = toPascalCase(getFileName(key, 'tsx'));
    mapNames.custom.push(importName);
    return `import ${importName} from './${slash(
      path.relative(iconsRoot, iconsMap.custom[key]),
    )}';`;
  })
  .join('\n')}

// Types
export type SpriteIcon = ${
    mapNames.sprite.length
      ? `
  | ${mapNames.sprite.map((v) => `'${v}'`).join('\n  | ')}`
      : 'any'
  };
 
export type StandaloneIcon = ${
    mapNames.standalone.length
      ? `
  | ${mapNames.standalone.map((v) => `'${v}'`).join('\n  | ')}`
      : 'any'
  };

export type CustomIcon = ${
    mapNames.custom.length
      ? `
  | ${mapNames.custom.map((v) => `'${v}'`).join('\n  | ')}`
      : 'any'
  };

export const Icons = ${
    // eslint-disable-next-line
    JSON.stringify(mapNames, null, 2).replace(/"/g, '').replace(/\[/g, '{').replace(/]/g, '}')
  };
`;
}

function handleIconChange(pth) {
  const content = getIconsMapFileContent();
  fs.writeFile(`${path.resolve(iconsRoot)}/index.tsx`, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info('SVG: map was generated');
  });
}

function initWatchers() {
  if (isWatching) return;
  isWatching = true;
  watcher = chokidar.watch(watchPaths, {
    ignored: ['src/*.tsx'],
    ignoreInitial: true,
    persistent: true,
    ignorePermissionErrors: true,
    depth: 4,
    // awaitWriteFinish: {
    //   stabilityThreshold: 2000,
    //   pollInterval: 100,
    // },
  });

  watcher.on('change', (pth) => {
    console.log('SVG: path changed', pth);
    handleIconChange();
  });
  watcher.on('add', (pth) => {
    console.log('SVG: path added', pth);
    handleIconChange();
  });
  watcher.on('addDir', (pth) => {
    console.log('SVG: dir added', pth);
    handleIconChange();
  });
  watcher.on('unlink', (pth) => {
    console.log('SVG: path removed', pth);
    handleIconChange();
  });
  watcher.on('unlinkDir', (pth) => {
    console.log('SVG: dir removed', pth);
    handleIconChange();
  });

  console.log('SVG: watch mode is enabled');
}

module.exports = {
  generateSvgMap() {
    handleIconChange();
  },
  initSvgWatchers() {
    initWatchers();
  },
};
