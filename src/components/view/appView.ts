import News from './news/news';
import Sources from './sources/sources';

interface DataItem {
    urlToImage?: string;
    author?: string;
    source: {
        name: string;
    };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}

interface DataDrawNews {
    articles: DataItem[];
}

interface ItemSources {
    name: string;
    id: string;
}

interface DataSources {
    sources: ItemSources[];
}

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: DataDrawNews) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: DataSources) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
