const tsc = require('typescript');
const tsConfig = require('@mvp/example/tsconfig.json');

module.exports = {
    process(src, path) {
        if (path.endsWith('.ts') || path.endsWith('.tsx')) {
            return tsc.transpile(
                src,
                tsConfig.compilerOptions,
                path,
                []
            );
        }
        return src;
    },
};
