declare const _default: import("vue").DefineComponent<Readonly<{
    searchtext?: any;
}>, {
    state: import("vue").Ref<string>;
    arr: {
        label: string;
        name: string;
    }[];
    type: import("vue").Ref<string>;
    sort: import("vue").Ref<string>;
    page: import("vue").Ref<number>;
    bloglist: import("vue").Ref<any[]>;
    searchbloglist: import("vue").ComputedRef<any[]>;
    total: import("vue").Ref<number>;
    loading: import("vue").Ref<boolean>;
    complated: import("vue").Ref<boolean>;
    load: () => boolean;
    deletaMyBlog: (bid: any) => void;
    jumpDetail: (bid: any) => void;
    sunwukong: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    searchtext?: any;
}>>>, {
    readonly searchtext?: any;
}>;
export default _default;
