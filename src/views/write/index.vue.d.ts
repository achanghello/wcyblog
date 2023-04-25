import '@wangeditor/editor/dist/css/style.css';
declare const _default: {
    components: {
        Editor: import("vue").DefineComponent<{
            mode: {
                type: StringConstructor;
                default: string;
            };
            defaultContent: {
                type: import("vue").PropType<import("slate").Descendant[]>;
                default: never[];
            };
            defaultHtml: {
                type: StringConstructor;
                default: string;
            };
            defaultConfig: {
                type: import("vue").PropType<Partial<import("@wangeditor/core").IEditorConfig>>;
                default: {};
            };
            modelValue: {
                type: StringConstructor;
                default: string;
            };
        }, {
            box: import("vue").Ref<null>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
            mode?: unknown;
            defaultContent?: unknown;
            defaultHtml?: unknown;
            defaultConfig?: unknown;
            modelValue?: unknown;
        } & {
            mode: string;
            defaultContent: import("slate").Descendant[];
            defaultHtml: string;
            defaultConfig: Partial<import("@wangeditor/core").IEditorConfig>;
            modelValue: string;
        }>, {
            mode: string;
            defaultContent: import("slate").Descendant[];
            defaultHtml: string;
            defaultConfig: Partial<import("@wangeditor/core").IEditorConfig>;
            modelValue: string;
        }>;
        Toolbar: import("vue").DefineComponent<{
            editor: {
                type: import("vue").PropType<import("@wangeditor/core").IDomEditor>;
            };
            mode: {
                type: StringConstructor;
                default: string;
            };
            defaultConfig: {
                type: import("vue").PropType<Partial<import("@wangeditor/core").IToolbarConfig>>;
                default: {};
            };
        }, {
            selector: import("vue").Ref<null>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
            editor?: unknown;
            mode?: unknown;
            defaultConfig?: unknown;
        } & {
            mode: string;
            defaultConfig: Partial<import("@wangeditor/core").IToolbarConfig>;
        } & {
            editor?: import("@wangeditor/core").IDomEditor;
        }>, {
            mode: string;
            defaultConfig: Partial<import("@wangeditor/core").IToolbarConfig>;
        }>;
        AcTextarea: any;
    };
    setup(): {
        editorRef: import("vue").ShallowRef<any>;
        valueHtml: import("vue").Ref<string>;
        mode: string;
        toolbarConfig: {};
        editorConfig: {
            placeholder: string;
            MENU_CONF: {
                uploadImage: {
                    customUpload: (file: any, insertFn: any) => void;
                };
            };
        };
        handleCreated: (editor: any) => void;
        onChange: (file: any) => void;
        beforeUpload: (file: any) => boolean;
        onSuccess: (filepath: any) => void;
        title: import("vue").Ref<string>;
        imageUrl: import("vue").Ref<string>;
        type: import("vue").Ref<string>;
        tag: import("vue").Ref<string>;
        summary: import("vue").Ref<string>;
        SubmitBlog: () => void;
    };
};
export default _default;
