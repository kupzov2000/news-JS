import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const API_URL = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (API_URL === undefined || apiKey === undefined) {
            throw new Error('API_URL and API_KEY not found');
        }

        super(API_URL, { apiKey });
    }
}

export default AppLoader;
