const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const image = require('rollup-plugin-img')
const vue = require('rollup-plugin-vue')
const commonjs = require('rollup-plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const replace = require('rollup-plugin-replace')
const json = require('rollup-plugin-json')
const postcss = require('rollup-plugin-postcss')
const alias = require('rollup-plugin-alias')
const filesize = require('rollup-plugin-filesize')
const cssnano = require('cssnano')
const simplevars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const cssnext = require('postcss-cssnext')
const fs = require('fs')
const components = require('../packages/components/component.json')
const modules = require('../packages/module.json')
const copy = require('rollup-plugin-copy')
// const copy = require('rollup-plugin-copy-assets')
const svgSpriteLoader = require('rollup-svg-sprite-loader')
const { getAssetsPath, env, fsExistsSync, chalkConsole, createExternal } = require('./utils')
const { esDir } = require('../config/rollup.build.config')
const aliasConfig = require('../config/alias')
const { styleOutputPath, externalMap } = require('../config/index')
const banner = require('../config/banner')
const isEs = (fmt) => fmt === esDir

const moduleMap = {...modules, ...components}
const _external = Object.keys(moduleMap).map(moduleName => `${prefix}/${moduleMap[moduleName]}`)
const _paths = {};
Object.keys(moduleMap).forEach(moduleName => {
  _paths[`${prefix}/${moduleMap[moduleName]}`] = `./${moduleName}`
})

function createPlugins(config) {
  const exclude = 'node_modules/**'
  const plugins = [
    commonjs(),
    vue({
      css: false,
    }),
    json(),
    filesize(),
    resolve({
      extensions: aliasConfig.resolve,
      preferBuiltins: true, // 这一句是重点
      mainFields: ['browser'],
    }),
    babel({
      runtimeHelpers: true,
      // 只编译我们的源代码
      exclude,
    }),
    image({
      hash: true,
      output: getAssetsPath('/assets'), // default the root
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 10240, // default 8192(8k)
      exclude,
    }),
    postcss({
      plugins: [simplevars(), nested(), cssnext({ warnForDuplicates: false }), cssnano()],
      inject: false,
      // sourceMap: true,
      extensions: ['.css', '.scss', 'sass'],
      extract: true, // 输出路径
    }),
    replace({
      exclude,
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    alias({
      ...aliasConfig.alias,
      resolve: aliasConfig.resolve,
    }),
  ]
  if (config.min) {
    plugins.push(terser())
  }
  if (config.output === 'assets-loader' && config.suffix === '.js') {
    plugins.push(
      copy({
        targets: [
          { src: 'packages/assets', dest: 'lib' },
          { src: 'packages/locale', dest: 'lib' },
        ],
      })
    )
    plugins.push(svgSpriteLoader())
  }
  return plugins
}

/**
 * 打包
 * @param {*} config
 */
function build(builds) {
  let buildCount = 0

  const total = builds.length
  const next = async () => {
    chalkConsole.building(buildCount + 1, total)
    await buildEntry(builds[buildCount])
    buildCount++
    buildCount < total ? next() : chalkConsole.success()
  }
  next()
}
/**
 * 打包入口
 * @param {*} config
 */
async function buildEntry(config) {
  const { output, suffix, input, format, moduleName } = config

  const inputOptions = {
    input,
    external: createExternal(external_ingore, _external),
    plugins: createPlugins(config),
  }
  const fullName = output + suffix
  const file = getAssetsPath(fullName)
  const outOptions = {
    // dir: getAssetsPath(),
    file,
    format,
    name: moduleName,
    // exports: 'named',
    // globals: externalMap,
    paths: _paths
    // entryFileNames: file
  }
  const bundle = await rollup.rollup(inputOptions)
  let { output: outputData } = await bundle.generate(outOptions)

  await write({ output: outputData, fileName: output, format, fullName, file })
}
/**
 * 输入js文件
 * @param {*} param0
 */
async function write({ output, file, fileName, format, fullName } = {}) {
  for (const { isAsset, code, source } of output) {
    if (isAsset) {
      const cssFileName = `${fileName}.css`
      const filePath = isEs(format)
        ? getAssetsPath(`/${esDir}/${cssFileName}`)
        : getAssetsPath(`/${styleOutputPath}/${cssFileName}`)

      !fsExistsSync(filePath) && fs.writeFileSync(filePath, banner + source.toString())
    } else {
      const filePath = isEs(format) ? getAssetsPath(`/${esDir}/${fullName}`) : file
      let codeSource = code.replace(/\s?const\s/g, ' var ')
      fs.writeFileSync(filePath, banner + codeSource)
    }
  }
}
module.exports = {
  build,
}
