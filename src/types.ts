type Config = Omit<Required<PublicConfig>, 'storybook'> & {
  storybook?: StorybookConfig;
};

type PublicConfig = {
  iconsFolder: string;
  outputFolder: string;
  templateFolder: string;

  output: string;

  sprite?: boolean;

  logger?: Pick<Console, 'log' | 'error' | 'info'>;

  watch?: boolean;

  servedFromPublic?: boolean;

  generateTypes?: boolean;

  storybook?: PublicStorybookConfig;
};

type PublicStorybookConfig = {
  output: string;
  folder: string;

  patchFC?: boolean;
};

type StorybookConfig = Required<PublicStorybookConfig>;

type DefaultConfig = Pick<
  Config,
  'watch' | 'sprite' | 'servedFromPublic' | 'logger' | 'generateTypes'
>;

type StorybookDefaultConfig = Pick<PublicStorybookConfig, 'patchFC'>;

type DirTreeInfo = {
  path: string;
  name: string;
  type: 'folder' | 'file';
  children?: DirTreeInfo[];
};

type IconsMap = { [Key in string]: IconsMap | string };

export type {
  Config,
  IconsMap,
  DirTreeInfo,
  PublicConfig,
  DefaultConfig,
  StorybookConfig,
  StorybookDefaultConfig,
  PublicStorybookConfig
};
