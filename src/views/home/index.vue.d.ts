declare const _default: import("vue").DefineComponent<{}, {
    type: import("vue").Ref<string>;
    sort: import("vue").Ref<string>;
    page: import("vue").Ref<number>;
    bloglist: import("vue").Ref<any[]>;
    loading: import("vue").Ref<boolean>;
    complated: import("vue").Ref<boolean>;
    load: () => boolean;
    jumpDetail: (blog: any) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
export default _default;
