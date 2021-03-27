import { ObjectId } from 'bson'
import mongoose, { Schema } from 'mongoose'
import { createSchema, Type, typedModel, ExtractDoc, ExtractProps } from 'ts-mongoose'
import { ItemSchema } from './item'

const genders = ['male', 'female'] as const

const UserSchema = createSchema(
  {
    firstName: Type.string({ required: true }),
    lastName: Type.string({ required: true }),
    gender: Type.string({ required: true, enum: genders }),
    username: Type.string({ required: true, unique: true }),
    password: Type.string({ required: true }),
    email: Type.string({ required: true, unique: true }),
    adress: Type.string({ required: true }),
    phone: Type.number({ required: true, unique: true }),
    birthDate: Type.string({ required: true }),
    cart: Type.array().of({
      item: Type.ref(Type.objectId()).to('Item', ItemSchema),
      quantity: Type.number({ required: true }),
    }),
  },
  {
    timestamps: true,
  }
)

export const User = typedModel('User', UserSchema)
export type UserDoc = ExtractDoc<typeof UserSchema>
export type UserProps = ExtractProps<typeof UserSchema>
