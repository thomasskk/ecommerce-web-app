import { User } from '../models/user'
import { Item } from '../models/item'

export class cartService {
  static getCart = async (username: string) => {
    let user = await User.findOne({ username }).exec()
    await user!.populate({ path: 'cart.item', model: 'Item' }).execPopulate()
    return user!.cart!
  }

  static removeCartItem = async (itemName: string, username: string) => {
    let user = await User.findOne({ username }).exec()

    await user!.populate({ path: 'cart.item', model: 'Item' }).execPopulate()

    user!.cart! = user!.cart!.filter((item: any) => item!.item!.name != itemName)
    await user!.save()
  }

  static changeQuantity = async (quantity: number, itemName: string, username: string) => {
    let user = await User.findOne({ username }).exec()

    await user!.populate({ path: 'cart.item', model: 'Item' }).execPopulate()

    let index = user!.cart!.findIndex((item: any) => item!.item!.name === itemName)
    user!.cart![index].quantity = quantity
    await user!.save()
  }

  static addItem = async (itemName: string, username: string) => {
    let user = await User.findOne({ username }).exec()
    let item = await Item.findOne({ name: itemName }).exec()
    let itemIndex = -1

    for (const [i, v] of user!.cart!.entries()) {
      if (v.item!.toString() == item!._id) {
        itemIndex = i
      }
    }

    if (itemIndex === -1) {
      user!.cart!.push({
        item: item!._id,
        quantity: 1,
      })
    } else {
      user!.cart![itemIndex].quantity++
    }
    await user!.populate({ path: 'cart.item', model: 'Item' }).execPopulate()
    await user!.save()
  }
}
