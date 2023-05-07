import { IDatabaseAdapter } from "@src/database/connection";

export const name = "courseContent";

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
        course: {
          bsonType: "object",
          description: "must be an object",
        },
        thumbnail: {
          bsonType: "string",
          description: "must be a string",
        },
        title: {
          bsonType: "string",
          description: "must be a string",
        },
        description: {
          bsonType: "string",
          description: "must be a string",
        },
        material: {
          bsonType: "string",
          description: "must be a string",
        },
        duration: {
          bsonType: "number",
          description: "must be a number",
        },
        type: {
          bsonType: "string",
          description: "must be a string",
        },
        assignment: {
          bsonType: "object",
          description: "must be an object",
        },
        isComplete: {
          bsonType: "boolean",
          description: "must be a boolean",
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
