export interface FastlyOptions {
  /**
   * Enables image optimizations based on content negotiation.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/auto | Fastly auto reference]].
   *
   * NOTE: Although the WebP format produces images at a higher compression ratio with a lower loss of quality, it is not supported in all browsers.
   */
  auto?: 'webp';
  /**
   * Sets the background color to use when applying padding or when replacing transparent pixels in the image.
   *
   * The value can be in HEX 3- and 6-digit format (for example, `a22` or `cf23a5`), RGB format (for example,  `255,0,0`), or RGBA format (for example, `0,255,0,0.5`).
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/bg-color | Fastly bg-color reference]].
   */
  'bg-color'?: string;
  /**
   * Applies a Gaussian blur filter to the image.
   *
   * The value can be a number of pixels between 0.5 and 1000 (for example, `50`), or a percentage followed by `p` (for example, `1p` for 1%).
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/blur | Fastly blur reference]].
   */
  blur?: string;
  /**
   * Increases or decreases the brightness of the image.
   *
   * The value can be a number between -100 and 100, as follows:
   *
   * * `0` (default) – Leaves the image unchanged.
   * * `100` – Results in a fully white image.
   * * `-100` – Results in a fully black image.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/brightness | Fastly brightness reference]].
   */
  brightness?: string;
  /**
   * Increases or decreases the difference between the darkest and lightest tones in the image.
   *
   * The value can be a number between -100 and 100, as follows:
   *
   * * `0` (default) – Leaves the image unchanged.
   * * `-100` – Results in a fully grey image.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/contrast | Fastly contrast reference]].
   */
  contrast?: string;
  /**
   * Removes pixels from an image.
   *
   * The value starts with the desired width and height of the final image.
   * The rest of the value determines the position of the cropped region within the existing image.
   * For example: `150,100,x50,y50` crops the image to 150px by 100px and selects the starting sub region x coordinate to be 50px and the y coordinate to be 50px. `16:9` crops the image to an aspect ratio of 16:9.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/crop | Fastly crop reference]].
   */
  crop?: string;
  /**
   * Serves correctly sized images for devices that expose a device pixel ratio.
   *
   * The value can be any number between 1 and 10.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/dpr | Fastly dpr reference]].
   */
  dpr?: string;
  /**
   * Controls how the image will be constrained within the provided size (width and height) values to maintain the correct proportions.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/fit | Fastly fit reference]].
   */
  fit?: 'bounds' | 'cover' | 'crop';
  /**
   * Converts the image to the specified encoded format.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/format | Fastly format reference]].
   */
  format?:
  | 'gif'
  | 'png'
  | 'png8'
  | 'jpg'
  | 'pjpg'
  | 'bjpg'
  | 'webp'
  | 'webpll'
  | 'webply'
  | 'mp4';
  /**
   * Extracts the first frame from an animated image sequence.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/frame | Fastly frame reference]].
   */
  frame?: '1';
  /**
   * Resizes the height of the image based on pixels or percent.
   *
   * For absolute heights, set an integer number of pixels.
   * For relative heights (percent), set a value between 0 and 1 or a value between 0 and 100 followed by `p` (for example, `0.5` or `50p` for 50 percent).
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/height | Fastly height reference]].
   */
  height?: string;
  /**
   * Applies optimal quality compression to produce an output image with as much visual fidelity as possible, while minimizing the file size.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/optimize | Fastly optimize reference]].
   */
  optimize?: 'low' | 'medium' | 'high';
  /**
   * Changes the cardinal orientation of the image.
   *
   * The value can orient the image right or left, flip it horizontally, flip it vertically, or apply a combination of these options.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/orient | Fastly orient reference]].
   */
  orient?:
  | 'r'
  | 'l'
  | 'h'
  | 'v'
  | 'hv'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8';
  /**
   * Adds pixels to the edge of an image.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/pad | Fastly pad reference]].
   */
  pad?: string;
  /**
   * Removes pixels from an image before any other transformations occur.
   *
   * The value is specified in the same way as `crop`, except that `precrop` is performed before any other transformations.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/precrop | Fastly precrop reference]].
   */
  precrop?: string;
  /**
   * Optimizes the image to the given compression level for lossy file formatted images.
   *
   * The value can be any integer between 1 and 100, where 1 is a lower quality image and a smaller file and 100 is the highest quality image and larger file.
   * An optional second quality level can be specified for use when auto=webp is enabled and a WebP output format has been selected.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/quality | Fastly quality reference]].
   */
  quality?: string;
  /**
   * Controls the filter used to resize an image to a higher or lower number of pixels.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/resize-filter | Fastly resize-filter reference]].
   */
  'resize-filter'?: 'nearest' | 'linear' | 'cubic' | 'lanczos2' | 'lanczos3';
  /**
   * Sets the intensity of the colors in the image.
   *
   * The value can be any number between -100 and 100, as follows:
   *
   * * `0` (default) – Leaves the image unchanged.
   * * `-100` – Generates a grayscale image.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/saturation | Fastly saturation reference]].
   */
  saturation?: string;
  /**
   * Increases the definition of the edges of objects in the image.
   *
   * The value specifies the amount, radius, and threshold for an unsharp mask (for example, `a5,r2,t0`).
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/sharpen | Fastly sharpen reference]].
   */
  sharpen?: string;
  /**
   * Removes pixels from the edge of the image.
   *
   * The value can be specified in pixels or percent.
   * For example: `25,50,75,100` trims the top edge 25px, right edge 50px, bottom edge 75px, and left edge 100px.
   * `0.25` trims all edges by 25 percent.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/trim | Fastly trim reference]].
   */
  trim?: string;
  /**
   * Resizes the width of the image based on pixels or percent.
   *
   * For absolute widths, set an integer number of pixels between 1 and 8192.
   * For relative widths (percent), set a value between 0 and 1 or a value between 0 and 100 followed by p (for example, `0.5` or `50p` for 50 percent).
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/width | Fastly width reference]].
   */
  width?: string;
}
