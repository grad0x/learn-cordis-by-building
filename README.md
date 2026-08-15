# 项目说明

这是一个通过构建最小实现理解 Cordis 架构思想的学习项目。

## 当前阶段

当前支持：

* Basic Plugin Runtime
* Effect lifecycle management

Effect 用于管理 Plugin 创建的副作用，并在 Context dispose 时执行清理。

后续计划：

* Service dependency
* Context hierarchy
