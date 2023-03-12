import { allowed } from './tools'

export type ImperativePromiser<T = void> = Promiser<{ confirm: (value: T) => ImperativePromise<T>; cancel: Function }, T>
export type ImperativePromise<T = void> = ImperativePromiser<T>['promise']

export interface Promiser<P = object, T = void> {
  promise: Promise<T> & P
  resolve: (value: T) => void
  reject: Function
}

export function createPromiser<P, T = void>(): Promiser<P, T> {
  let resolve!: any
  let reject!: any
  const promise = new Promise<any>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as unknown as any
  return { promise, reject, resolve }
}

export function createImperativePromiser<T = void>() {
  const promiser = createPromiser<{ confirm: Function; cancel: Function }, T>()
  promiser.promise.confirm = allowed
  promiser.promise.cancel = allowed
  return promiser as ImperativePromiser<T>
}
