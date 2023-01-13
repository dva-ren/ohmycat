import { defineStore } from 'pinia'
import type { Master } from '~/types'
import { queryMaster } from '~/api'

export const useMainStore = defineStore('main', {
  state() {
    return {
      master: {} as Master,
    }
  },
  actions: {
    async getMaster() {
      const res = await queryMaster()
      if (res.code === 200)
        this.master = res.data
    },
  },
})
