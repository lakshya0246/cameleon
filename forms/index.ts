export type validatorFn<T extends object> = (value: Partial<T>) => T | false;
