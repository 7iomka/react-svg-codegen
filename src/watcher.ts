import chokidar from 'chokidar';
import type { Config } from './types';

class Watcher {
  public constructor(
    private readonly config: Config,
    private readonly onChange: () => void,
    private readonly onDelete: (deletedFilePath: string) => void
  ) {}

  private isWatching = false;

  public readonly init = () => {
    if (this.isWatching) return;

    this.isWatching = true;

    const watcher = chokidar.watch([`${this.config.iconsFolder}/**/*`], {
      ignored: [`${this.config.iconsFolder}/**/*.tsx`],
      ignoreInitial: true,
      persistent: true,
      ignorePermissionErrors: true
    });

    watcher.on('change', path => {
      this.onChange();
      console.log('SVG: path changed', path);
    });

    watcher.on('add', path => {
      this.onChange();
      console.log('SVG: path added', path);
    });

    watcher.on('unlink', path => {
      this.onChange();
      this.onDelete(path);
      console.log('SVG: path removed', path);
    });

    console.log('SVG: watch mode is enabled');
  };
}

export { Watcher };
