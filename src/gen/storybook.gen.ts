import type { Config, DirectoryTreeInfo } from '../types';
import { DirectoryScanner, Formatter, Writer } from '../lib';
import path from 'path';
import slash from 'slash';

class StorybookGen {
  public constructor(private readonly config: Config) {}

  private readonly flatMapChildren = (
    item: DirectoryTreeInfo
  ): DirectoryTreeInfo | DirectoryTreeInfo[] => {
    if (item.type === 'file') {
      return item;
    }

    return (item.children ?? []).flatMap(this.flatMapChildren);
  };

  private readonly mapToRender = (
    item: DirectoryTreeInfo
  ): { importName: string; importPath: string } => ({
    importName: Formatter.toImportName(item.name),
    importPath: slash(
      path.normalize(path.relative(this.config.iconsFolder, item.path))
    )
  });

  private readonly getIcons = () => {
    const scanner = new DirectoryScanner(this.config);

    return scanner.getSpriteIcons();
  };

  public readonly write = async () => {
    const icons = this.getIcons();
    const names = icons.map(({ importName }) => importName);

    const content = await Writer.getContentByTemplate(
      path.resolve(this.config.templateFolder, 'storybook', 'index.eta'),
      { names, patchedFC: !!this.config.storybook?.patchFC }
    );

    Writer.writeContentToFile(
      path.join(this.config.iconsFolder, 'docs'),
      'index.stories.tsx',
      content,
      {
        onError: err => console.error(err),
        onSuccess: () => console.info('SVG: docs was generated')
      }
    );
  };
}

export { StorybookGen };
