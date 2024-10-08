import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  autowhitelist: [
    {
      type: 'autogenerated',
      dirName: '.',
    },
  ],
  default_components: [
    {
      type: 'autogenerated',
      dirName: '.',
    },
  ],
};

export default sidebars;
