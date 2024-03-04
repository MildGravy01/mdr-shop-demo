export interface ISMTPContructor {
    login: string;
    password: string;
    emailFrom: any;
    host?: string;
    port?: number;
    secure?: boolean;
}