import React from 'react';
import { useActiveDocContext } from "@docusaurus/plugin-content-docs/client";
import DocsVersionDropdownNavbarItem from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import type DocsVersionDropdownNavbarItemType from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof DocsVersionDropdownNavbarItemType>;

export default function DocsVersionDropdownNavbarItemWrapper(props: Props) {
  // do not display this navbar item if current page is not a doc
  const { activeDoc } = useActiveDocContext(props.docsPluginId);
  if (!activeDoc) {
    return null;
  }

  return <DocsVersionDropdownNavbarItem {...props} />;
}
