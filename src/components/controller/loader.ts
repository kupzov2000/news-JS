interface OptionsApi {
    [key: string]: string;
}

interface ResData<T> {
    ok: boolean;
    status: number;
    statusText: string;
    json(): Promise<T>;
}

class Loader {
    baseLink: string;
    options: OptionsApi;

    constructor(baseLink: string, options: OptionsApi) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: OptionsApi },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        // console.log(endpoint);
        this.load('GET', endpoint, callback, options);
    }

    errorHandler<T>(res: ResData<T>) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: OptionsApi, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<U>(method: string, endpoint: string, callback: (data: U) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: U) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
