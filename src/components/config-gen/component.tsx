import React, {useCallback, useEffect, useState} from "react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@shadcn/form";
import {useForm} from "react-hook-form";
import {Input} from "@shadcn/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@shadcn/select";
import CodeBlock from "@docusaurus/theme-classic/lib/theme/CodeBlock";
import Admonition from '@theme/Admonition'
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
  role: z.string().regex(/^((, ?)?(\d+|@[^\n,]+))+$/, {
    message: "Roles must be Ids or role names prefixed with @"
  }),
  type: z.string().regex(/^([a-z0-9_.\-]+:)?[a-z0-9_.\-]+$/).min(2),
  on_add: z.string(),
  on_remove: z.string(),
  associate_team: z.string().regex(/^[0-9A-Za-z_\-.+]+$/gi, {
    message: "You must insert a valid vanilla team name"
  }).nullable(),
  group: z.string().min(2),
  permission: z.string().min(2),
})

export function ConfigGen() {
  const [onJoin, setOnJoin] = useState(false);
  const [extraInput, setExtraInput] = useState(<></>);
  const [extra, setExtra] = useState([]);
  const [output, setOutput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      type: "autowhitelist:whitelist",
      on_add: "",
      on_remove: "",
      associate_team: "",
      group: "",
      permission: "",
    }
  });
  const values = form.watch();

  const extraFields = useCallback(() => {
    if (extra.length == 0) return "";

    const val = {};
    for (const key of Object.keys(values).filter(value => extra.includes(value))) {
      val[key] = values[key];
    }

    return val;
  }, [extra, values]);

  useEffect(() => {
    switch (values.type) {
      case "autowhitelist:execute_command": {
        setExtra(["on_add", "on_remove"])
        setExtraInput(
          <>
            <FormField
              control={form.control}
              name="on_add"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>When adding player run:</FormLabel>
                    <FormControl>
                      <Input placeholder="/give {player} diamond 1" type={"text"} {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="on_remove"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>When removing player run:</FormLabel>
                    <FormControl>
                      <Input placeholder="/scoreboard player set reset {player} 1" type={"text"} {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <Admonition type={"info"} className={"tw-text-sm !tw-mb-0"}>
              When an user's role change to another valid one the remove and add commands will be executed<br/>
              First it executes the remove command of the old entry and than the add command of the new one
            </Admonition>
          </>
        )
        break;
      }
      case "autowhitelist:team": {
        setExtra(["associate_team"]);
        setExtraInput(
          <>
            <FormField
              control={form.control}
              name="associate_team"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Add the player to the team:</FormLabel>
                    <FormControl>
                      <Input placeholder="twitch_tier_1" type={"text"} {...field} />
                    </FormControl>
                    <FormDescription>
                      The player is removed from the team when removed from the whitelist<br/>
                      If their role change the mod will properly upgrade/downgrade their team
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </>
        );
        break;
      }
      case "autowhitelist:luckperms/group": {
        setExtra(["team"]);
        setExtraInput(
          <>
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Add the player to the group:</FormLabel>
                    <FormControl>
                      <Input placeholder="twitch_tier_1" type={"text"} {...field} />
                    </FormControl>
                    <FormDescription>
                      The player is removed from the group when removed from the whitelist<br/>
                      If their role change the mod will properly upgrade/downgrade their group
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </>
        );
        break;
      }
      case "autowhitelist:luckperms/permission": {
        setExtra(["team"]);
        setExtraInput(
          <>
            <FormField
              control={form.control}
              name="permission"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Give the player the permission:</FormLabel>
                    <FormControl>
                      <Input placeholder="worldedit.navigation.thru.tool" type={"text"} {...field} />
                    </FormControl>
                    <FormDescription>
                      The permission is removed from the player when they are removed from the whitelist<br/>
                      If their role change the mod will properly upgrade/downgrade their permission
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </>
        );
        break;
      }
      default: {
        setExtra([]);
        setExtraInput(<></>);
        break;
      }
    }
  }, [values.type]);

  useEffect(() => {
    const output: any = {
      "roles": !!values.role ? values.role.split(/, ?/) : [],
      "type": values.type
    }

    if (extra.length > 0) {
      output.execute = extraFields();
    }

    setOutput(JSON.stringify(output, null, 2))
  }, [values]);

  useEffect(() => {
    form.trigger("role");
    form.trigger(extra);
  }, [values.role, values.on_add, values.on_remove, values.associate_team, values.group, values.permission]);

  return (
    <>
      <div className={"tw-bg-background-secondary-light dark:tw-bg-background-secondary-dark tw-rounded-md tw-p-4 tw-mb-4 tw-border"}>
        <Form {...form}>
          <FormField
            control={form.control}
            name="role"
            rules={{
              pattern: /test/,
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>If user has role</FormLabel>
                <FormControl>
                  <Input placeholder="@Twitch subs" type={"text"} {...field} />
                </FormControl>
                <FormDescription>
                  Insert the role name or ID, separated by commas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className={"tw-pt-4"}>
                <FormLabel>Then</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="autowhitelist:whitelist">Whitelist player</SelectItem>
                      <SelectItem value="autowhitelist:execute_command">Execute command</SelectItem>
                      <SelectItem value="autowhitelist:team">Add to vanilla team</SelectItem>
                      <SelectItem value="autowhitelist:luckperms/group">Give Luckperms group</SelectItem>
                      <SelectItem value="autowhitelist:luckperms/permission">Give Luckperms permission</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={"tw-px-4"}>
            {extraInput}
          </div>
        </Form>
      </div>

      <CodeBlock language={"json5"}>
        {output}
      </CodeBlock>
    </>
  )
}
