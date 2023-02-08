import axios from 'axios'
import type { AsyncResponse, SongInfo } from '~/types'
import http from '~/composables/requests'

interface Song {
  name: string
  artist: string
  url: string
  pic: string
  lrc: string
}
const server = axios.create({
  baseURL: 'https://api.injahow.cn',
})

export const queryPlaylist = (id: number): Promise<{
  code: number
  data: SongInfo[]
}> => {
  return server({
    method: 'GET',
    url: `/meting/?type=playlist&id=${id}`,
  })
}

export const querySongInfo = (id: string | number): AsyncResponse<SongInfo> => {
  return http.request({
    url: `/music/song?id=${id}`,
    method: 'GET',
  })
}
