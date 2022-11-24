export class FetchResult {
    catchError = false;
    response;
    error;

    constructor(response, error) {
        this.response = response;
        this.error = error;
    }

    doOnError(process) {
        if (!this.catchError && this.error) {
            process(this.error);
            this.catchError = true;
        }
        return this;
    }

    doOnUnAuthorized(process) {
        if (!this.catchError && this.error && this.error.isUnAuthorized()) {
            process(this.error);
            this.catchError = true;
        }
        return this;
    }

    doOnSuccess(process) {
        if (this.response) process(this.response);
        return this;
    }

    get() {
        if (this.response) {
            return this.response
        }
    }
}