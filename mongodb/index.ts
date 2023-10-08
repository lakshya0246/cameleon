import { Collection, MongoClient } from "mongodb";
import { WithUserId } from "../../types";
import { getSession } from "@auth0/nextjs-auth0";

const mongoClient = new MongoClient(process.env.MONGODB_URI);
let connected = false;

export async function getMongoClient() {
  if (!connected) {
    await mongoClient.connect();
    connected = true;
  }
  return mongoClient;
}

export async function getCollection<T>(
  dbName: string,
  collectionName: string
): Promise<Collection<WithUserId<T>>> {
  const mongoClient = await getMongoClient();
  const collection = mongoClient
    .db(dbName)
    .collection<WithUserId<T>>(collectionName);
  return collection;
}

export async function getCollectionArrayForSession<T extends {}>(
  collection: Collection<T>
) {
  const session = await getSession();
  if (!session) {
    return [];
  }

  const array = await collection.find({ userId: session.user.sub }).toArray();
  return array;
}
