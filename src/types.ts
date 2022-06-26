type Config = Omit<Required<PublicConfig>, 'storybook'> & {
  storybook?: StorybookConfig;
};

type PublicConfig = {
  iconsFolder: string;
  templateFolder: string;

  watch?: boolean;

  generateTypes?: boolean;

  storybook?: PublicStorybookConfig;
};

type PublicStorybookConfig = {
  output: string;
  folder: string;

  patchFC?: boolean;
};

type StorybookConfig = Required<PublicStorybookConfig>;

type DefaultConfig = Pick<Config, 'watch' | 'generateTypes'>;

type StorybookDefaultConfig = Pick<PublicStorybookConfig, 'patchFC'>;

type DirectoryTreeInfo = {
  path: string;
  name: string;
  type: 'folder' | 'file';
  children?: DirectoryTreeInfo[];
};

export type {
  Config,
  DirectoryTreeInfo,
  PublicConfig,
  DefaultConfig,
  StorybookConfig,
  StorybookDefaultConfig,
  PublicStorybookConfig
};
