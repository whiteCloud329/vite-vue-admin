import { get, post } from '@/lib/axios.ts'

export const querySupplierList = (params: object) => {
    return post('xoscc-tenant/select/querySupplierList', params)
}
export const customsDeclaration = (params: object) => {
    return get(
        'xoscc-performance/performance/customsDeclaration/detail',
        params,
    )
}
