const fs = require('fs');
const esbuild = require('esbuild');

const DIST_FOLDER = './dist';

// Build steps
cleanUP();
generateBundle([
    './src/index.ts',
    './src/converter/index.ts',
    './src/core/index.ts',
    './src/core/type.ts',
    './src/core/literal.ts',
]);

/**
 * Produces the js bundle
 */
function generateBundle(entryPoints) {
    esbuild
        .build({
            entryPoints,
            bundle: true,
            minify: true,
            outdir: DIST_FOLDER,
            platform: 'browser',
            format: 'cjs',
        })
        .then((result) => {
            console.log();
            console.log('[SUCCESS]:', result);
            console.log();
        })
        .catch((e) => {
            console.log();
            console.log('[FAIL]:', 'Could not produce bundle :(');
            console.log();
            console.error(JSON.stringify(e, null, 4));
            process.exit(1);
        });
}

/**
 * Clean UP build files
 */
function cleanUP() {
    fs.rmSync(DIST_FOLDER, { recursive: true, force: true });
}
