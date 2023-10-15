import mongodb from "mongodb";
export type PageProps<T extends {}> = {
  params: { slug: string } & T;
  searchParams: { [key: string]: string | string[] | undefined };
};

export type WithUserId<T> = { userId: string } & T;
export type ValueOf<T> = T[keyof T];
export type WithId<T> = mongodb.WithId<T>;
export type WithStringifiedId<T> = { _id: string } & Omit<T, "_id">;
export type WithDateTime<T> = { dateTime: Date } & T;
export type WithSoftDelete<T> = { deleted?: boolean } & T;
