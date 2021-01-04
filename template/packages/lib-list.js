module.exports = {
  index: {
    input: 'packages/index.js',
    output: 'index',
  },
  'assets-loader': {
    input: 'packages/assets-loader.js',
    output: 'assets-loader',
  },
  'x-svg-icon': {
    input: 'packages/components/x-svg-icon/index.js',
    output: 'x-svg-icon',
  },
  'x-dateformat-plugin': {
    input: 'packages/plugins/dayjs/x-date-format.js',
    output: 'x-dateformat-plugin',
  },
}
