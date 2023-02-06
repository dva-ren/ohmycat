import { Player } from '~/components/Player/Player'
let playerInstance: Player

export const usePlayer = () => {
  if (!playerInstance) {
    const audio = document.createElement('audio')
    audio.volume = 0.4
    document.documentElement.appendChild(audio)
    playerInstance = new Player(audio)
  }
  return {
    player: playerInstance!,
    current: playerInstance.current!,
    playState: playerInstance.state!,
    audio: playerInstance.audio!,
    time: playerInstance.time,
    process: playerInstance.process,
    playById: playerInstance.playById,
  }
}
