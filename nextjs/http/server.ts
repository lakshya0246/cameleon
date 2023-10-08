import { getSession } from "@auth0/nextjs-auth0";
import { getCollection } from "../../mongodb";
import { WithId } from "@types";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";

export declare class TypedRequest<T> extends Request {
  json(): Promise<T>;
}

export function removeIdField<T extends any>(obj: T): Omit<T, "_id"> {
  delete (obj as any)._id;
  return obj;
}

export function parseDateField<
  T extends Record<FieldName, string | Date> | Record<string, never>,
  FieldName extends keyof T
>(
  obj: T extends object ? T : never,
  fieldName: FieldName
): Omit<T, FieldName> & { [key in FieldName]: Date } {
  return {
    ...obj,
    // FIXME: fails while building at the typecheck step
    [fieldName]: new Date(obj[fieldName] as any),
  };
}

export async function deleteMethod<T extends { id: string } = { id: string }>(
  request: TypedRequest<T>,
  collectionName: [string, string]
): Promise<Response> {
  const body = await request.json();
  const collection = await getCollection<WithId<T>>(...collectionName);
  const res = new NextResponse();
  const session = await getSession(request as any, res);
  if (!session?.user.sub) {
    return NextResponse.error();
  }
  const result = await collection.deleteOne({
    // FIXME
    _id: new ObjectId(body.id) as any,
    userId: session.user.sub,
  });
  if (result.acknowledged) {
    return NextResponse.json(result);
  } else {
    return NextResponse.error();
  }
}
export async function postMethod<T extends any>(
  request: TypedRequest<T>,
  collectionName: [string, string],
  itemParser?: (item: T) => T
): Promise<Response> {
  const body = await request.json();
  let sanitizedBody: T;
  if (itemParser) {
    sanitizedBody = itemParser(body);
  } else {
    sanitizedBody = body;
  }
  const collection = await getCollection<T>(...collectionName);
  const res = new NextResponse();
  const session = await getSession(request as any, res);
  if (!session?.user.sub) {
    return NextResponse.error();
  }
  const result = await collection.insertOne({
    // FIXME
    ...(sanitizedBody as any),
    userId: session.user.sub,
  });
  if (result.acknowledged) {
    return NextResponse.json(result);
  } else {
    return NextResponse.error();
  }
}
