import { KojiBridge } from '../../kojiBridge';
/**
 * Allow for navigation within a koji.
 */
export declare class Navigate extends KojiBridge {
    /**
     * Navigate replaces the currently loaded Koji with the content of `url`
     *
     * @param url The url to navigate to
     */
    to(url: string): void;
    /**
     * Presents the currently loaded Koji in a sheet that animates from
     * the bottom of the screen. If the parent Koji is already presented in a
     * modal, presenting a new Koji will navigate within the sheet instead of
     * presenting another sheet.
     *
     * @param url The url to present in the modal
     */
    presentInModal(url: string): void;
    /**
     * Programmatically create a new remix.
     *
     * @param appId [appId] An optional app id; if this parameter is omitted, the current Koji will be remixed
     */
    createRemix(appId?: string): void;
    /**
     * Programmatically open the Koji's share sheet/dialog.
     */
    openShareDialog(): void;
}
export declare const navigate: Navigate;
