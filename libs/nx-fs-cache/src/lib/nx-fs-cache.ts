import {
  RemoteCacheImplementation,
  CustomRunnerOptions,
  createCustomRunner,
  initEnv,
} from 'nx-remotecache-custom';
import { workspaceRoot, joinPathFragments } from '@nx/devkit';
import { ensureDir, ensureDirSync, exists } from 'fs-extra';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { Readable } from 'stream';

// define custom parameters for your nx.json here
interface MyRunnerOptions extends CustomRunnerOptions {
  path: string;
}
async function createRunner(options: MyRunnerOptions) {
  // initialize environment variables from dotfile
  initEnv(options as CustomRunnerOptions);

  ensureDirSync(joinPathFragments(workspaceRoot, options.path));

  return {
    // name is used for logging purposes
    name: 'My Storage',

    // fileExists checks whether a file exists on your remote storage
    fileExists: async (filename) =>
      await exists(
        resolve(joinPathFragments(workspaceRoot, options.path, filename))
      ),

    // retrieveFile downloads a file from your remote storage
    retrieveFile: async (filename) =>
      Readable.from(
        await readFile(
          resolve(joinPathFragments(workspaceRoot, options.path, filename)),
          {
            encoding: 'utf-8',
          }
        )
      ),

    // storeFile uploads a file from a buffer to your remote storage
    storeFile: async (filename, buffer) =>
      await writeFile(
        resolve(joinPathFragments(workspaceRoot, options.path, filename)),
        buffer
      ),
  } as RemoteCacheImplementation;
}

export default createCustomRunner<MyRunnerOptions>((opts) =>
  createRunner(opts)
);
