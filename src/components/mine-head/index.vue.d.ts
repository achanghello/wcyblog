declare const _default: import("vue").DefineComponent<{}, {
    isshowdetailinfo: import("vue").Ref<boolean>;
    userinfo: import("vue").Ref<{}>;
    isedituserinfo: import("vue").Ref<boolean>;
    userinfoModify: import("vue").Ref<{
        username: string;
        age: string;
        sex: string;
        job: string;
        personality: string;
    }>;
    imageUrl: import("vue").Ref<string>;
    onSuccess: (filepath: any) => void;
    modifyUserinfo: () => void;
    onChange: (file: any) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
export default _default;
