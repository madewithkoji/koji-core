/* eslint-disable import/no-named-as-default */
import Koji from './frontend';

export { KojiBackend } from './backend';

declare global {
  interface Window {
    /** Enables Koji's proxy server to write remix-specific values to the KOJI_OVERRIDES property. */
    KOJI_OVERRIDES: any;
    /** Private reference to the Koji Feed Key, which is saved in a URL fragment when the Koji first loads */
    KOJI_FEED_KEY?: string;
  }
}

export default Koji;
