import type { BytemdPlugin } from 'bytemd'
import figure from 'rehype-figure'

export default function mdFigure(): BytemdPlugin {
  return {
    rehype: processor => processor.use(figure),
  }
}
