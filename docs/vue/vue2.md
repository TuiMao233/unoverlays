# Vue2 Support

If you are using Vue2, you can install `@overlastic/vue2` and use a `mixin` to pass properties to the component. Here is an example:

```ts
import { useExtendOverlay } from '@overlastic/vue2'
export default {
  mixins: [useExtendOverlay({ duration: 1000 })],
  methods: {
    onClick() {
      // use this.$visible
      // use this.$resolve or this.$reject
    }
  }
}
```
