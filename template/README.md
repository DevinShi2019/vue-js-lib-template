# vue-lib-starter

[文档地址](https://juejin.im/post/5d7860b0f265da03bc12a3d2)

## 按需引入配置
路径必须已packages开口，不可以忽略index文件名
### component.json (配置需要按需引入的插件)
```
{
  "x-svg-icon": "packages/components/x-svg-icon/index"
}
```
### 相关配置 (config/index.js)
```
{
  // 外链忽略（默认将所有的node_modules中的包配置为外链，但存在一个特殊的包不支持这样的默认设置，在这里单独配置，key为包名，value为是否为外链）
  external_ingore: {  
    '@antv/x6': true,
    'vue': false
  },
  // 库前缀，引入公共模块需要
  prefix: 'x-dcloud-bpm'
}
```
## module.json (公共模块配置单独打包)
```
{
  "bpmn-utils": "packages/utils/index"
}
```
### 引入
```
import { validate } from 'x-dcloud-bpm/packages/utils/index'
```
## 安装依赖
```
yarn install
```

### 运行example
```
yarn run serve
```


### 运行测试用例
```
yarn run test:unit
```

### 使用vue-cli3 打包库
```
yarn run  lib:cli
```

### 使用rollup打包库
```
yarn run  lib
```

### 格式化全部js文件
```
yarn run  lint:prettier
```

### 格式化全部css文件
```
yarn run  lint:css
```
### 运行项目文档
```
yarn run  docs:dev
```

### 打包项目文档
```
yarn run  docs:build
```

### 生成修改日志
```
yarn run  version
```
