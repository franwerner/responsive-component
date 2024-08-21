import { Entries, FromEntries, Keys } from "my-utilities";

declare global {
  interface ObjectConstructor {
    fromEntries<T>(array: T): FromEntries<T>;
    entries<T>(obj: T): Entries<T>;
    keys<T>(obj: T): Keys<T>;
  }
}