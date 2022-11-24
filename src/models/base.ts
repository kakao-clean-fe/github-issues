import {Subject} from "../observer";

export abstract class BaseModel<T extends unknown = any> extends Subject {
    protected resource: T;

    protected constructor(defaultValue: T) {
        super();
        this.resource = defaultValue;
    }

    abstract get getResource(): T;
    abstract set setResource(payload: T);
}