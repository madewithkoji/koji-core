/** Communicates changes to remix data. */
export interface ValueChanged {
  /** Path of the changed value. */
  path: string[];
  /** New value. */
  newValue: any;
  /** Previous value. */
  savedValue: any;
}
