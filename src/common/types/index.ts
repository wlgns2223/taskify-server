import { Base } from '../entity';

export type PlainOf<T> = {
  [P in keyof T]: T[P];
};

export type PurePropsOf<T, ExtraKeys extends keyof T = never> = Omit<T, keyof Base | ExtraKeys>;

export type TIMESTAMP = string;
