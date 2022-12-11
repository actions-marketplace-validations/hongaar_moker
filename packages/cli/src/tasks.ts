import {
  exec,
  hasPlugin,
  installPlugin,
  loadAllPlugins,
  runDependencyQueues,
  task,
} from "@mokr/core";

type DirOption = {
  directory: string;
};

export async function format({ directory }: DirOption) {
  if (await hasPlugin({ directory, name: "prettier" })) {
    await task(`Format code`, () =>
      exec("yarn", ["format"], { cwd: directory })
    );
  }
}

export async function addPlugin({
  directory,
  name,
}: DirOption & { name: string }) {
  await task(`Add plugin ${name}`, () => installPlugin({ directory, name }));
}

export async function loadPlugins({ directory }: DirOption) {
  await task(`Load plugins`, () => loadAllPlugins({ directory }));
}

export async function updateDependencies({ directory }: DirOption) {
  await task(`Update dependencies`, () => runDependencyQueues({ directory }));
}