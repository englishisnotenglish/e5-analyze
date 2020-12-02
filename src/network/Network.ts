// 可能会有登录，以及无头浏览器去登录

interface Network {
    fetchUrl(url: string): Promise<any>
    login(): Promise<any>
    goto(url: string): Promise<any>
}

export {}