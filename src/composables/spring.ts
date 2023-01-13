import { useMotion } from '@vueuse/motion'

export default {
  created(el) {
    const transition = {
      type: 'spring',
      stiffness: 200,
      damping: 22,
      mass: 1,
    }
    const { apply } = useMotion(el, {
      initial: {
        y: 80,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition,
      },
    })
    el.apply = apply
  },
  mounted(el) {
    el.apply('show')
  },
}
