export type UserToken = string | null;

export type IAPToken = string | null;

export interface FastlyOptions {
  /**
   * Enables optimizations based on content negotiation.
   *
   * Allowed values: 'webp'
   *
   * Notes:
   *
   * Although the WebP format produces images at a higher compression ratio with a lower loss of quality, it is not supported in all browsers.
   */
  auto?: 'webp';
  /**
   * The bg-color parameter sets the background color of an image to use when applying padding or when replacing transparent pixels.
   *
   * Value may be one of:
   *
   * Hex RGB value: Both 3- and 6-digit values are acceptable (e.g. a22 or cf23a5).
   *
   * Decimal RGB: RGB values between 0 and 255. Comma-delimited (e.g. 255,0,0).
   *
   * Decimal RGB with alpha| RGBA colors include an additional value for alpha (transparency), which ranges from 0 for fully transparent to 1 for fully opaque.
   */
  'bg-color'?: string;
  /**
   * Applies a Gaussian blur filter to the image.
   *
   * Value is a number of pixels between 0.5 and 1000 or a percentage (of the dimensions of the image) suffixed with p (e.g., 1p for 1%).
   */
  blur?: string;
  /**
   * The brightness parameter increases or decreases the amount of perceived light an image radiates or reflects.
   *
   * Value may be any number between -100 and 100.
   *
   * Notes:
   *
   * The default value is 0. This leaves the image unchanged.
   *
   * A value of 100 will result in a fully white image.
   *
   * A value of -100 will result in a fully black image.
   */
  brightness?: string;
  /**
   * The contrast parameter increases or decreases the difference between the darkest and lightest tones in an image.
   *
   * Value may be any number between -100 and 100.
   *
   * Notes:
   *
   * The default value is 0. This leaves the image unchanged.
   *
   * A value of -100 will result in a fully grey image.
   */
  contrast?: string;
  /**
   * Removes pixels from an image.
   *
   * When specifying a crop parameter, the value starts with the desired width and height, either as measurements of pixels, separated with a comma, or as a ratio, separated with a colon (for example, crop=4:3 or crop=640,480 or crop=0.8,0.4).
   *
   * The remaining parameters determine the position of the cropped region. On each dimension, placement can be made either with a position coordinate (x or y, which are relative to the top left of the uncropped image) or as a percentage offset from the center of the image using offset-x and offset-y. These can be mixed and matched, but only one method can be used for each dimension (i.e., x can be combined with offset-y but x cannot be combined with offset-x).
   *
   * Offset positioning acts to distribute the remaining space according to the specified offset proportions. If an image is 2000 pixels wide and is being cropped to 1000 pixels wide, offset-x10 would crop 10% (100 pixels) from the left of the image and 90% (900 pixels) from the right. An offset of 50 centers the crop in the middle of the image.
   *
   * Appending ,smart to the parameter value enables content-aware algorithms to attempt to crop the image to the desired aspect ratio while intelligently focusing on the most important visual content, including the detection of faces.
   *
   * If the specified cropped region is outside the bounds of the image, the transformation will fail with the error "Invalid transformation for requested image: Invalid crop, region out of bounds". Append ,safe to the parameter value to override this. In safe mode, the image gets delivered as an intersection of the origin image and the specified cropped region. This avoids the error, but the resulting image may not be of the specified dimensions.
   *
   * Notes:
   *
   * x and y can be set as a value in pixels (e.g., 40 is 40 pixels) or as a percentage suffixed with p (e.g., 50p is 50%).
   *
   * offset-x and offset-y are always interpreted as percentages of the image size (e.g., 25 is 25%).
   *
   * When using aspect ratio cropping, crop must be used in conjunction with a width or height parameter (or both) to return the correct output image size. If no width or height are supplied, the largest area of the requested aspect ratio will be returned based on the dimensions of the source image.
   *
   * If any dimension ends up at a fraction of a pixel, it is rounded to the nearest whole pixel.
   */
  crop?: string;
  /**
   * Device pixel ratio.
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
  dpr?: 'bounds' | 'cover' | 'crop';
  /**
   * The fit parameter controls how the image will be constrained within the provided size (width and height) values, in order to maintain the correct proportions.
   */
  fit?: string;
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
   * The optimize parameter automatically applies optimal quality compression to produce an output image with as much visual fidelity as possible, while minimizing the file size.
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
   * Add pixels to the edge of an image.
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

export enum HttpStatusCode {
  /**
   * The server has received the request headers and the client should proceed to send the request body
   * (in the case of a request for which a body needs to be sent; for example, a POST request).
   * Sending a large request body to a server after a request has been rejected for inappropriate headers would be inefficient.
   * To have a server check the request's headers, a client must send Expect: 100-continue as a header in its initial request
   * and receive a 100 Continue status code in response before sending the body. The response 417 Expectation Failed indicates the request should not be continued.
   */
  CONTINUE = 100,

