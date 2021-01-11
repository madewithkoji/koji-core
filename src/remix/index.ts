type EditorType = 'instant' | 'full';
type EditorMode = 'edit' | 'new';

interface EditorAttributes {
  type?: EditorType;
  mode?: EditorMode;
}

/** Class representing the remix state. */
export default class Remix {
  isRemixing: boolean;

  observers: Array<Function>;

  editorAttributes: EditorAttributes;

  constructor() {
    this.isRemixing = false;
    this.observers = [];
    this.editorAttributes = {
      type: undefined,
      mode: undefined,
    };
  }

  register() {
    window.addEventListener('message', ({ data }) => {
      const { event } = data;

      // Handle initialization event
      if (event === 'KojiPreview.IsRemixing') {
        const { isRemixing, editorAttributes = {} } = data;
        try {
          this.isRemixing = isRemixing;
          this.notify(isRemixing, editorAttributes);
          this.editorAttributes = editorAttributes || {};
        } catch (err) {
          console.log(err);
        }
      }
    });
  }

  /**
   * Subscribe to platform updates about remix state.
   * @param {function} callback: The callback that will run when remix state changes.
   * @return {function} The unsubscribe function.
   */
  subscribe(callback: (isRemixing: boolean, editorAttributes: EditorAttributes) => () => void) {
    this.observers.push(callback);

    return () => {
      this.observers = this.observers.filter((fn) => fn !== callback);
    };
  }

  notify(isRemixing: boolean, editorAttributes: EditorAttributes) {
    this.observers.forEach((observer) => {
      observer(isRemixing, editorAttributes);
    });
  }
}

export interface IRemix extends Remix {}
