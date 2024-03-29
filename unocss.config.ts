import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[1.2em] cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['link', 'text-gray-700 hover:text-black opacity-95 transition duration-200 ease-in-out dark:hover:text-white dark:text-gray-400 transition'],
    ['layout-center', 'p-4 max-w-750px m-auto'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'vertical-align': '-0.15em',
        'height': '1em',
        'width': '1em',
        'fill': 'currentColor',
        'overflow': 'hidden',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'Noto Sans SC',
        inter: 'Inter:400,600,800',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
})
