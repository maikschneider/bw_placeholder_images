const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin({
    filename: 'Resources/Public/Css/backend/TriangularElement.css',
  })],
  entry: {
      TriangularElement: './Resources/Private/TypeScript/TriangularElement.ts'
  },
  output: {
    filename: 'Resources/Public/JavaScript/[name].js',
    path: path.resolve(__dirname, '.'),
    libraryTarget: 'amd',
    library: "TYPO3/CMS/BwPlaceholderImages/[name]"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'TYPO3/CMS/Backend': path.resolve(__dirname, 'public/typo3/sysext/backend/Resources/Private/TypeScript/*'),
      'TYPO3/CMS/Core': path.resolve(__dirname, 'public/typo3/sysext/core/Resources/Private/TypeScript'),
      'TYPO3/CMS/BwPlaceholderImages': path.resolve(__dirname, 'Resources/Private/TypeScript')
    }
  },
  externals: {
    'TYPO3/CMS/Backend/Modal': 'TYPO3/CMS/Backend/Modal',
    'TYPO3/CMS/Backend/Icons': 'TYPO3/CMS/Backend/Icons',
    'jquery': 'jquery'
  }
};
