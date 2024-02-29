import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (apiUrl === undefined || apiKey === undefined) {
            throw new Error('Error. API_URL and API_KEY not found');
        }

        super(apiUrl, { apiKey });
    }
}

export default AppLoader;
