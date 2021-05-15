import { EditorType, EditorMode } from '../types';

/**
 * Describes the remixer's editor.
 */
export interface EditorAttributes {
  /** Type of editor, either `instant` for an instant remix or `full` for the code editor. */
  type?: EditorType;
  /** Distinguishes between a `new` remix and an `edit` to the user's existing Koji. */
  mode?: EditorMode;
}
