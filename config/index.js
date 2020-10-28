const path = require('path')

const config = {
  projectName: 'jza-taro-redux',
  date: '2020-9-12',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    imageUrlLoaderOption: {
      esModule: false
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  alias: {
    '@/api': path.resolve(__dirname, '..', 'src/services/api'),
    '@/tip': path.resolve(__dirname, '..', 'src/utils/tip'),
    '@/util': path.resolve(__dirname, '..', 'src/utils/util'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/services': path.resolve(__dirname, '..', 'src/services'),
    '@/route': path.resolve(__dirname, '..', 'src/utils/route'),
    '@/data': path.resolve(__dirname, '..', 'src/data'),
    '@/i18n': path.resolve(__dirname, '..', 'src/i18n'),
    '@/messages': path.resolve(__dirname, '..', 'src/utils/messages'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/interfaces': path.resolve(__dirname, '..', 'src/interfaces'),
    '@styles': path.resolve(__dirname, '..', 'src/styles'),
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
