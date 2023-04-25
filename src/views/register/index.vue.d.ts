declare const _default: {
    name: string;
    data(): {
        step: number;
        loginForm: {
            email: string;
            username: string;
            code: string;
            password: string;
            passwordagain: string;
        };
        validation: {
            email: string;
            username: string;
            code: string;
            password: string;
            passwordagain: string;
        };
        countDown: number;
        timer: any;
    };
    methods: {
        getCode(): void;
        afterStep(): void;
        submit(): void;
        validationEmail(): boolean;
        validationUsername(): boolean;
        validationCode(): boolean;
        validationPassword(): boolean;
        validationPasswordAgain(): boolean;
    };
};
export default _default;
