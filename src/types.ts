type Config = Required<PublicConfig>;

type PublicConfig = {
  iconsFolder: string;
  templateFolder: string;

  watch?: boolean;

  generateTypes?: boolean;

  storybook?: boolean;
};

type DefaultConfig = Pick<Config, 'watch' | 'generateTypes'>;

type DirectoryTreeInfo = {
  path: string;
  name: string;
  type: 'folder' | 'file';
  children?: DirectoryTreeInfo[];
};

export type { Config, DirectoryTreeInfo, PublicConfig, DefaultConfig };
