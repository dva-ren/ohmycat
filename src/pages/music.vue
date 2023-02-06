<script lang="ts" setup>
import type { Playlist } from '~/types'
import { queryPlaylist } from '~/api'

const alldata = ref<Playlist>()
const weekdata = ref<Playlist>()
const favoritedata = ref<Playlist>()

const getPlaylist = () => {
  queryPlaylist(7905130149).then((res) => {
    alldata.value = {
      id: 100,
      name: 'xxxx',
      coverImgUrl: res.data[0].pic,
      data: res.data.slice(0, 15),
      playCount: 0,
    }
  })
  queryPlaylist(570939754).then((res) => {
    weekdata.value = {
      id: 100,
      name: 'xxxx',
      coverImgUrl: res.data[0].pic,
      data: res.data.slice(0, 15),
      playCount: 0,
    }
  })
  queryPlaylist(565691094).then((res) => {
    favoritedata.value = {
      id: 100,
      name: 'xxxx',
      coverImgUrl: res.data[0].pic,
      data: res.data.slice(0, 15),
      playCount: 0,
    }
  })
}
getPlaylist()
</script>

<template>
  <Layout>
    <div>
      <MusicList
        type="年度歌单"
        :playlist="alldata"
      />
      <MusicList
        type="中文歌"
        :playlist="weekdata"
      />
      <MusicList
        type="英文歌"
        :playlist="favoritedata"
      />
    </div>
  </Layout>
</template>

<style scoped>

</style>
