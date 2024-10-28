import { defineConfig } from 'unocss'

export default defineConfig({
    // ...UnoCSS options
    rules: [
        [/^m-([.\d]+)$/, ([, num]) => ({ margin: `${num}px` })],
        [/^m-l-([.\d]+)$/, ([, num]) => ({ 'margin-left': `${num}px` })],
        [/^m-r-([.\d]+)$/, ([, num]) => ({ 'margin-right': `${num}px` })],
        [/^m-t-([.\d]+)$/, ([, num]) => ({ 'margin-top': `${num}px` })],
        [/^m-b-([.\d]+)$/, ([, num]) => ({ 'margin-bottom': `${num}px` })],
        [/^p-([.\d]+)$/, ([, num]) => ({ padding: `${num}px` })],
        [/^p-l-([.\d]+)$/, ([, num]) => ({ 'padding-left': `${num}px` })],
        [/^p-r-([.\d]+)$/, ([, num]) => ({ 'padding-right': `${num}px` })],
        [/^p-t-([.\d]+)$/, ([, num]) => ({ 'padding-top': `${num}px` })],
        [/^p-b-([.\d]+)$/, ([, num]) => ({ 'padding-bottom': `${num}px` })],
    ],
})
