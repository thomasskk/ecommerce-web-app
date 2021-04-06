import axios from 'axios'
import { ItemDoc } from '../models/item'

const toBase64 = async (imageUrl: string) => {
  imageUrl = imageUrl.split(',')[0]
  let image = await axios.get(imageUrl, {
    responseType: 'arraybuffer',
  })
  let base64 = 'data:image/png;base64, '
  return base64 += Buffer.from(image.data).toString('base64')
}


export { toBase64 }
