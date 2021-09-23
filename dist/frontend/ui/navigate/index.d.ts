import { KojiBridge } from '../../kojiBridge';
/**
 * Provides methods for controlling navigation within your Koji app.
 */
export declare class Navigate extends KojiBridge {
    /**
     * Replaces the currently loaded Koji with the content at the specified URL.
     *
     * @param url URL of the content to load.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.to(url)}>
     *  My favorite Koji
     * </button>
     * ```
     */
    to(url: string): void;
    /**
     * Opens the content at the specified URL in a modal window that animates from the bottom of the screen.
     * If the parent Koji is already displayed in a modal window, the content will open in the same window, replacing the current view.
     *
     * @param url URL of the content to load.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.presentInModal(url)}>
     *   My favorite Koji
     * </button>
     * ```
     */
    presentInModal(url: string): void;
    /**
     * Starts a new customization.
     *
     * @param appId ID of the Koji project to customize. Defaults to the current Koji app if an ID is not specified.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.createRemix()}>
     *   Create my own customization
     * </button>
     * ```
     */
    createRemix(appId?: string): void;
    /**
     * Opens the Koji app in editing mode.
     *
     * NOTE: Check that the current user is an admin before calling this method.
     * Otherwise, the user will not be authorized to edit the Koji app.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.edit()}>
     *   Edit this Koji
     * </button>
     * ```
     */
    edit(): void;
    /**
     * Closes a Koji app that is in a modal window.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.dismiss()}>
     *   Close window
     * </button>
     * ```
     */
    dismiss(): void;
    /**
     * Opens the sharing dialog box. By default, the dialog box shares the URL of the current Koji.
     * Specify a full or a relative URL to open a dialog box for sharing a different URL or for a deep link into your Koji app.
     *
     * NOTE: If you use this method to share a deep link in your Koji app, a `koji.to` short URL is automatically created for it.
     *
     * @param url URL to use instead of the current Koji.
     *
     * @example
     * ```html
     * <button type="button" onClick={() => Koji.ui.navigate.openShareDialog()}>
     *   Share this Koji
     * </button>
     *
     * // full URL
     * <button type="button" onClick={() => Koji.ui.navigate.openShareDialog('https://withkoji.com/@myname')}>
     *   Share your profile
     * </button>
     *
     * // relative URL
     * <button type="button" onClick={() => Koji.ui.navigate.openShareDialog('?key=value')}>
     *   Share this info
     * </button>
     * ```
     */
    openShareDialog(url?: string): void;
}
export declare const navigate: Navigate;
