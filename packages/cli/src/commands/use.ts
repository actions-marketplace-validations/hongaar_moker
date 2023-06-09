import {
  formatTask,
  hasPlugin,
  installPluginTask,
  loadPluginsTask,
  task,
  updateDependenciesTask,
  warning,
} from "@mokr/core";
import { command } from "bandersnatch";
import { resolve } from "node:path";
import { REINSTALL_WARNING } from "../constants.js";

export const use = command("use")
  .description("Install plugin in repo or workspace")
  .argument("plugin", {
    description: "Plugin name",
    variadic: true,
  })
  .option("reinstall", {
    type: "boolean",
    description: "Re-install plugin even if it is already installed",
  })
  .option("cwd", {
    description: "Directory to use as the current working directory",
    default: process.cwd(),
  })
  .action(async ({ plugin, reinstall, cwd }) => {
    const directory = resolve(cwd);

    for (const name of plugin) {
      await task(`Add plugin ${name}`, async () => {
        if (!reinstall && (await hasPlugin({ directory, name }))) {
          throw new Error(`Plugin ${name} is already installed`);
        }

        await installPluginTask({ directory, name });
      });
    }

    await loadPluginsTask({ directory });

    await updateDependenciesTask({ directory });

    await formatTask({ directory });

    if (reinstall) {
      warning(REINSTALL_WARNING);
    }
  });
