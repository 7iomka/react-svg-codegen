const {generateSVG} = require('../../dist');
const path = require('path');


generateSVG({
    iconsFolder: path.resolve(__dirname, './public/deep/icons'),

    outputFolder: path.resolve(__dirname, './src/shared/ui/icons'),

    output: 'index.tsx',

    serveFromPublic: true,

    sprite: true,

    watch: true,

    logger: console
})
