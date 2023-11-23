const path = require('path');
const prod = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  mode: prod ? 'production' : 'development',
  devtool: prod ? undefined : 'source-map',
  plugins: [new MiniCssExtractPlugin()],
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
        test: /\.svg$/,
        use: ['@svgr/webpack'],
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
    host: 'localhost',
    port: 3000,
    hot: false,
    liveReload: true,
    static: path.join('./', 'build'),
    proxy: {
      '/api/*': 'http://localhost:3001',
    },
  },
};
