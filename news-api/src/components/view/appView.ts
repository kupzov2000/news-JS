import { IDataSources } from '../controller/loader';
import News, { INewsItem } from './news/news';
import Sources from './sources/sources';

export interface IDrawNewsData {
    status: string;
    totalResults: number;
    articles: INewsItem[];
}

export class AppView {
    protected news: News;
    protected sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data?: IDrawNewsData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IDataSources) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
