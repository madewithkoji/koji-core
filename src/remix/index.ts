import { client } from '../@decorators/client';

type EditorType = 'instant' | 'full';
type EditorMode = 'edit' | 'new';

interface EditorAttributes {
  type?: EditorType;
  mode?: EditorMode;
}

/** Class representing the remix state. */
export class Remix {
  private observers: Array<Function>;

  constructor() {
    this.observers = [];
  }

  register() {
    window.addEventListener('message', ({ data }) => {
      const { event } = data;

      // Handle initialization event
      if (event === 'KojiPreview.IsRemixing') {
        const { isRemixing, editorAttributes = {} } = data;
        try {
          this.notify(isRemixing, editorAttributes);
        } catch (err) {
          console.log(err);
        }
      }
    });
  }

  /**
   * Subscribe to something new.
   * @param The callback that will run when remix state changes.
   * @return The unsubscribe function.
   */
  @client
  subscribe(callback: Function) {
    this.observers.push(callback);

    return () => {
      this.observers = this.observers.filter((fn) => fn !== callback);
    };
  }

  private notify(isRemixing: boolean, editorAttributes: EditorAttributes) {
    this.observers.forEach((observer) => {
      observer(isRemixing, editorAttributes);
    });
  }
}

export interface IRemix extends Remix {}

export const remix = new Remix();
