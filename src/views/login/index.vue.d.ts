declare const _default: {
    name: string;
    setup(): {
        loginForm: {
            password: string;
            email: string;
            code: string;
        };
        validation: {
            password: string;
            email: string;
            code: string;
        };
        validationEmail: () => boolean;
        validationPassword: () => boolean;
        validationCode: () => boolean;
        login: () => void;
        passlogin: import("vue").Ref<boolean>;
        vm: {
            countDown: number;
        };
        getCode: () => void;
        loginbycode: () => void;
    };
};
export default _default;
