export type User = {
    _id: number;
    username: string;
    email: string;
    password: string;
    role: string;
}

export type responseDataLogin = {
    token: string;
    user: {
        email: string;
        username: string;
        role: "admin" | "member";
    }
}

export type ValidLogin = {
    email: string;
    password: string;
}