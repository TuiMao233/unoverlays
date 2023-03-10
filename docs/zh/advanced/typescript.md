# ⌨️ Typescript

如果您希望组件在回调中调用时具有正确的类型声明，需要将 `props` 提取到一个单独的文件中，简单的案例：

- 步骤.1: 外部定义参数类型

```ts
export interface OverlayParams {
  title?: string
}
export type OverlayResolved = string
```

- 步骤.2: 组件使用参数类型

```vue
<!-- index.vue -->
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
import type { OverlayParams, OverlayResolved } from './props'
const props = defineProps<OverlayParams>()
const { visible, confirm, cancel } = useOverlayMeta<OverlayResolved>({
  animation: 1000
})
</script>
```

- 步骤.3: 在使用 `createOverlay` 或 `renderOverlay` 时传入类型

```ts
import { createOverlay } from 'unoverlay-vue'
import OverlayComponent from './overlay.vue'
import type { OverlayParams, OverlayResolved } from './define.ts'

const callback = createOverlay<OverlayParams, OverlayResolved>(OverlayComponent)
```

> 如果您对 vue 的 props 运行时验证有要求，你可以这么做：

- 步骤.1: 外部定义参数类型

```ts
import type { ExtractInferTypes } from 'vue'
// define.ts
export const overlayProps = {
  title: String
}
export type OverlayParams = ExtractInferTypes<typeof overlayProps>
export type OverlayResolved = string
```

- 步骤.2: 组件使用参数类型

```vue
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { useOverlayMeta } from 'unoverlay-vue'
import type { OverlayResolved } from './props'
import { overlayProps } from './props'
const props = defineProps(overlayProps)
const { visible, confirm, cancel } = useOverlayMeta<OverlayResolved>({
  animation: 1000
})
</script>
```

- 步骤.3: 与上述一致, 则不在阐述