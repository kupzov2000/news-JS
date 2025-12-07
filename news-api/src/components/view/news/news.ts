import './news.css';

interface INewsSource {
    id: string;
    name: string;
}

export interface INewsItem {
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    source: INewsSource;
    title: string;
    url: string;
    urlToImage: string;
}

class News {
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

    public draw(data: INewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (newsItemTemp === null) {
            throw new Error('Error. "newsItemTemp" is not found');
        }

        news.forEach((item, idx) => {
            const { urlToImage, author, source, publishedAt, title, description, url } = item;
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            const newsItem = newsClone.querySelector('.news__item');
            if (newsItem && idx % 2) {
                newsItem.classList.add('alt');
            }

            const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (newsMetaPhoto) {
                newsMetaPhoto.style.backgroundImage = `url(${urlToImage || 'img/news_placeholder.jpg'})`;
            }

            this.setText(newsClone.querySelector('.news__meta-author'), author || source.name);
            this.setText(newsClone.querySelector('.news__description-title'), title);
            this.setText(newsClone.querySelector('.news__description-source'), source.name);
            this.setText(newsClone.querySelector('.news__description-content'), description);
            this.setText(
                newsClone.querySelector('.news__meta-date'),
                publishedAt.slice(0, 10).split('-').reverse().join('-')
            );

            this.setAttr(newsClone.querySelector('.news__read-more a'), 'href', url);

            fragment.append(newsClone);
        });

        const newsElement: HTMLElement | null = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
