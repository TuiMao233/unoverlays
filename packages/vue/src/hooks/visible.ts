import type { Ref } from 'vue-demi'
import type { Emitter } from 'mitt'
import type { ImperativePromiser } from '@unoverlays/utils'
import { OverEvents } from '../internal'

export interface VisiblePromiseOptions {
  promiser?: ImperativePromiser
  vanish?: Function
  events?: Emitter<any>
}

export function useVisibleScripts(visible: Ref<boolean>, options: VisiblePromiseOptions) {
  function cancel(value?: any) {
    options.promiser?.reject(value)
    options.events?.emit(OverEvents.Cancel, value)
    visible.value = false
  }
  function confirm(value?: any) {
    options.promiser?.resolve(value)
    options.events?.emit(OverEvents.Confirm, value)
    visible.value = false
  }
  function vanish() {
    options.vanish?.()
    options.promiser?.reject()
  }

  if (options.promiser) {
    options.promiser.promise.confirm = confirm
    options.promiser.promise.cancel = cancel
  }

  return { visible, confirm, cancel, vanish }
}