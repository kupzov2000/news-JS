import { DataNews, DataSources } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const documentSources = document.querySelector('.sources');
        if (documentSources instanceof HTMLElement) {
            documentSources.addEventListener('click', (e) =>
                this.controller.getNews(e, (data?: DataNews) => this.view.drawNews(data))
            );
        }

        this.controller.getSources((data?: DataSources) => this.view.drawSources(data));
    }
}

export default App;
