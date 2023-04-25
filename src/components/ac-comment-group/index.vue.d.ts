declare const _default: {
    components: {
        AcComment: import("vue").DefineComponent<{
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
        AcReply: import("vue").DefineComponent<{
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
    };
    props: {
        comment: {
            type: ObjectConstructor;
            required: boolean;
        };
    };
    setup(props: any): {
        isshowreply: import("vue").Ref<boolean>;
        replylist: import("vue").Ref<any[]>;
        getReply: () => void;
        closeShowReply: () => void;
    };
};
export default _default;
