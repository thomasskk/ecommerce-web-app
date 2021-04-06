import { Item } from '../models/item'
import { search } from '../routes/cart'
import axios from 'axios'
import {toBase64 } from '../utils/imageBase64'

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
    let item = await Item.find({ name: { $regex: input, $options: 'i' } })
      .skip(skip * LIMIT)
      .limit(LIMIT)
      .exec()

    await Promise.all(
      item.map(async (item) => {
        item.image = await toBase64(item.image)
      })
    )

    return { item, count }
  }

  static getItem = async (name: string) => {
    let item = await Item.findOne({ name }).exec()
    item.image = await toBase64(item.image)
    return item
  }
}
