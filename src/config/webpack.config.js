const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // Configuración de optimización
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: process.env.NODE_ENV === 'production',
            drop_debugger: process.env.NODE_ENV === 'production',
          },
          mangle: true,
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
        },
      },
    },
  },

  // Plugins de optimización
  plugins: [
    // Compresión gzip
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    // Analizador de bundle (solo en desarrollo)
    ...(process.env.ANALYZE === 'true' ? [new BundleAnalyzerPlugin()] : []),
  ],

  // Resolución de módulos
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../'),
      '@components': path.resolve(__dirname, '../components'),
      '@utils': path.resolve(__dirname, '../utils'),
      '@hooks': path.resolve(__dirname, '../hooks'),
      '@config': path.resolve(__dirname, '../config'),
      '@context': path.resolve(__dirname, '../context'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  // Configuración de módulos
  module: {
    rules: [
      // Optimización de imágenes
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },

  // Configuración de performance
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}; 