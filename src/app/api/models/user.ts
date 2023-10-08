import mongoose from 'mongoose'

const userSchema: mongoose.Schema = new mongoose.Schema<UserModel>({
  role: String,
  name: String,
})

export interface UserModel {
  role: string
  name: string
}

export const UserModel: mongoose.Model<UserModel> =
  (mongoose.model as unknown as any).User ||
  mongoose.model<UserModel>('User', userSchema)
