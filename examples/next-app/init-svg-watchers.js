const {generateSVG} = require('../../dist');
const path = require('path');


generateSVG({
    iconsFolder: path.resolve(__dirname, './src/shared/ui/icons'),

    templateFolder: path.resolve(__dirname,'../../templates'),

    output: 'index.tsx',


    watch: true,


    storybook:{
        output:  'index.stories.tsx',

        folder:path.resolve(__dirname, './src/shared/ui/icons'),

        patchFC:true,
    }
})
