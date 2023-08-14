import { defineStore, acceptHMRUpdate } from 'pinia'
import { UserService } from '@/services/userService'
import type { singleUserType } from '@/types/singleUserType'

type State = {
  userList: Array<singleUserType>
  singleUser: singleUserType
}
export const useUserStore = defineStore('UserStore', {
  state: (): State => {
    return {
      userList: [
        {
          id: null,
          email: '',
          firstName: '',
          lastName: '',
          avatar: ''
        }
      ],
      singleUser: {
        id: null,
        email: '',
        firstName: '',
        lastName: '',
        avatar: ''
      }
    }
  },
  getters: {
    getUserList: (state: State) => state.userList
  },
  actions: {
    async fetchUserList() {
      try {
        const service = new UserService()
        const response = await service.fetchUserList()
        this.userList = response
      } catch (error) {
        console.log(error)
      }
    },
    async fetchSingleUser(id: number) {
      try {
        const service = new UserService()
        const response = await service.fetchSingleUser(id)
        this.singleUser = response
      } catch (error) {
        console.log(error)
      }
    },
    async postNewUser(userData: singleUserType) {
      try {
        const service = new UserService()
        const response = await service.postNewUser(userData)
        this.singleUser = response
      } catch (error) {
        console.log(error)
      }
    },
    async editUser(userData: singleUserType) {
      try {
        const service = new UserService()
        await service.editUser(userData)
        const indexToChange: number = this.userList.findIndex((user) => user.id === userData.id)
        this.userList[indexToChange] = userData
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(id: number) {
      try {
        const service = new UserService()
        await service.deleteUser(id)
        const splitIndex = this.userList.findIndex((user) => user.id === id)
        this.userList.splice(splitIndex, 1)
      } catch (error) {
        console.log(error)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
