import { DataSources } from '../../../types/index';
import './sources.css';

class Sources {
    draw(data: DataSources['sources']) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp === null) throw new Error("Error. 'sourceItemTemp' not found");
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const sourceItemName = sourceClone.querySelector('.source__item-name');
            if (sourceItemName instanceof HTMLElement) {
                sourceItemName.textContent = item.name;
            }

            const sourceItem = sourceClone.querySelector('.source__item');
            if (sourceItem instanceof HTMLElement) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const documentSources = document.querySelector('.sources');
        if (documentSources instanceof HTMLElement) {
            documentSources.append(fragment);
        }
    }
}

export default Sources;
