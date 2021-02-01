const devConfig = require('./dev')
const prodConfig = require('./prod')
const isProduct = ['production', 'prod'].includes(process.env.NODE_ENV)
const config = isProduct ? prodConfig : devConfig
module.exports = {
  styleOutputPath: 'theme',
  outputPath: 'lib',
  clearConsole: config.clearConsole,
  // 外链忽略
  external_ingore: {
    '@antv/x6': true,
    'vue': false
  },
  // 前缀
  prefix: 'x-dcloud-bpm'
}
