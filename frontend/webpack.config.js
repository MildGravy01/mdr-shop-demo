const path = require('path');
const prod = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const commonWebpackConfig = {
    entry: path.join(__dirname, '/src/index.tsx'),
    mode: prod ? 'production' : 'development',
    devtool: prod ? undefined : 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        favicon: path.join(__dirname, '/public/favicon.ico'),
        template: path.join(__dirname, '/public/default.ejs'),
        publicPath: '/',
      }),
      new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
          },
          use: 'ts-loader',
        },
        {
          test: /\.svg$/i,
          issuer: /(?!styles)\.[jt]s[x]?$/,
          resourceQuery: {not: [/url/]}, // exclude react component if *.svg?url
          use: ['@svgr/webpack'],
        },
        {
          test: /\.svg$/i,
          type: 'asset',
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|jpg|woff|woff2|eot|otf|gif|ico|mp4|webm|webp|jpeg)$/,
          type: 'asset',
        },
      ],
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        img: path.resolve(__dirname, 'src/img'),
      },
    },
    output: {
      filename:
        prod ?
          '[name].[contenthash].bundle.js' :
          '[name].bundle.js',
      path: path.resolve(__dirname, 'build'),
      asyncChunks: true,
      chunkFilename: (pathData) => {
        return pathData.chunk.name === 'main' ?
          '[name].chunk.js' :
          '[name]/[name].chunk.js';
      },
      clean: true,
    },
    devServer: {
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 3000,
      hot: false,
      liveReload: true,
      static: path.join(__dirname, 'build'),
      proxy: {
        '/api/*': 'http://localhost:3001',
      },
    },
  };
  return commonWebpackConfig;
};
