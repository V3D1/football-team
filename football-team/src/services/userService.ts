import type singleUserType from '@/types/singleUserType'
import instance from '@/services/api'

export class UserService {
  async fetchUserList(pageNumber: number) {
    try {
      const response: any = await instance.get(`/users?page=${pageNumber}`)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async fetchSingleUser(id: string) {
    try {
      const response: any = await instance.get(`/users/${id}`)
      return Promise.resolve(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async postNewUser(userData: singleUserType) {
    try {
      const response: any = await instance.post('/users/', {
        body: userData
      })
      console.log(response)
      return Promise.resolve(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async editUser(userData: singleUserType) {
    try {
      const response: any = await instance.put(`/users/${userData.id}`, {
        body: userData
      })
      console.log(response)
      return Promise.resolve(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async deleteUser(id: number) {
    try {
      const response: any = await instance.delete(`/users/${id}`)
      console.log(response)
      return Promise.resolve(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
