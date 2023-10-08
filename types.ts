import mongodb from "mongodb";
export type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type WithUserId<T> = { userId: string } & T;
export type ValueOf<T> = T[keyof T];
export type WithId<T> = mongodb.WithId<T>;
export type WithStringifiedId<T> = { _id: string } & T;
export type WithDateTime<T> = { dateTime: Date } & T;
