var ExtractTextPlugin = require("extract-text-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const entry = require('webpack-glob-entry');
const path = require("path");
const extractCSS = new ExtractTextPlugin({
    filename: './[name].css',       // 编译后生成的css文件名
    disable: false,
    allChunks: true
});
const baseConfig = {
    module: {
　　　　//加载器配置
        rules: [
　　　　　　 { 
　　　　　　　　 test: /\.css$/, 
　　　　　　　　 loader:ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: ['css-loader','postcss-loader']
                })
　　　　　　 },
　　　　　　 { 
　　　　　　　　 test: /\.less$/, 
　　　　　　　　 loader:ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: ['css-loader','less-loader']
                })
　　　　　　 },
            { 
　　　　　　     test: /\.(png|jpg|svg|jpeg|gif)$/,
　　　　　　　　 loader:'url-loader',
                options:{
                    limit:8,
                    name:'../images/[name].[ext]'
                }
　　　　　　 }
　　　　]
　　},
　　plugins: [
        extractCSS,
        new FixStyleOnlyEntriesPlugin()
    ],
}
module.exports = [
    {
        // 需要进行打包处理的css入口文件
    　　entry:entry('./app/css/*.css'),
        output: {
    　　　　path: path.resolve(__dirname,'./dist/css')
    　　},
        ...baseConfig,
    },
    {
    　　entry:entry('./app/css/*.less'),
        output: {
    　　　　path: path.resolve(__dirname,'./dist/css')
    　　},
        ...baseConfig,
    },
    {
    　　entry:entry('./app/js/*.js'),
        output: {
    　　　　path: path.resolve(__dirname,'./dist/js')
    　　},
        ...baseConfig,
    }
];