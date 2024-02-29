import { DataNews } from '../../../types/index';
import './news.css';

class News {
    draw(data: DataNews['articles']) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp === null) throw new Error("Eroor. 'newsItemTemp' is not found");
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            const newsItem = newsClone.querySelector('.news__item');
            if (newsItem instanceof HTMLElement) {
                if (idx % 2) newsItem.classList.add('alt');
            }

            const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
            if (newsMetaPhoto instanceof HTMLElement) {
                newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
            if (newsMetaAuthor instanceof HTMLElement) {
                newsMetaAuthor.textContent = item.author || item.source.name;
            }

            const newsMetaDate = newsClone.querySelector('.news__meta-date');
            if (newsMetaDate instanceof HTMLElement) {
                newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
            if (newsDescriptionTitle instanceof HTMLElement) {
                newsDescriptionTitle.textContent = item.title;
            }

            const newsDescriptionSource = newsClone.querySelector('.news__description-source');
            if (newsDescriptionSource instanceof HTMLElement) {
                newsDescriptionSource.textContent = item.source.name;
            }

            const newsDescriptionContent = newsClone.querySelector('.news__description-content');
            if (newsDescriptionContent instanceof HTMLElement) {
                newsDescriptionContent.textContent = item.description;
            }

            const newsReadMoreA = newsClone.querySelector('.news__read-more a');
            if (newsReadMoreA instanceof HTMLElement) {
                newsReadMoreA.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const documentNews = document.querySelector('.news');
        if (documentNews instanceof HTMLElement) {
            documentNews.innerHTML = '';
            documentNews.appendChild(fragment);
        }
    }
}

export default News;
