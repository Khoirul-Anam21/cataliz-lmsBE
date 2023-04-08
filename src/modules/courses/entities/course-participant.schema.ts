import { IDatabaseAdapter } from "@src/database/connection";

export const name = "courses";

const isExists = async (db: IDatabaseAdapter) => {
  const collections = (await db.listCollections()) as [];
  return collections.some(function (el: any) {
    return el.name === name;
  });
};

export async function createCollection(db: IDatabaseAdapter) {
  try {
    if (!(await isExists(db))) {
      await db.createCollection(name);
    }

    await db.updateSchema(name, {
      bsonType: "object",
      properties: {
        user_id: {
          bsonType: "ObjectId",
          description: "must be a valid id",
        },
        course_id: {
          bsonType: "ObjectId",
          description: "must be a valid id",
        },
      },
    });
    await db.createIndex(
      name,
      { email: -1 },
      {
        unique: true,
        collation: {
          locale: "en",
          strength: 2,
        },
      }
    );
    await db.listCollections();
  } catch (error) {
    throw error;
  }
}

export async function dropCollection(db: IDatabaseAdapter) {
  try {
    if (await isExists(db)) {
      await db.dropCollection(name);
    }
  } catch (error) {
    throw error;
  }
}