  /**
   * The requester has asked the server to switch protocols and the server has agreed to do so.
   */
  SWITCHING_PROTOCOLS = 101,

  /**
   * A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request.
   * This code indicates that the server has received and is processing the request, but no response is available yet.
   * This prevents the client from timing out and assuming the request was lost.
   */
  PROCESSING = 102,

  /**
   * Standard response for successful HTTP requests.
   * The actual response will depend on the request method used.
   * In a GET request, the response will contain an entity corresponding to the requested resource.
   * In a POST request, the response will contain an entity describing or containing the result of the action.
   */
  OK = 200,

  /**
   * The request has been fulfilled, resulting in the creation of a new resource.
   */
  CREATED = 201,

  /**
   * The request has been accepted for processing, but the processing has not been completed.
   * The request might or might not be eventually acted upon, and may be disallowed when processing occurs.
   */
  ACCEPTED = 202,

  /**
   * SINCE HTTP/1.1
   * The server is a transforming proxy that received a 200 OK from its origin,
   * but is returning a modified version of the origin's response.
   */
  NON_AUTHORITATIVE_INFORMATION = 203,

  /**
   * The server successfully processed the request and is not returning any content.
   */
  NO_CONTENT = 204,

  /**
   * The server successfully processed the request, but is not returning any content.
   * Unlike a 204 response, this response requires that the requester reset the document view.
   */
  RESET_CONTENT = 205,

  /**
   * The server is delivering only part of the resource (byte serving) due to a range header sent by the client.
   * The range header is used by HTTP clients to enable resuming of interrupted downloads,
   * or split a download into multiple simultaneous streams.
   */
  PARTIAL_CONTENT = 206,

  /**
   * The message body that follows is an XML message and can contain a number of separate response codes,
   * depending on how many sub-requests were made.
   */
  MULTI_STATUS = 207,

  /**
   * The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response,
   * and are not being included again.
   */
  ALREADY_REPORTED = 208,

  /**
   * The server has fulfilled a request for the resource,
   * and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
   */
  IM_USED = 226,

  /**
   * Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation).
   * For example, this code could be used to present multiple video format options,
   * to list files with different filename extensions, or to suggest word-sense disambiguation.
   */
  MULTIPLE_CHOICES = 300,

  /**
   * This and all future requests should be directed to the given URI.
   */
  MOVED_PERMANENTLY = 301,

  /**
   * This is an example of industry practice contradicting the standard.
   * The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect
   * (the original describing phrase was "Moved Temporarily"), but popular browsers implemented 302
   * with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307
   * to distinguish between the two behaviours. However, some Web applications and frameworks
   * use the 302 status code as if it were the 303.
   */
  FOUND = 302,

  /**
   * SINCE HTTP/1.1
   * The response to the request can be found under another URI using a GET method.
   * When received in response to a POST (or PUT/DELETE), the client should presume that
   * the server has received the data and should issue a redirect with a separate GET message.
   */
  SEE_OTHER = 303,

  /**
   * Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.
   * In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.
   */
  NOT_MODIFIED = 304,

  /**
   * SINCE HTTP/1.1
   * The requested resource is available only through a proxy, the address for which is provided in the response.
   * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons.
   */
  USE_PROXY = 305,

  /**
   * No longer used. Originally meant "Subsequent requests should use the specified proxy."
   */
  SWITCH_PROXY = 306,

  /**
   * SINCE HTTP/1.1
   * In this case, the request should be repeated with another URI; however, future requests should still use the original URI.
   * In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request.
   * For example, a POST request should be repeated using another POST request.
   */
  TEMPORARY_REDIRECT = 307,

  /**
   * The request and all future requests should be repeated using another URI.
   * 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change.
   * So, for example, submitting a form to a permanently redirected resource may continue smoothly.
   */
  PERMANENT_REDIRECT = 308,

  /**
   * The server cannot or will not process the request due to an apparent client error
   * (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).
   */
  BAD_REQUEST = 400,

  /**
   * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
   * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the
   * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means
   * "unauthenticated",i.e. the user does not have the necessary credentials.
   */
  UNAUTHORIZED = 401,

  /**
   * Reserved for future use. The original intention was that this code might be used as part of some form of digital
   * cash or micro payment scheme, but that has not happened, and this code is not usually used.
   * Google Developers API uses this status if a particular developer has exceeded the daily limit on requests.
   */
  PAYMENT_REQUIRED = 402,

  /**
   * The request was valid, but the server is refusing action.
   * The user might not have the necessary permissions for a resource.
   */
  FORBIDDEN = 403,

  /**
   * The requested resource could not be found but may be available in the future.
   * Subsequent requests by the client are permissible.
   */
  NOT_FOUND = 404,

  /**
   * A request method is not supported for the requested resource;
   * for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
   */
  METHOD_NOT_ALLOWED = 405,

