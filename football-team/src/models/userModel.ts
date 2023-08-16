export default class UserModel {
  id: number | null
  email: string
  avatar: string
  fullName: string

  constructor(userModel: any) {
    this.id = userModel.id
    this.email = userModel.email
    this.avatar = userModel.avatar
    this.fullName = userModel.first_name + ' ' + userModel.last_name
  }
}
