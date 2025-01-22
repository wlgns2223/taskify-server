import { BaseModelProperties } from '../model';

export type Serialized<T> = {
  [P in keyof T]: T[P];
};

export type PurePropertiesWithExtraOmit<T, ExtraKeys extends keyof T = never> = Omit<
  T,
  keyof BaseModelProperties | ExtraKeys
>;
