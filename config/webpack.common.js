// Webpack configurations common to development and production

// ====== IMPORTS ======

// System
const path = require('path');

// Functions
const getDirs = require('./functions/getDirectories.js');

// ====== GLOBAL VARS ======

const entryFolders = getDirs(path.join(__dirname, '../src'));
console.log('Building from entry points:');
entryFolders.forEach((entry) => {
    console.log(entry);
});


// ====== CONFIGURATION ======

module.exports = {
    entry: {
        '/diffusion/diffusion': './src/diffusion/diffusion.js',
        '/diffusionKeyConf/diffusionKeyConf': './src/diffusionKeyConf/diffusionKeyConf.js',
        '/diffusionTest/diffusionTest': './src/diffusionTest/diffusionTest.js',
        '/serverInfo/serverInfo': './src/serverInfo/serverInfo.js',
        '/diffusionApiRequest/diffusionApiRequest': './src/diffusionApiRequest/diffusionApiRequest.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }            
        ]
    }
}