import type { FSWatcher } from 'chokidar';
import chokidar from 'chokidar';
import type { Config } from './types';

class Watcher {
  public constructor(
    private readonly config: Config,
    private readonly onChange: () => void
  ) {}

  private isWatching = false;

  private readonly attachWatchers = (watcher: FSWatcher) => {
    this.watch(watcher, 'change', path => {
      console.log('SVG: path changed', path);
    });

    this.watch(watcher, 'add', path => {
      console.log('SVG: path added', path);
    });

    this.watch(watcher, 'addDir', path => {
      console.log('SVG: dir added', path);
    });

    this.watch(watcher, 'unlink', path => {
      console.log('SVG: path removed', path);
    });

    this.watch(watcher, 'unlinkDir', path => {
      console.log('SVG: dir removed', path);
    });

    console.log('SVG: watch mode is enabled');
  };

  private readonly watch = (
    watcher: FSWatcher,
    method: Parameters<FSWatcher['on']>[0],
    cb: (path: string) => void
  ) => {
    watcher.on(method, path => {
      cb(path);
      this.onChange();
    });
  };

  public readonly init = () => {
    if (this.isWatching) return;

    this.isWatching = true;

    const watcher = chokidar.watch([`${this.config.iconsFolder}/**/*`], {
      ignored: [`${this.config.iconsFolder}/**/*.tsx`],
      ignoreInitial: true,
      persistent: true,
      ignorePermissionErrors: true,
      depth: 4
    });

    this.attachWatchers(watcher);
  };
}

export { Watcher };
