declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<object, object, never>
    export default component
}
declare module '*.ts'
