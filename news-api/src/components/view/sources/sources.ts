import { ISource } from '../../controller/loader';
import './sources.css';

class Sources {
    private setText(el: HTMLElement | null, text: string) {
        if (el && text) {
            el.textContent = text;
        }
    }

    private setAttr(el: HTMLElement | null, nameAttr: string, valueAttr: string) {
        if (el) {
            el.setAttribute(nameAttr, valueAttr);
        }
    }

    draw(data: ISource[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (!sourceItemTemp) {
            throw new Error('Error. "sourceItemTemp" is not found');
        }

        data.forEach((item) => {
            const { name, id } = item;
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            this.setText(sourceClone.querySelector('.source__item-name'), name);
            this.setAttr(sourceClone.querySelector('.source__item'), 'data-source-id', id);

            fragment.append(sourceClone);
        });

        const sources = document.querySelector('.sources');
        if (sources) {
            sources.append(fragment);
        }
    }
}

export default Sources;
