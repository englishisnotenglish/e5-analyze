import request from 'superagent'

// 主要目前还是实现get方法，其他的暂时不实现
interface SuperAgent {
    setHeader(header?: any): any;
    get(url: string, query: any): Promise<any>;
    post(url: string, params: any): Promise<any>;
    // put(): Promise<any>;
    // delete(): Promise<any>;
    // head(): Promise<any>;
}

export default class Agent implements SuperAgent {
    private request = request

    constructor () {
        this.setHeader()
    }

    setHeader(header?: any) {
        const config: any = header || {
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,fr;q=0.7',
            'Cache-Control': 'max-age=0',
            Cookie: 'SF_cookie_1=72991020; _trs_uv=ki4006hq_6_kp5h; _trs_ua_s_1=ki4006hq_6_9swe',
            DNT: 1,
            Host: 'www.stats.gov.cn',
            // If-Modified-Since: Mon, 30 Nov 2020 01:00:31 GMT
            // If-None-Match: "137c6-5b548896629c0-gzip"
            'Proxy-Connection': 'keep-alive',
            Referer: 'http://www.stats.gov.cn/tjsj/zxfb/index_2.html',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        };

        return this.request.setHeader(config)
    }

    post(url, params) {
        return request.post(url).send(params)
    }

    get(url: string, query: any) {
        return request.get(url).query(query)
    }
}
