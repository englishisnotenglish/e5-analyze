import Agent from '../network/SuerAgent'
import HtmlParser from '../resolve/HtmlParser'
import config from '../webs/config'


export default class Controller {
    parser: HtmlParser = new HtmlParser();
    request: Agent = new Agent()
    config = config

   
    runWeb(stats: Array<any>) {
        const { request, parser } = this
        for (let value of stats) {
            request.get(value.url).then((value: any) => {
                parser.loadHtml(value)
                const urls = this.resolveKeyword(value.keywords)
                this.resolveTable(urls)
            })
        }
    }

    resolveKeyword(keywords: string): Array<string> {
        const { parser } = this
        
        // 新闻列表
        const keyWordMapUrls = parser.findNode('.center_list_contlist').map((node: any) => {
            console.log(node, 'node');
            const childA = node.children('a')
            if (childA.text().indexOf(keywords)) {
                return childA.attr('href')
            }
        })

        console.log(keyWordMapUrls, 'keyWordMapUrls');

        return keyWordMapUrls
    }

    async resolveTable(urls: Array<string>) {
        const { request, parser} = this

        for (const url of urls) {
            const html = await request.get(url)
            parser.loadHtml(html)
            const rows = parser.findNode('.MsoNormalTable').find('tr')
        }
    }

    main() {
        const { config } = this
        console.log(config);
        
        this.runWeb(config['stats'])
    }
}

module.exports = Controller