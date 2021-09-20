import { Base, BackendConfigurationInput } from '../base';
/**
 * Provides utility methods for improving the performance and functionality of your Koji app.
 */
export declare class Utilities extends Base {
    private rootPath;
    private rootHeaders;
    /**
     * Instantiates the Utilities class.
     *
     * @param   config
     *
     * @example
     * ```javascript
     * const utilities = new KojiBackend.Utilities({ res });
     * ```
     */
    constructor(config: BackendConfigurationInput);
    /**
     * Unfreezes a response that has been frozen with an `x-koji-freeze-key` header.
     *
     * @param   key      Key used to freeze the response.
     *
     * @example
     * ```javascript
     * app.get('/loadPosts', async (req, res) => {
     *    const posts = [{ value: 'postValue' }];
     *
     *    res.setHeader('x-koji-freeze-key', 'posts');
     *    res.status(200).json({
     *        posts,
     *    });
     * });
     *
     * app.post('/update', async (req, res) => {
     *    // Update some data in the database
     *    // await db.update....
     *
     *    // Unfreeze. The next request to /loadPosts will hit the server and get
     *    // a fresh list of posts, which will then be frozen until unfreeze is
     *    // called again.
     *    await utilities.unfreeze('posts');
     *
     *    res.sendStatus(200);
     * });
     * ```
     */
    unfreeze(key: string): Promise<void>;
}
