const path = require('path');
const HtmlWpPlugin = require('html-webpack-plugin');
const PATH = { 
    dist: path.join(__dirname, "dist")
}

module.exports = { 
    entry: './src/app.js',
    output: { 
        path: PATH.dist,
        filename: '[name].js'
    },
    module: { 
        rules: [
            {test: /\.css/, use: 'css-loader'},
            {test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }},
            {
                test: /\.pug$/,
                use: [ 'babel-loader', 'pug-as-jsx-loader' ]
            }
        ],
    },
    devServer: { 
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        compress: true, 
        open: true,
        stats: "errors-only",
    },
    plugins: [new HtmlWpPlugin({ 
        title: 'Custom template',
        minify: { 
            collapseWhitespace: true
        },
        hash: true,
        template: './src/index.html'
    })]
}