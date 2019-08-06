# dugtrio 本地发布工具

#### publish

发布：`ft publish <dev,statle,prepub,prod>`

如果忽略上传的操作

```
IGNORE_PROD_UPLOAD=true ft publish prod
```

####本地使用
npm link可以在本地执行命令

####本地调试
下载chrome Node.js V8 Inspector插件

在所需要发布的目录下执行
```
node --inspect-brk /绝对路径/dugtrio-publish/bin/ft-publish dev
```
使用 Node.js V8 Inspector插件 默认配置即可
