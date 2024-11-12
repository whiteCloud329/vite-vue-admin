import Cookies from 'js-cookie'

const tokenKey = 'authorization'

export const setCookies = (key: string, value: string) => {
    Cookies.set(key, value)
}
export const getCookies = (name: string) => {
    return Cookies.get(name)
}

export const getToken = () => {
    return getCookies(tokenKey)
}
