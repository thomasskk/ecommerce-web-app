import { Item } from '../models/item'

export class itemService {
  static createItem = async (itemData: any) => {
    const item = new Item({
      name: itemData.name,
      price: itemData.price,
      image: itemData.stock,
      stock: itemData.stock,
      category: itemData.category,
      description: itemData.description,
    })
    await item.save()
    return item
  }

  static ItemPage = async (skip: number) => {
    const LIMIT = 20
    const item = await Item.find({})
      .skip(skip * LIMIT)
      .limit(LIMIT)

    return item
  }
}
