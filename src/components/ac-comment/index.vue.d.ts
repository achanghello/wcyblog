declare const _default: import("vue").DefineComponent<{
    comment: {
        type: ObjectConstructor;
        required: true;
    };
}, {
    sukistate: import("vue").Ref<boolean>;
    Like: () => Promise<void>;
    cancelLike: () => Promise<void>;
    closeShowReply: () => void;
    deleteComment: () => Promise<void>;
    reportComment: () => Promise<void>;
    isshowreplyinput: import("vue").Ref<boolean>;
    replycontent: import("vue").Ref<string>;
    getCommentReply: () => void;
    replyComment: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("getReply" | "closeShowReply")[], "getReply" | "closeShowReply", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    comment: {
        type: ObjectConstructor;
        required: true;
    };
}>> & {
    onGetReply?: (...args: any[]) => any;
    onCloseShowReply?: (...args: any[]) => any;
}, {}>;
export default _default;
