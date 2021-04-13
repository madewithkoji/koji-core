import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

/**
 * Allow for navigation within a koji.
 */
export class Navigate extends KojiBridge {
  /**
   * Navigate replaces the currently loaded Koji with the content of `url`
   *
   * @param url The url to navigate to
   */
  @client
  public to(url: string): void {
    this.sendMessage({
      kojiEventName: 'Koji.Navigate',
      data: {
        url,
      },
    });
  }

  /**
   * Presents the currently loaded Koji in a sheet that animates from
   * the bottom of the screen. If the parent Koji is already presented in a
   * modal, presenting a new Koji will navigate within the sheet instead of
   * presenting another sheet.
   *
   * @param url The url to present in the modal
   */
  @client
  public presentInModal(url: string): void {
    this.sendMessage({
      kojiEventName: 'Koji.Navigate',
      data: {
        presentationType: 'modal',
        url,
      },
    });
  }

  /**
   * Programmatically create a new remix.
   *
   * @param appId [appId] An optional app id; if this parameter is omitted, the current Koji will be remixed
   */
  @client
  public createRemix(appId?: string): void {
    this.sendMessage({
      kojiEventName: 'Koji.CreateRemix',
      data: {
        options: {
          id: appId,
        },
      },
    });
  }

  /**
   * Programmatically navigate to the Koji's edit experience. This should only be called if the template knows that the user is an admin, otherwise the user will not be authorized to edit the Koji.
   */
  @client
  public edit(): void {
    this.sendMessage({
      kojiEventName: 'Koji.Edit',
      data: {},
    });
  }

  /**
   * Dismiss a Koji that has been presented in a popover
   */
  @client
  public dismiss(): void {
    this.sendMessage({
      kojiEventName: 'Koji.Dismiss',
      data: {},
    });
  }

  /**
   * Programmatically open the Koji's share sheet/dialog. If you do not pass any arguments, the share prompt will load for the URL of the current Koji. Pass a URL, or a relative URL, to open a share prompt for a different URL or for a deep link into your Koji.
   *
   * @param url An optional URL to use instead of the current Koji.
   * @example
   * ```javascript
   * Koji.ui.navigate.share();
   * ```
   * @example
   * ```javascript
   * Koji.ui.navigate.share('https://withkoji.com/@sean');
   * ```
   * @example
   * ```javascript
   * Koji.ui.navigate.share('?key=value');
   * ```
   */
  @client
  public openShareDialog(url?: string): void {
    this.sendMessage({
      kojiEventName: 'Koji.Share',
      data: {
        url,
      },
    });
  }
}

export const navigate = new Navigate();
