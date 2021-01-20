import { KojiBridge } from '../../bridge';
import { client } from '../../@decorators/client';

interface ColorControlOptions {
  allowAlpha?: boolean;
  verbose?: boolean;
}

interface Color {
  event: string;
  result: string;
  status: string;
  type: string;
}

export class Capture extends KojiBridge {
  @client
  async color(options: ColorControlOptions = {}): Promise<string | Color> {
    const data: Color = await this.postToPlatform(
      {
        kojiEventName: 'Koji.Capture',
        data: {
          type: 'color',
          options,
        },
      },
      'Koji.CaptureSuccess',
    );

    if (options.verbose) return data;

    return data.result;
  }
}

export const capture = new Capture();
