declare const _default: import("vue").DefineComponent<{}, {
    blog: any;
    blogcontent: import("vue").Ref<string>;
    sukistate: any;
    collectionstate: any;
    drawercommentstate: import("vue").Ref<boolean>;
    commentlist: import("vue").Ref<any[]>;
    Like: () => Promise<void>;
    Collection: () => Promise<void>;
    cancelLike: () => Promise<void>;
    cancelCollection: () => Promise<void>;
    commentcontent: import("vue").Ref<string>;
    getBlogComment: () => void;
    submitComment: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
export default _default;
