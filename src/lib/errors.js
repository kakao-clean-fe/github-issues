class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ClientError extends CustomError {
    constructor(statusCode) {
        super(`잘못된 요청입니다. (code: ${statusCode} )`);
    }

    static isOccurred(statusCode) {
        return statusCode >= 400 && statusCode < 500
    }
}

export class ServerError extends CustomError {
    constructor(statusCode) {
        super(`서버 오류입니다. (code: ${statusCode} )`);
    }

    static isOccurred(statusCode) {
        return statusCode >= 500
    }
}