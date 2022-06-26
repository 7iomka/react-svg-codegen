import fs from 'fs';
import path from 'path';
import type { FSWatcher } from 'chokidar';
import chokidar from 'chokidar';

import { DeclarationWriter, DirScanner } from './lib';
import type { Config, DirTreeInfo, IconsMap } from './types';
import { StorybookWriter } from './lib/storybook-writer';

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

  private readonly getIconsDeclarationFileContent = () => {
    const iconsMap = this.getIconsMap();

    const writer = new DeclarationWriter(this.config);

    return writer.getFileContent(iconsMap);
  };

  private readonly generateStorybookDocs = () => {
    const iconsMap = this.getIconsMap();

    const writer = new StorybookWriter(this.config);

    const content = writer.getContent(iconsMap);

    if (!fs.existsSync(this.config.storybook.folder)) {
      fs.mkdirSync(this.config.storybook.folder, { recursive: true });
    }

    fs.writeFile(
      path.resolve(this.config.storybook.folder, this.config.storybook.output),
      content,
      err => {
        if (err) {
          this.config.logger.error(err);

          return;
        }

        this.config.logger.info('SVG Storybook: docs was generated');
      }
    );
  };

  private readonly generateSvgMap = () => {
    const content = this.getIconsDeclarationFileContent();

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
      this.generateStorybookDocs();
    });

    this.watcher.on('add', pth => {
      this.config.logger.log('SVG: path added', pth);
      this.generateSvgMap();
      this.generateStorybookDocs();
    });

    this.watcher.on('addDir', pth => {
      this.config.logger.log('SVG: dir added', pth);
      this.generateSvgMap();
      this.generateStorybookDocs();
    });

    this.watcher.on('unlink', pth => {
      this.config.logger.log('SVG: path removed', pth);
      this.generateSvgMap();
      this.generateStorybookDocs();
    });

    this.watcher.on('unlinkDir', pth => {
      this.config.logger.log('SVG: dir removed', pth);
      this.generateSvgMap();
      this.generateStorybookDocs();
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
    this.generateStorybookDocs();

    if (!this.config.watch) return;

    this.initWatchers();
  };
}

export { SVGGenerator };
