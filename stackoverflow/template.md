You can use [@overlays/vue](https://overlays.vercel.app/en/vue/) to create components, reduce component DTL syntax through customization, and use function calls.

```html
<!-- overlay.vue -->
<script setup>
import { defineProps } from 'vue'
import { useOverlayMeta } from '@overlays/vue'
const props = defineProps({
  content: String,
})
// Get overlay information from useOverlayMeta
const { visible, resolve, reject } = useOverlayMeta({
  // Duration of the overlay animation to avoid premature component destruction
  animation: 1000,
})
</script>

<template>
  <!-- Customized modal using vuetify -->
  <v-dialog v-model="visible">
    <div>{{ content }}</div>

    <button @click="resolve(`${content}:confirmed`)"> click confirm </button>
  </v-dialog>
</template>
```

You can use the `defineOverlay` method to convert the component into a modal dialog in Javascript / Typescript, which allows you to call it.

```ts
import { defineOverlay } from '@overlays/vue'
import OverlayComponent from './overlay.vue'

// Convert to imperative callback
const callback = defineOverlay(OverlayComponent)
// Call the component and get the value of the resolve callback
const value = await callback({ content: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"
```

You can register Unoverlays globally, which will inherit the application context for all popups.

```ts
// main.js
import { createApp } from 'vue'
import unoverlay from '@overlays/vue'

const app = createApp({})
app.use(unoverlay)
```

or you can also pass in the context with finer control.

```ts
import { renderOverlay } from '@overlays/vue'
import { getCurrentInstance } from 'vue-demi'
import Component from './overlay.vue'

// in your setup method
const { appContext } = getCurrentInstance()!
renderOverlay(Component, {
  props: {},
  appContext
})
```