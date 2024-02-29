import AppLoader from './appLoader';

class AppController extends AppLoader {
    // ЕСЛИ ОШИБКИ, ТО ПОМЕНЯЙ callback типизацию
    getSources(callback: void): void {
        if (callback === undefined) throw new Error('Error. ');
        console.log(callback);

        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: void) {
        if (callback === undefined) throw new Error('Error. ');

        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId || '');
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId || '',
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
