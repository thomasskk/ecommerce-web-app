import { Item } from '../models/item'
import { search } from '../routes/cart'

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

  static itemPage = async (skip: number, input: string) => {
    const LIMIT = 20
    const count = await Item.find({ name: { $regex: input, $options: 'i' } }).count()
    const item = await Item.find({ name: { $regex: input, $options: 'i' } })
      .skip(skip * LIMIT)
      .limit(LIMIT)
      .exec()
    return { item, count }
  }

  static getItem = async (name: string) => {
    return Item.findOne({ name })
  }
}
