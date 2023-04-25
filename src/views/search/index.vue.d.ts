declare const _default: import("vue").DefineComponent<{}, {
    type: import("vue").Ref<string>;
    sort: import("vue").Ref<string>;
    columnName: import("vue").Ref<string>;
    columnValue: import("vue").Ref<string>;
    page: import("vue").Ref<number>;
    bloglist: import("vue").Ref<any[]>;
    total: import("vue").Ref<number>;
    loading: import("vue").Ref<boolean>;
    complated: import("vue").Ref<boolean>;
    load: () => boolean;
    jumpDetail: (blog: any) => void;
    search: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
export default _default;
