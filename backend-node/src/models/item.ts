import { createSchema, ExtractDoc, ExtractProps, Type, typedModel } from 'ts-mongoose'

export const ItemSchema = createSchema(
  {
    name: Type.string({ required: true, unique: true }),
    price: Type.number({ required: true }),
    image: Type.string({ required: true }),
    stock: Type.number({ required: true }),
    category: Type.string({ required: true }),
    description: Type.string({ required: true }),
  },
  {
    timestamps: true,
  }
)

export const Item = typedModel('Item', ItemSchema)
export type ItemDoc = ExtractDoc<typeof ItemSchema>;
export type ItemProps = ExtractProps<typeof ItemSchema>;
