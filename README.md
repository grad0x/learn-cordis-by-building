# 项目说明

这是一个通过构建最小实现理解 Cordis 架构思想的学习项目。

## 当前阶段

当前支持：

* Basic Plugin Runtime
* Effect lifecycle management
* Service dependency management
* Plugin Context hierarchy

Effect 用于管理 Plugin 创建的副作用，并在 Context dispose 时执行清理。

Service 用于插件之间共享能力，Plugin 通过声明依赖实现解耦。

每个 Plugin 在独立 Context 中运行，从而拥有独立生命周期和资源边界。
