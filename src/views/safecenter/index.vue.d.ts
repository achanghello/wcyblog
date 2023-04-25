declare const _default: import("vue").DefineComponent<{}, {
    useUserinfo: any;
    loginForm: {
        code: string;
        newpass: string;
        newpass2: string;
    };
    rules: {
        code: {
            len: number;
            trigger: string;
        }[];
        newpass: {
            min: number;
            max: number;
            trigger: string;
        }[];
        newpass2: {
            validator: (rule: any, value: any, callback: any) => void;
            trigger: string;
        }[];
    };
    submit: () => void;
    form: import("vue").Ref<any>;
    loginForm2: {
        code: string;
        newemail: string;
    };
    rules2: {
        code: {
            len: number;
            trigger: string;
        }[];
        newemail: {
            required: boolean;
            type: string;
            trigger: string;
        }[];
    };
    submit2: () => void;
    form2: import("vue").Ref<any>;
    loginForm3: {
        code: string;
        reason: string;
    };
    rules3: {
        code: {
            len: number;
            trigger: string;
        }[];
        reason: {
            required: boolean;
            trigger: string;
        }[];
    };
    submit3: () => void;
    form3: import("vue").Ref<any>;
    sendcode: () => void;
    sendcode2: () => void;
    sendcode3: () => void;
    codedownnumber: import("vue").Ref<number>;
    type: import("vue").Ref<number>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
export default _default;
