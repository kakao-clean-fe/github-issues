export class FetchError extends Error {
    data;
    status;

    constructor(message = null, status = 0, data = null) {
        super(message);
        this.data = data;
        this.status = status;
    }

    isUnAuthorized() {
        return (this.status === 401)
    }
}