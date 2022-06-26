type Config = {
  iconsFolder: string;
  outputFolder: string;

  output: string;

  sprite: boolean;

  logger: Pick<Console, 'log' | 'error' | 'info'>;

  watch: boolean;

  servedFromPublic: true;

  storybook: {
    output: string;
    folder: string;

    patchFC: boolean;
  };
};

type DirTreeInfo = {
  path: string;
  name: string;
  type: 'folder' | 'file';
  children?: DirTreeInfo[];
};

type IconsMap = { [Key in string]: IconsMap | string };

export type { Config, DirTreeInfo, IconsMap };
