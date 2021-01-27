interface PostMessage {
    kojiEventName: string;
    data?: any;
}
export declare class KojiBridge {
    protected execCallbackOnMessage(callback: Function, eventName: string): () => void;
    protected sendMessage(postMessage: PostMessage): void;
    protected sendMessageAndAwaitResponse(postMessage: PostMessage, platformMessageName: string, additionalPlatformMessageName?: string): Promise<any>;
}
export {};
