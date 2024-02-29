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

export interface DataNews {
    status: string;
    totalResults: number;
    articles: DataItem[];
}

interface ItemSources {
    name: string;
    id: string;
}

export interface DataSources {
    sources: ItemSources[];
}

export type DataVoid = () => void;

export interface OptionsApi {
    [key: string]: string;
}

export interface ResData<T> {
    ok: boolean;
    status: number;
    statusText: string;
    json(): Promise<T>;
}
