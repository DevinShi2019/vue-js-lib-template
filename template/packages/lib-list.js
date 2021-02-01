const components = require('./components/component.json')
const modules = require('./module.json')

const moduleMap = {...modules, ...components}
const moduleLib = Object.keys(moduleMap).reduce((lib, name) => {
  lib[name] = {
    input: moduleMap[name],
    output: name
  }
  return lib
}, {})

module.exports = {
  index: {
    input: 'packages/index.js',
    output: 'index',
  },
  'assets-loader': {
    input: 'packages/assets-loader.js',
    output: 'assets-loader',
  },
  'x-dateformat-plugin': {
    input: 'packages/plugins/dayjs/x-date-format.js',
    output: 'x-dateformat-plugin',
  },
  ...moduleLib
}
