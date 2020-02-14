import fs from 'fs'
import path from 'path'
import { sync as pkgUp } from 'pkg-up'
import { Package } from './Package'
import { LernaJson } from './LernaJson'

export const DEFAULT_LICENSE = 'MIT'
export const DEFAULT_INITIAL_VERSION = '0.0.1'
export const DEFAULT_WORKSPACES_DIRECTORY = 'packages'

const defaultOptions = {
  license: DEFAULT_LICENSE,
  initialVersion: DEFAULT_INITIAL_VERSION,
  workspacesDirectory: DEFAULT_WORKSPACES_DIRECTORY
}

export type CreateProjectOptions = {
  license: string
  initialVersion: string
  workspacesDirectory: string
}

type ProjectTemplate = (
  project: Project,
  options: CreateProjectOptions
) => Promise<void>

export class Project extends Package {
  public get lernaJson() {
    return new LernaJson(this.directory)
  }

  public static find(directory: string) {
    const root = pkgUp({ cwd: directory })

    if (root !== null) {
      return new Project(path.dirname(root))
    }
  }

  public async create(
    templateFn: ProjectTemplate,
    options: Partial<CreateProjectOptions> = {}
  ) {
    if (fs.existsSync(this.directory)) {
      throw new Error(`${this.directory} already exists`)
    }

    fs.mkdirSync(this.directory)

    const optionsWithDefaults = Object.assign({}, defaultOptions, options)

    await templateFn(this, optionsWithDefaults)
  }
}