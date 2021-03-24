export type UserToken = string | null;

export type IAPToken = string | null;

export interface FastlyOptions {
  /**
   * Enables image optimizations based on content.
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/auto | Fastly `auto` reference]].
   *
   * <p class="note">Although the WebP format produces images at a higher compression ratio with a lower loss of quality, it is not supported in all browsers.</p>
   */
  auto?: 'webp';
  /**
   * Sets the background color to use when applying padding or when replacing transparent pixels in the image.
   *
   * Value can be in HEX 3- and 6-digit format (for example, `a22` or `cf23a5`), RGB format (for example,  `255,0,0`), or RGBA format (for example, `0,255,0,0.5`).
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/bg-color | Fastly bg-color reference]].
   */
  'bg-color'?: string;
  /**
   * Applies a Gaussian blur filter to the image.
   *
   * Value can be a number of pixels between 0.5 and 1000 (for example, `50`), or a percentage of the dimensions of the image suffixed with p (for example, `1p` for 1%).
   *
   * For more information, see the [[https://developer.fastly.com/reference/io/blur | Fastly blur reference]].
   */
  blur?: string;
  /**
   * Increases or decreases the brightness of the image.
   * Value can be a number between -100 and 100, as follows:
   *
   * * `0` (default) – Leaves the image unchanged.
   * * `100` – Results in a fully white image.
   * * `-100` – Results in a fully black image.
   */
  brightness?: string;
  /**
   * Increases or decreases the difference between the darkest and lightest tones in the image.
   * Value can be a number between -100 and 100, as follows:
   *
   * * `0` (default) – Leaves the image unchanged.
   * * `-100` – Results in a fully grey image.
   */
  contrast?: string;
  /**
   * Removes pixels from an image.
   *
   * The value starts with the desired width and height of the final image, either as measurements of pixels separated with a comma (for example, `640,480`), or as a ratio separated with a colon (for example, `4:3`).
   *
   * The rest of the value determines the position of the cropped region within the existing image. For each dimension, specify the position as a coordinate (x or y, which are relative to the top left of the uncropped image) or as a percentage offset from the center of the image using `offset-x` and `offset-y`. These can be mixed and matched, but only one method can be used for each dimension (that is, x can be combined with offset-y but x cannot be combined with offset-x).
   *
   * Offset positioning acts to distribute the remaining space according to the specified offset proportions. If an image is 2000 pixels wide and is being cropped to 1000 pixels wide, offset-x10 would crop 10% (100 pixels) from the left of the image and 90% (900 pixels) from the right. An offset of 50 centers the crop in the middle of the image.
   *
   * Appending `,smart` to the value enables content-aware algorithms to attempt to crop the image to the desired aspect ratio while intelligently focusing on the most important visual content, including the detection of faces.
   *
   * If the specified cropped region is outside the bounds of the image, the transformation will fail with the error "Invalid transformation for requested image: Invalid crop, region out of bounds". Append `,safe` to the parameter value to override this error. In safe mode, the image gets delivered as an intersection of the origin image and the specified cropped region. This avoids the error, but the resulting image may not be of the specified dimensions.
   *
   * Notes:
   *
   * * `x` and `y` can be set as a value in pixels (for example, `40` is 40 pixels) or as a percentage suffixed with p (for example, `50p` is 50%).
   * * `offset-x` and `offset-y` are always interpreted as percentages of the image size (for example, `25` is 25%).
   * * When using aspect ratio cropping, crop must be used in conjunction with a width or height parameter (or both) to return the correct output image size. If no width or height are supplied, the largest area of the requested aspect ratio will be returned based on the dimensions of the source image.
   * * If any dimension ends up at a fraction of a pixel, it is rounded to the nearest whole pixel.
   */
  crop?: string;
  /**
   * Serve correctly sized images for devices that expose a device pixel ratio.
   *
   * The dpr parameter provides a means to multiply image dimensions in order to translate logical pixels (also 'CSS pixels') into physical pixels. The device pixel ratio is therefore the ratio between physical pixels and logical pixels.
   *
   * It is usually possible for client-side software to query the host system to determine the DPR of the display the user is viewing. In web browsers, this is available as the Window.devicePixelRatio variable in JavaScript. The iPhone 5 reports a device pixel ratio of 2, because the physical linear resolution is double the logical resolution.
   *
   * Physical Resolution: 960 x 640
   *
   * Logical Resolution: 480 x 320
   *
   * Other devices report varying device pixel ratios, including non-integer ones. For example, the Nokia Lumia 1020 reports 1.6667, whereas the Samsung Galaxy S4 reports 3.
   *
   * Value may be any number between 1 and 10.
   */
  dpr?: string;
  /**
   * Controls how the image will be constrained within the provided size (width and height) values to maintain the correct proportions.
   */
  fit?: 'bounds' | 'cover' | 'crop';
  /**
   * Specifies the desired output encoding for the image.
   *
   * The format parameter enables the source image to be converted (a.k.a., "transcoded") from one encoded format to another. This is useful when the source image has been saved in a sub-optimal file format that hinders performance.
   *
   * Notes:
   *
   * Automatic delivery of WebP format images via content negotiation can be enabled using the auto=webp parameter. This will override the format parameter in browsers that support WebP. Although the WebP format produces images at a higher compression ratio with a lower loss of quality, it is not supported in all browsers.
   *
   * The source image can be any of the following image formats: JPEG, PNG, GIF, WEBP.
   *
   * JPEG, progressive JPEG, WebP (Lossy), and PNG8 have a sliding quality scale that supports the quality parameter.
   *
   * GIF and PNG do not have a sliding quality scale. They do not support the quality parameter.
   *
   * A progressive JPEG pjpg is an image created using the JPEG suite of compression algorithms that will "fade in" successive waves of lines until the entire image has completely arrived. For this reason, progressive JPEGs typically appear to load quicker than the Baseline JPEG jpg format.
   *
   * WebP support is available in Google Chrome, Mozilla Firefox 65 and later, Safari 14 and later, Opera, and Android Browser.
   *
   * Lossless compression is currently supported for WebP only.
   *
   * GIF to WebP conversion is currently not supported.
   *
   * MP4 conversion is only available for animated GIF source images.
   */
  format?: 'gif' | 'png' | 'png8' | 'jpg' | 'pjpg' | 'bjpg' | 'webp' | 'webpll' | 'webply' | 'mp4';
  /**
   * Extracts the first frame from an animated image sequence.
   */
  frame?: '1';
  /**
   * The desired height of the output image.
   *
   * The height parameter enables dynamic height resizing based on pixels and percent values.
   *
   * The value can be either a positive integer or a positive number less than 1. If the value is an integer greater than or equal to 1, the value is interpreted as a pixel height. If the height parameter is less than 1, the value is interpreted as a percentage height.
   *
   * Unless a width parameter is present, the height value will cause the width of the image to be scaled in proportion to the requested height. If both width and height are omitted, the input image dimensions are used.
   *
   * Notes:
   *
   * The maximum output dimensions are 8,192 x 8,192 pixels.
   *
   * Because we use a positive number between 0 and 0.99 to return a percentage-based scaled image, in order to return an image that is 100% or more, a p suffix can be appended to the value. For example, height=250p would return an image that is 250% the height of the original. We use p as a simple way to represent percentages.
   *
   * If the requested height is not a whole number of pixels (e.g., as a result of applying a percentage value for height), it is rounded to the nearest integer.
   */
  height?: string;
  /**
   * Applies optimal quality compression to produce an output image with as much visual fidelity as possible, while minimizing the file size.
   * Notes:
   *
   * Optimize is currently supported by the following output formats: JPEG, WebP.
   *
   * If the quality parameter is also provided, quality overrides optimize because it is more precise.
   *
   * Because optimize attempts to produce an output image with as much visual quality as possible while minimizing the file size, the operations applied are subject to change.
   */
  optimize?: 'low' | 'medium' | 'high';
  /**
   * How the image will be orientated.
   *
   * The orient parameter controls the cardinal orientation of the image.
   *
   * Notes:
   *
   * By default, if the source image contains orientation information stored within its metadata, that orientation will be applied to the image data and the orientation override removed from metadata.
   *
   * The numerical values are the same as EXIF rotation numbers.
   */
  orient?: 'r' | 'l' | 'h' | 'v' | 'hv' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  /**
   * Adds pixels to the edge of an image.
   *
   * Notes:
   *
   * Syntax is very similar to css padding; see examples below.
   *
   * pad={all-sides}
   * pad={top-and-bottom},{left-and-right}
   * pad={top},{left-and-right},{bottom}
   * pad={top},{right},{bottom},{left}
   *
   * By default padding applies a background color of white. See bg-color to change that.
   *
   * If the source image contains a transparent background and the output image also contains transparency, the padding will be made up of transparent pixels.
   *
   * When using pad and canvas at the same time, pad will be ignored.
   *
   * Values can be specified using CSS style shorthand values. (see CSS Margin or CSS Padding for more examples).
   *
   * CSS shorthand allows for all edges to be specified in one property.
   *
   * Any fractional pixel measurements will be rounded to the nearest whole pixel.
   */
  pad?: string;
  /**
   * Removes pixels from an image before any other transformations occur.
   *
   * Identical to crop except that precrop is performed before any other transformations.
   */
  precrop?: string;
  /**
   * Output image quality for lossy file formats.
   *
   * The quality parameter enables control over the compression level for lossy file-formatted images.
   *
   * Value may be any integer between 1 and 100, where 1 is a lower quality image and a smaller file and 100 is the highest quality image and larger file. If desired, a second quality level can be specified for use when auto=webp is enabled and a WebP output format has been selected.
   *
   * Notes:
   * The quality parameter can be applied to the following output formats: png8, jpg, pjpg, webp, and webply.
   *
   * If no quality parameter is present for jpg, pjpg, or webp, the output image will be returned at the default value set in the Image Optimizer user interface.
   *
   * If auto=webp is enabled by the URL or the service settings, the second value will be used as the quality value if the requestor sends the accept: image/webp request header.
   *
   * When only specifying quality, if the output image file size is larger than the input image, the original image will be delivered.
   */
  quality?: string;
  /**
   * The resize-filter parameter enables control over the resizing filter used to generate a new image with a higher or lower number of pixels.
   *
   * Notes:
   *
   * When making an image smaller, use bicubic, which has a natural sharpening effect.
   *
   * When making an image larger, use bilinear, which has a natural smoothing effect.
   *
   * When resizing pixel art, use nearest, which has a natural pixelation effect.
   *
   * When quality is the main concern, use lanczos, which typically renders the best results.
   */
  'resize-filter'?: 'nearest' | 'linear' | 'cubic' | 'lanczos2' | 'lanczos3';
  /**
   * Saturation of the output image.
   *
   * The saturation parameter increases or decreases the intensity of the colors in an image.
   *
   * Value may be any number between -100 and 100.
   *
   * Notes:
   *
   * The default value is 0. This leaves the image unchanged.
   *
   * Valid values range from -100 to 100
   *
   * A value of -100 will generate a grayscale image.
   */
  saturation?: string;
  /**
   * Sharpness of the output image.
   *
   * The sharpen parameter increases the definition of the edges of objects in an image.
   *
   * Syntax: sharpen=a{a},r{r},t{t} (e.g., sharpen: 'a5,r2,t0')
   *
   * Notes:
   *
   * The sharpen parameter is an implementation of an unsharp mask.
   */
  sharpen?: string;
  /**
   * Remove pixels from the edge of an image.
   *
   * The trim parameter removes pixels from the edge of an image by pixel or percentage value. This can be useful for removing whitespace and borders that appear on a source image.
   *
   * Syntax: trim={top},{right},{bottom},{left}
   *
   * Notes:
   *
   * Values can be specified using CSS style shorthand values. (See CSS Margin or CSS Padding for more examples).
   *
   * CSS shorthand allows for all edges to be specified in one property.
   *
   * Any fractional pixel measurements will be rounded to the nearest whole pixel.
   */
  trim?: string;
  /**
   * The desired width of the output image.
   *
   * The width parameter enables dynamic width resizing based on pixels and percent values.
   *
   * The {value} can be either a positive integer or a number less than 1. If the value is an integer greater than or equal to 1, the value is interpreted as a pixel width. If the width parameter is less than 1, the value is interpreted as a percentage width.
   *
   * Unless a height parameter is present, the width value will cause the height of the image to be scaled in proportion to the requested width. If both width and height are omitted, the input image dimensions are used.
   *
   * Value may be one of:
   *
   * Absolute width: An integer between 1 and 8192.
   *
   * Relative width: A fraction between 0 and 0.99 (e.g. ,0.5) or a percentage between 0 and 100 followed by the letter p (e.g., 50p). In either case the value indicates the desired width relative to the image's natural width.
   *
   * Notes:
   *
   * The maximum output dimensions are 8,192 x 8,192 pixels.
   *
   * If the image is animated, the maximum output dimensions apply to the sum of the area of all the frames of the image. For example, a 1024x1024px GIF could have 64 frames before it would exceed the size limit.
   *
   * Because we use a positive number less than 1 to return a percentage-based scaled image, in order to return an image that is 100% or more, a p suffix can be appended to the value. For example, width=250p would return an image that is 250% the width of the original. We use p as a simple way to represent percent.
   *
   * If the requested width is a fraction of a pixel (e.g., as a result of applying a percentage value for width), it is rounded to the nearest integer.
   */
  width?: string;
}
