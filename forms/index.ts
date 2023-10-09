export type ValidatorFn<T extends object> = (value: Partial<T>) => T | false;

export type SetFieldValueFn<T extends {}> = (
  key: keyof T,
  value: T[keyof T]
) => void;
