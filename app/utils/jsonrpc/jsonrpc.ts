import axios, { AxiosResponse } from 'axios';
import HTTPError from './http-error';
import JsonrpcError from './jsonrpcError';

interface Body {
    jsonrpc: string;
    method: string;
    params?: ParamsField;
    id?: number;
}

interface FetchingParams {
    method: string;
    // TODO: Replace any
    params?: ParamsField;
}

// TODO Replace any
type ParamsField = object | any[];

interface JSONRPCResponse {
    jsonrpc: '2.0';
    id: number;
}

interface JSONRPCResponseSuccess<T> extends JSONRPCResponse {
    result: T;
}

interface JSONRPCResponseFailure extends JSONRPCResponse {
    error: ErrorField;
}

type Res<T> = JSONRPCResponseSuccess<T> | JSONRPCResponseFailure;

interface ErrorField {
    code: number;
    message: string;
    data?: {
        [key: string]: any;
    };
}

const isFailureResponse = (data: Res<any>): data is JSONRPCResponseFailure => (
    (data as JSONRPCResponseFailure).error !== undefined
);

export default class Client {
    private readonly server: string;

    private requestId = 0;

    constructor({ server }: { server: string }) {
        this.server = server;
    }

    // TODO: Replace object
    // TODO: Add generic
    request<T>(method: string, params?: any): Promise<T> {
        return this.fetching<T>({ method, params });
    }

    notify(method: string, params: object): Promise<object> {
        return this.fetching({ method, params }, true);
    }

    private async fetching<T>({ method, params = {} }: FetchingParams, isNotification = false): Promise<T> {
        const body: Body = {
            jsonrpc: '2.0',
            method,
            params,
        };

        if (!isNotification) {
            body.id = this.id;
        }

        let response: AxiosResponse<Res<T>>;

        try {
            response = await axios.post<Res<T>>(this.server, body);
        } catch (err) {
            if (err.response) {
                throw new HTTPError(err.response);
            }

            throw new Error(err);
        }

        const { data } = response;

        if (isFailureResponse(data)) {
            throw new JsonrpcError(data.error);
        }

        return data.result;
    }

    private get id(): number {
        if (this.requestId === Number.MAX_SAFE_INTEGER) {
            this.requestId = 0;
        } else {
            this.requestId += 1;
        }

        return this.requestId;
    }
}
