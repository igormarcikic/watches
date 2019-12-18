const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './js/main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Webpack 4 Starter',
        template: './src/index.html',
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css'
     }),
     new CopyWebpackPlugin([{
      from:'./src/assets/images',
       to:'assets/images'
    }])
  ],
  module: {
    rules: [
        {
            test: [/.js$/],
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            }
        },
        {
          test: /\.(woff?|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        },
        {
          test: [/.css$|.scss$/],                
          use:[                    
          MiniCssExtractPlugin.loader,                 
          'css-loader',
          'sass-loader'
          ] 
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/images'
              }
            }
          ]
        }
    ]
  }
};