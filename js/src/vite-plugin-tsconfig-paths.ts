import { Plugin } from 'vite';
import { relative } from 'path';
import { loadConfig, createMatchPath } from 'tsconfig-paths';

const plugin: Plugin = {
    name: 'tsconfig-paths',
};

const config = loadConfig();

if (config.resultType === 'failed') {
    console.warn('[vite-tsconfig-paths]', config.message);
} else if (config.paths) {
    const matchPath = createMatchPath(config.absoluteBaseUrl, config.paths, config.mainFields, config.addMatchAll);
    const resolved = new Map<string, string>();

    plugin.resolveId = (id) => {
        let path = resolved.get(id);
        if (!path) {
            path = matchPath(id, undefined, undefined);
            if (path) {
                resolved.set(id, (path = '/' + relative(process.cwd(), path)));
            }
        }
        return path;
    };

    // resolver = {
    //   alias(id) {
    //     let path = resolved.get(id)
    //     if (!path) {
    //       path = matchPath(id, undefined, undefined, supportedExts)
    //       if (path) {
    //         resolved.set(id, (path = '/' + relative(process.cwd(), path)))
    //         debug(`resolved "${id}" to "${path}"`)
    //       }
    //     }
    //     return path
    //   },
    // }
}

export default plugin;
