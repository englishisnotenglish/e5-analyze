// @ts-ignore
import cheerio from 'cheerio'

interface Resolve {
    loadHtml(html: string): void;
    findNode(selector: string): any
    getNodeText(selector: string): string
}

export default class HtmlParser implements Resolve {
    private parser = cheerio

    constructor(html?: string) {
        if (html) {
            this.loadHtml(html)
        }
    }

    loadHtml(html: string) {
        this.parser.load(html)
    }

    findNode(selector: string) {
        return this.parser(selector)
    }

    getNodeText(selector: string) {
        return this.parser(selector).text()
    }
}