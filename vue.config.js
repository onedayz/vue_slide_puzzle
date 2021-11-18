const path = require('path');

module.exports = {
    publicPath: '.',
    outputDir: 'docs',
    assetsDir: 'assets', // prefix 'dist/'
    filenameHashing: true,
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'], //확장자를 제거하고 불러낼수 있다.
            alias: {
                '@': path.join(__dirname, 'src')
            }
        },
        devtool: 'source-map'
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            title: 'Slide Puzzle',
            filename: 'index.html'
        }
    },
    devServer: {
        port: 8080
    }
}

