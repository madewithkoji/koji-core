import { KojiBridge } from '../../kojiBridge';
import { client } from '../../@decorators/client';

/**
 * Provides methods for controlling navigation within your Koji template.
 */
export class Navigate extends KojiBridge {
  /**
   * Replaces the currently loaded Koji with the content of `url`.
   *
   * @param url The url to navigate to
   */
  @client
  to(url: string): void {
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
  presentInModal(url: string): void {
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
  createRemix(appId?: string): void {
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
   * Programmatically open the Koji's share sheet/dialog.
   */
  @client
  openShareDialog(): void {
    this.sendMessage({
      kojiEventName: 'Koji.Share',
      data: {},
    });
  }
}

export const navigate = new Navigate();
