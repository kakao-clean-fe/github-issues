export class Observable {
    constructor() {
        this._observers = new Set();
    }

    subscribe(observer) {
        this._observers.add(observer);
    }

    unsubscribe(observer) {
        this._observers = [...this._observers].filter(subscriber => subscriber !== observer);
    }

    notify(data) {
        this._observers.forEach(observer => observer(data));
    }
}

export class ArrayStore extends Observable {
    constructor(initialData) {
        super();
        this.list = Array.isArray(initialData) ? initialData : []
    }


    set(...element) {
        this.list = [...element]
        this.notify(this.list)
    }

    add(...element) {
        this.list = [...this.list, ...element];
        this.notify(this.list);
    }

    get() {
        return [...this.list]
    }
}