  /**
   * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
   */
  NOT_ACCEPTABLE = 406,

  /**
   * The client must first authenticate itself with the proxy.
   */
  PROXY_AUTHENTICATION_REQUIRED = 407,

  /**
   * The server timed out waiting for the request.
   * According to HTTP specifications:
   * "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."
   */
  REQUEST_TIMEOUT = 408,

  /**
   * Indicates that the request could not be processed because of conflict in the request,
   * such as an edit conflict between multiple simultaneous updates.
   */
  CONFLICT = 409,

  /**
   * Indicates that the resource requested is no longer available and will not be available again.
   * This should be used when a resource has been intentionally removed and the resource should be purged.
   * Upon receiving a 410 status code, the client should not request the resource in the future.
   * Clients such as search engines should remove the resource from their indices.
   * Most use cases do not require clients and search engines to purge the resource, and a "404 Not Found" may be used instead.
   */
  GONE = 410,

  /**
   * The request did not specify the length of its content, which is required by the requested resource.
   */
  LENGTH_REQUIRED = 411,

  /**
   * The server does not meet one of the preconditions that the requester put on the request.
   */
  PRECONDITION_FAILED = 412,

  /**
   * The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".
   */
  PAYLOAD_TOO_LARGE = 413,

  /**
   * The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request,
   * in which case it should be converted to a POST request.
   * Called "Request-URI Too Long" previously.
   */
  URI_TOO_LONG = 414,

  /**
   * The request entity has a media type which the server or resource does not support.
   * For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.
   */
  UNSUPPORTED_MEDIA_TYPE = 415,

  /**
   * The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
   * For example, if the client asked for a part of the file that lies beyond the end of the file.
   * Called "Requested Range Not Satisfiable" previously.
   */
  RANGE_NOT_SATISFIABLE = 416,

  /**
   * The server cannot meet the requirements of the Expect request-header field.
   */
  EXPECTATION_FAILED = 417,

  /**
   * This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol,
   * and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by
   * teapots requested to brew coffee. This HTTP status is used as an Easter egg in some websites, including Google.com.
   */
  I_AM_A_TEAPOT = 418,

  /**
   * The request was directed at a server that is not able to produce a response (for example because a connection reuse).
   */
  MISDIRECTED_REQUEST = 421,

  /**
   * The request was well-formed but was unable to be followed due to semantic errors.
   */
  UNPROCESSABLE_ENTITY = 422,

  /**
   * The resource that is being accessed is locked.
   */
  LOCKED = 423,

  /**
   * The request failed due to failure of a previous request (e.g., a PROPPATCH).
   */
  FAILED_DEPENDENCY = 424,

  /**
   * The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.
   */
  UPGRADE_REQUIRED = 426,

  /**
   * The origin server requires the request to be conditional.
   * Intended to prevent "the 'lost update' problem, where a client
   * GETs a resource's state, modifies it, and PUTs it back to the server,
   * when meanwhile a third party has modified the state on the server, leading to a conflict."
   */
  PRECONDITION_REQUIRED = 428,

  /**
   * The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.
   */
  TOO_MANY_REQUESTS = 429,

  /**
   * The server is unwilling to process the request because either an individual header field,
   * or all the header fields collectively, are too large.
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,

  /**
   * A server operator has received a legal demand to deny access to a resource or to a set of resources
   * that includes the requested resource. The code 451 was chosen as a reference to the novel Fahrenheit 451.
   */
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  /**
   * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * The server either does not recognize the request method, or it lacks the ability to fulfill the request.
   * Usually this implies future availability (e.g., a new feature of a web-service API).
   */
  NOT_IMPLEMENTED = 501,

  /**
   * The server was acting as a gateway or proxy and received an invalid response from the upstream server.
   */
  BAD_GATEWAY = 502,

  /**
   * The server is currently unavailable (because it is overloaded or down for maintenance).
   * Generally, this is a temporary state.
   */
  SERVICE_UNAVAILABLE = 503,

  /**
   * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
   */
  GATEWAY_TIMEOUT = 504,

  /**
   * The server does not support the HTTP protocol version used in the request
   */
  HTTP_VERSION_NOT_SUPPORTED = 505,

  /**
   * Transparent content negotiation for the request results in a circular reference.
   */
  VARIANT_ALSO_NEGOTIATES = 506,

  /**
   * The server is unable to store the representation needed to complete the request.
   */
  INSUFFICIENT_STORAGE = 507,

  /**
   * The server detected an infinite loop while processing the request.
   */
  LOOP_DETECTED = 508,

  /**
   * Further extensions to the request are required for the server to fulfill it.
   */
  NOT_EXTENDED = 510,

  /**
   * The client needs to authenticate to gain network access.
   * Intended for use by intercepting proxies used to control access to the network (e.g., "captive portals" used
   * to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot).
   */
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}
