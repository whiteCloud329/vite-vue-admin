import { get } from '@/lib/axios.ts'
import { dayjs } from 'element-plus'

export const getMenuList = () => {
    return get('system/getMenus', {
        _t: dayjs().valueOf(),
    })
}
