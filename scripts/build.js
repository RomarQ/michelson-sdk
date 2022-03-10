const fs = require('fs');
const esbuild = require('esbuild');

const DIST_FOLDER = './dist';

// Build steps
cleanUP();
generateBundle(['./src/index.ts', './src/converter/index.ts', './src/type.ts', './src/literal.ts']);

/**
 * Produces the js bundle
 */
function generateBundle(entryPoints) {
    esbuild.buildSync({
        entryPoints,
        bundle: true,
        outdir: DIST_FOLDER,
        platform: 'browser',
        format: 'esm',
        outExtension: { '.js': '.mjs' },
    });
    esbuild.buildSync({
        entryPoints,
        bundle: true,
        outdir: DIST_FOLDER,
        platform: 'browser',
        format: 'cjs',
        outExtension: { '.js': '.cjs' },
    });
}

/**
 * Clean UP build files
 */
function cleanUP() {
    try {
        fs.rmdirSync(DIST_FOLDER, { recursive: true, force: true });
    } catch {
        // Ignore error
    }
}
