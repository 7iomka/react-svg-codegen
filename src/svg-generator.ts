import fs from 'fs';
import path from 'path';
import type { FSWatcher } from 'chokidar';
import chokidar from 'chokidar';

import { DirScanner, FileWriter } from './lib';
import type { Config, IconsMap } from './types';
import type { DirTreeInfo } from '../types';

class SVGGenerator {
  public constructor(private readonly config: Config) {}

  private isWatching = false;

  private watcher: null | FSWatcher = null;

  private readonly getIconsMap = () => {
    const rootDir = DirScanner.getDirTree(this.config.iconsFolder);

    const map = {} as IconsMap;

    (rootDir.children ?? []).forEach(folder => {
      this.addLevelToMap(map, folder);
    });

    return map;
  };

  private readonly addLevelToMap = (map: IconsMap, dirInfo: DirTreeInfo) => {
    if (dirInfo.type === 'folder' && dirInfo.children) {
      map[dirInfo.name] = {};

      dirInfo.children.forEach(_dirInfo => {
        this.addLevelToMap(map[dirInfo.name] as IconsMap, _dirInfo);
      });

      return;
    }

    map[dirInfo.name] = dirInfo.path;
  };

  private readonly getIconsMapFileContent = () => {
    const iconsMap = this.getIconsMap();

    const names: string[] = [];

    const writer = new FileWriter(this.config);

    return `/* eslint-disable */
${writer.writeImports(iconsMap, names)}
${writer.writeTypes(names)}
${writer.writeVars(names)}
    
export { Icon }
export type { Icons }
`;
  };

  private readonly generateSvgMap = () => {
    const content = this.getIconsMapFileContent();

    if (!fs.existsSync(this.config.outputFolder)) {
      fs.mkdirSync(this.config.outputFolder, { recursive: true });
    }

    fs.writeFile(
      path.resolve(this.config.outputFolder, this.config.output),
      content,
      err => {
        if (err) {
          this.config.logger.error(err);

          return;
        }

        this.config.logger.info('SVG: map was generated');
      }
    );
  };

  private readonly attachWatchers = () => {
    if (!this.watcher) return;

    this.watcher.on('change', pth => {
      this.config.logger.log('SVG: path changed', pth);
      this.generateSvgMap();
    });

    this.watcher.on('add', pth => {
      this.config.logger.log('SVG: path added', pth);
      this.generateSvgMap();
    });

    this.watcher.on('addDir', pth => {
      this.config.logger.log('SVG: dir added', pth);
      this.generateSvgMap();
    });

    this.watcher.on('unlink', pth => {
      this.config.logger.log('SVG: path removed', pth);
      this.generateSvgMap();
    });

    this.watcher.on('unlinkDir', pth => {
      this.config.logger.log('SVG: dir removed', pth);
      this.generateSvgMap();
    });

    this.config.logger.log('SVG: watch mode is enabled');
  };

  private readonly initWatchers = () => {
    if (this.isWatching) return;

    this.isWatching = true;

    this.watcher = chokidar.watch([`${this.config.iconsFolder}/**/*`], {
      ignored: [`${this.config.iconsFolder}/*.tsx`],
      ignoreInitial: true,
      persistent: true,
      ignorePermissionErrors: true,
      depth: 4
    });

    this.attachWatchers();
  };

  public readonly init = () => {
    this.generateSvgMap();

    if (!this.config.watch) return;

    this.initWatchers();
  };
}

export { SVGGenerator };
