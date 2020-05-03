interface Args {
    data?: DataField;
    code: number;
    message: string;
}

interface DataField {
    [key: string]: any;
}

export default class JsonrpcError extends Error {
    data?: DataField;

    code: number;

    constructor({ data, code, message }: Args) {
        super(message);
        this.name = this.constructor.name;
        this.data = data;
        this.code = code;
    }
}
