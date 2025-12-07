interface IOptions {
    apiKey: string;
}

interface IGetOptions {
    sources?: string;
}

type IUrlOptions = IOptions & IGetOptions;

export interface ISource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface IDataSources {
    status: string;
    sources: ISource[];
}

export interface IGetRespCallback {
    (data: IDataSources): void;
}

export type CallbackGetResp = IGetRespCallback | (() => void);

class Loader {
    protected baseLink: string;
    protected options: IOptions;

    constructor(baseLink: string, options: IOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: { endpoint: string; options?: IGetOptions },
        callback: CallbackGetResp = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    protected errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    protected makeUrl(options: IGetOptions, endpoint: string) {
        const urlOptions: IUrlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as Array<keyof IUrlOptions>).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    protected load(method: string, endpoint: string, callback: IGetRespCallback, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: IDataSources) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
