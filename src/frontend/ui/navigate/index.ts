import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

/**
 * Provides methods for controlling navigation within your Koji template.
 */
export class Navigate extends KojiBridge {
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
   * Starts a new remix.
   *
   * @param appId ID of the Koji project to remix. Defaults to the current Koji, if an ID is not specified.
   *
   * @example
   * ```html
   * <button type="button" onClick={() => Koji.ui.navigate.createRemix()}>
   *   Create my own remix
   * </button>
   * ```
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
   * Opens the Koji in the editing experience.
   *
   * <p class="note"> Check that the current user is an admin before calling this method.
   * Otherwise, the user will not be authorized to edit the Koji.</p>
   *
   * @example
   * ```html
   * <button type="button" onClick={() => Koji.ui.navigate.edit()}>
   *   Edit this Koji
   * </button>
   * ```
   */
  @client
  public edit(): void {
    this.sendMessage({
      kojiEventName: 'Koji.Edit',
      data: {},
    });
  }

  /**
   * Closes a Koji that is open in a modal window.
   *
   * @example
   * ```html
   * <button type="button" onClick={() => Koji.ui.navigate.dismiss()}>
   *   Close window
   * </button>
   * ```
   */
  @client
  public dismiss(): void {
    this.sendMessage({
      kojiEventName: 'Koji.Dismiss',
      data: {},
    });
  }

  /**
   * Opens the sharing dialog box. By default, the share prompt loads for the URL of the current Koji. Specify a full or a relative URL to open a share prompt for a different URL or for a deep link into your Koji.
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
