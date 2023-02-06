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
  private temp = new Map<number, SongInfo>()
  public current = ref<SongInfo>({
    id: 1,
    url: '',
    pic: '',
    artist: '',
    name: '',
    time: '',
  })

  public audio: HTMLAudioElement
  public time = ref('00:00/00:00')
  public process = ref(0)
  private timer: any

  constructor(audio: HTMLAudioElement) {
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
        this.state.value = 'play'
        this.startTimer()
      }
    }
    else {
      this.startTimer()
      this.audio.play()
      this.state.value = 'play'
    }
  }

  async playById(id: number) {
    const res = await querySongInfo(id)
    this.play({
      ...res.data,
      id: 2,
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
    clearInterval(this.timer)
    this.audio.pause()
    this.state.value = 'pause'
  }

  volume(v: number) {
    if (!this.audio)
      return
    this.audio.volume = v
  }
}
