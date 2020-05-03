export default class HTTPError extends Error {
    status: number;

    statusText: string;

    constructor({ status, statusText }: Response) {
        super();
        this.name = this.constructor.name;
        this.status = status;
        this.statusText = statusText;
    }
}
