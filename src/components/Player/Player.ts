import type { SongInfo } from '~/types'
import { querySongInfo } from '~/api'

type PlayState = 'play' | 'pause'
const toSecede = (s: number | undefined) => {
  if (!s)
    return '00'
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`
}

export class Player {
  public playList = ref<SongInfo[]>([])
  public state = ref<PlayState>('pause')
  public current = ref<SongInfo>({
    id: '5243363',
    url: 'https://api.injahow.cn/meting/?server=netease&type=url&id=1406686876',
    pic: 'https://api.injahow.cn/meting/?server=netease&type=pic&id=109951164545953099',
    artist: '太一',
    name: '负重一万斤长大',
    time: '221335',
    lrc: '',
  })

  public audio: HTMLAudioElement
  public time = ref('00:00/00:00')
  public process = ref(0)
  private timer: any
  public volume = ref(50)

  constructor(audio: HTMLAudioElement) {
    audio.src = this.current.value.url
    audio.onplaying = () => {
      // 歌曲淡入淡出
      // let vol = audio.volume
      // const t = setInterval(() => {
      //   if (vol < this.volume.value) {
      //     vol += 0.1
      //     this.audio.volume = vol
      //   }
      //   else { clearInterval(t) }
      // }, 50)
      this.state.value = 'play'
    }
    audio.onpause = () => {
      this.state.value = 'pause'
    }
    watch(this.volume, () => {
      audio.volume = this.volume.value / 100
    })
    this.audio = audio
  }

  play(song?: SongInfo) {
    clearInterval(this.timer)
    if (song) {
      this.pause()
      this.audio.src = song.url
      this.current.value = song
      this.audio.oncanplay = () => {
        this.audio.play()
        this.startTimer()
      }
    }
    else {
      this.startTimer()
      this.audio.play()
    }
  }

  async playById(id: number) {
    const res = await querySongInfo(id)
    this.play({
      ...res.data,
      id: '2',
      time: '0',
    })
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.time.value = `${toSecede(this.audio.currentTime)}/${toSecede(this.audio.duration)}`
      this.process.value = (this.audio.currentTime || 0) / (this.audio.duration || 0) * 100
    }, 1000)
  }

  pause() {
    // 歌曲淡入淡出
    // let vol = this.audio.volume
    // const t = setInterval(() => {
    //   vol -= 0.1
    //   if (vol > 0) {
    //     console.log(vol)
    //     this.audio.volume = vol
    //   }
    //   else {
    //     clearInterval(t)
    //   }
    // }, 100)
    clearInterval(this.timer)
    this.audio.pause()
  }
}
