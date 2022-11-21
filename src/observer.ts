export interface Observer {
    notify: (o: any) => void;
}

export class Subject {
    protected observers: Set<Observer> = new Set<Observer>();

    public register(observer: Observer) {
        this.observers.add(observer);
    }

    public unregister(observer: Observer) {
        this.observers.delete(observer);
    }

    protected notify(o: any) {
        this.observers.forEach(observer => observer.notify(o));
    }
}