interface PostMessage {
    /** Name of the event. */
    kojiEventName: string;
    /** Data to send with event. */
    data?: any;
}
/**
 * Enables communication between the platform and the Koji.
 */
export declare class KojiBridge {
    /**
     * Sets a listener for a specific event, and invokes a function to handle the event.
     *
     * @param   callback  Function to run when the event is fired.
     * @param   eventName Name of the event.
     * @return            [description]
     */
    protected execCallbackOnMessage(callback: Function, eventName: string): () => void;
    /**
     *
     * @param   postMessage Data to be sent to the Koji.
     */
    protected sendMessage(postMessage: PostMessage): void;
    protected sendMessageAndAwaitResponse(postMessage: PostMessage, platformMessageName: string, additionalPlatformMessageName?: string): Promise<any>;
}
export {};
