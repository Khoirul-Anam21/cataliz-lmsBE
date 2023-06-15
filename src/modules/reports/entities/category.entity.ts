import { ObjectId } from "mongodb";

export interface CategoryInterface {
    _id?: string | ObjectId;
    name?: string;
  }

export class CategoryEntity {
  public category: CategoryInterface;

  constructor(category: CategoryInterface) {
    this.category = category;
  }
}
