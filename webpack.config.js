const path = require('path');

module.exports = {
    entry: './index.js',
    //mode: "development",
   // devtool: "inline-source-map",
    output: {
        filename: 'minisaki.js',
        libraryTarget: "window",
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};