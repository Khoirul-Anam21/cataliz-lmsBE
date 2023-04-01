import { ObjectId } from "mongodb";

export interface Category {
    _id: number | ObjectId;
    name: string;
  }

export class categoryEntity {
  public category: Category;

  constructor(category: Category) {
    this.category = category;
  }
}
