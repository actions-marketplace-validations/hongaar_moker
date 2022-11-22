import {
  enqueueInstallDependency,
  enqueueRemoveDependency,
  getMonorepoDirectory,
  hasPlugin,
  logWarning,
  PluginArgs,
  PluginType,
  removeFile,
  writeFile,
  writePackage,
} from "@mokr/core";
import { join } from "path";

const JEST_CONFIG_FILENAME = "jest.config.js";
const JEST_CONFIG = ``;
const TS_JEST_CONFIG = `
/** @type {import("ts-jest").JestConfigWithTsJest} */

export default {
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "^(\\\\.{1,2}/.*)\\\\.js$": "$1",
  },
};
`;

async function install({ directory }: PluginArgs) {
  const monorepoDirectory = await getMonorepoDirectory({ directory });

  if (!monorepoDirectory) {
    throw new Error("Could not find monorepo directory");
  }

  if (!hasPlugin({ directory, name: "typescript" })) {
    // Install jest without ts-jest
    // @todo
  } else {
    // Install jest with ts-jest

    enqueueInstallDependency({
      directory,
      identifier: ["jest", "ts-jest", "@types/jest"],
      dev: true,
    });

    await writeFile({
      path: join(directory, JEST_CONFIG_FILENAME),
      contents: TS_JEST_CONFIG,
    });
  }

  await writePackage({
    directory,
    data: {
      scripts: {
        test: "jest",
        "watch:test": "jest --watch",
      },
    },
  });

  // At monorepo level

  await writePackage({
    directory: monorepoDirectory,
    data: {
      scripts: {
        test: "yarn workspaces foreach --topological --verbose run test",
        "watch:test":
          "yarn workspaces foreach --parallel --interlaced run watch:test",
      },
    },
  });
}

async function remove({ directory }: PluginArgs) {
  const monorepoDirectory = await getMonorepoDirectory({ directory });

  if (!monorepoDirectory) {
    throw new Error("Could not find monorepo directory");
  }

  enqueueRemoveDependency({ directory, identifier: ["jest", "ts-jest"] });

  try {
    await removeFile({ path: join(directory, JEST_CONFIG_FILENAME) });
  } catch {}

  logWarning("Please review your workspace and root package.json manually");
}

async function load() {}

export const jest = {
  type: PluginType.Workspace,
  install,
  remove,
  load,
};
