# 🤏 外部控制流程

如果把控制权都交给 Component，会在一些使用场景时收到限制，Unoverlay Vue 转换的组件允许用户在外部控制组件的流程

`Model` 的返回值的功能不仅仅包括 `Promise` 在此基础还有 `confirm` 和 `cancel`

```ts
const Model = createOverlay(MyComponent)
const promiser = Model({/* you props */})

function close() {
  promiser.cancel()
}
function yes() {
  promiser.confirm({/* you resolved value */})
}
```

> 由于渲染需要等待， promiser 中的 `cancel / confirm` 不能立即调用，一般建议在回调函数内部中使用。