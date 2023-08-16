import { defineStore, acceptHMRUpdate } from 'pinia'
import { UserService } from '@/services/userService'
import type singleUserType from '@/types/singleUserType'
import type pageDetailsType from '@/types/pageDetailsType'
import UserModel from '@/models/userModel'

type State = {
  userList: Array<singleUserType>
  singleUser: {
    id: number | null
    first_name: string
    last_name: string
    avatar: string
  }
  pageData: pageDetailsType
}
export const useUserStore = defineStore('UserStore', {
  state: (): State => {
    return {
      userList: [],
      singleUser: {
        id: null,
        first_name: '',
        last_name: '',
        avatar: ''
      },
      pageData: {
        page: 0,
        per_page: 0,
        total: 0,
        total_pages: 0
      }
    }
  },
  getters: {
    getUserList: (state: State) => state.userList,
    getPageData: (state: State) => state.pageData,
    getSingleUser: (state: State) => state.singleUser
  },
  actions: {
    async fetchUserList(pageNumber: number) {
      try {
        const service = new UserService()
        const response = await service.fetchUserList(pageNumber)
        const tempList = []
        for (const user of response.data.data) {
          tempList.push(new UserModel(user))
        }
        this.userList = tempList
        this.pageData.page = response.data.page
        this.pageData.per_page = response.data.per_page
        this.pageData.total = response.data.total
        this.pageData.total_pages = response.data.total_pages
      } catch (error) {
        console.log(error)
      }
    },
    async fetchSingleUser(id: string) {
      try {
        const service = new UserService()
        const response = await service.fetchSingleUser(id)
        this.singleUser = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async postNewUser(userData: singleUserType) {
      try {
        const service = new UserService()
        const response = await service.postNewUser(new UserModel(userData))
        this.userList.unshift(response.body)
      } catch (error) {
        console.log(error)
      }
    },
    async editUser(userData: singleUserType) {
      try {
        const service = new UserService()
        await service.editUser(userData)
        const indexToChange: number = this.userList.findIndex((user) => user.id === userData.id)
        this.userList[indexToChange] = new UserModel(userData)
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
