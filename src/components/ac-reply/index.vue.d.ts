declare const _default: import("vue").DefineComponent<{
    reply: {
        type: ObjectConstructor;
        required: true;
    };
}, {
    deleteReply: () => Promise<void>;
    reportReply: () => Promise<void>;
    replycontent: import("vue").Ref<string>;
    isshowreplyinput: import("vue").Ref<boolean>;
    getCommentReply: () => void;
    replyReply: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "getReply"[], "getReply", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    reply: {
        type: ObjectConstructor;
        required: true;
    };
}>> & {
    onGetReply?: (...args: any[]) => any;
}, {}>;
export default _default;
