import { defineConfig } from 'unocss'

export default defineConfig({
    // ...UnoCSS options
    rules: [
        [/^m-([.\d]+)$/, ([, num]) => ({ margin: `${num}px` })],
        [/^m-l-([.\d]+)$/, ([, num]) => ({ 'margin-left': `${num}px` })],
        [/^p-([.\d]+)$/, ([, num]) => ({ padding: `${num}px` })],
        [/^p-l-([.\d]+)$/, ([, num]) => ({ 'padding-left': `${num}px` })],
        [/^p-r-([.\d]+)$/, ([, num]) => ({ 'padding-right': `${num}px` })],
        [/^p-t-([.\d]+)$/, ([, num]) => ({ 'padding-top': `${num}px` })],
        [/^p-b-([.\d]+)$/, ([, num]) => ({ 'padding-bottom': `${num}px` })],
    ],
})
