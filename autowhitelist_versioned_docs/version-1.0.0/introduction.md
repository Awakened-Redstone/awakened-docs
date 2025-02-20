---
sidebar_position: 1
---

# Introduction

AutoWhitelist allows you to automate your whitelist based on Discord roles.  
The mod allows you to configure what roles are allowed to be whitelisted and what action is executed when whitelisting a player.

The players can add their Minecraft account to the whitelist by simply running the `/register <username>` command, and the mod will check for their role 
and properly execute the given action for their highest role.

:::info
Please note that roles given by [Discord integrations](https://support.discord.com/hc/en-us/articles/360045093012-Server-Integrations-Page) may take up to an hour to be given to a user.
:::

The mod has a cache, if a user has their entry removed due to loosing their role the mod will save their username, when they get the role back, 
they can simply log into the server and the mod will add them back to the whitelist, providing a seamless experience.

:::warning
  This mod works on top of the vanilla whitelist, offline servers are not supported and will likely not work properly  
  Mods that change the vanilla whitelist may cause issues or bugs with this mod
:::
