export interface MountOptions {
  /**
   * mount container element id
   *
   * @default 'unified-overlay-provider'
   */
  id?: string
  /**
   * enable mount container element id auto increment
   *
   * @default true
   */
  autoIncrement?: boolean
  /**
   * the dom node to mount at render time
   *
   * @default document.body
   */
  root?: HTMLElement | null | false
}

export type PropsWidthOverlays<P = unknown> = P & {
  visible?: boolean
  onCancel?: Function
  onConfirm?: Function
  [key: string]: any
}
