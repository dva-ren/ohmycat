import axios from 'axios'
import type { SongInfo } from '~/types'

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

export const querySongInfo = (id: number): Promise<{
  code: number
  data: Song
}> => {
  return server({
    method: 'GET',
    url: `/meting/?type=song&id=${id}`,
  })
}
