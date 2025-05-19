//  Generate artivle from others
        async function fetchRandomArticleFromWikipedia() {
            const url = 'https://en.wikipedia.org/api/rest_v1/page/random/html';

            try {
                const response = await fetch(url);
                const html = await response.text();
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const title = doc.querySelector('title').textContent;
                const paragraphs = doc.querySelectorAll('p');
                let content = '';
                paragraphs.forEach(paragraph => {
                    content += paragraph.textContent + '\n';
                });
                return {
                    title: title,
                    content: content.trim()
                };
            } catch (error) {
                console.error("Error fetching the article from Wikipedia:", error);
                return {
                    title: "Error",
                    content: "Unable to fetch article content from Wikipedia."
                };
            }
        }

        async function fetchRandomArticleFromSimpleWikipedia() {
            const url = 'https://simple.wikipedia.org/wiki/Special:Random';

            try {
                const response = await fetch(url);
                const html = await response.text();
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const title = doc.querySelector('h1').textContent;
                const paragraphs = doc.querySelectorAll('#mw-content-text p');
                let content = '';
                paragraphs.forEach(paragraph => {
                    content += paragraph.textContent + '\n';
                });
                return {
                    title: title,
                    content: content.trim()
                };
            } catch (error) {
                console.error("Error fetching the article from Simple Wikipedia:", error);
                return {
                    title: "Error",
                    content: "Unable to fetch article content from Simple Wikipedia."
                };
            }
        }

        async function fetchRandomArticleFromNewYorkTimes() {
            const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=random&api-key=YOUR_API_KEY';

            try {
                const response = await fetch(url);
                const data = await response.json();
                const article = data.response.docs[Math.floor(Math.random() * data.response.docs.length)];
                const title = article.headline.main;
                const content = article.lead_paragraph;
                return {
                    title: title,
                    content: content.trim()
                };
            } catch (error) {
                console.error("Error fetching the article from The New York Times:", error);
                return {
                    title: "Error",
                    content: "Unable to fetch article content from The New York Times."
                };
            }
        }

        async function fetchRandomArticleFromBBC() {
            const url = 'https://www.bbc.co.uk/news';

            try {
                const response = await fetch(url);
                const html = await response.text();
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const articles = doc.querySelectorAll('.gs-c-promo-heading__title');
                const randomArticle = articles[Math.floor(Math.random() * articles.length)];
                const title = randomArticle.textContent;
                const content = randomArticle.closest('.gs-c-promo').querySelector('p').textContent;
                return {
                    title: title,
                    content: content.trim()
                };
            } catch (error) {
                console.error("Error fetching the article from BBC:", error);
                return {
                    title: "Error",
                    content: "Unable to fetch article content from BBC."
                };
            }
        }

        async function fetchRandomArticleFromGuardian() {
            const url = 'https://www.theguardian.com/international';

            try {
                const response = await fetch(url);
                const html = await response.text();
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const articles = doc.querySelectorAll('.fc-item__title a');
                const randomArticle = articles[Math.floor(Math.random() * articles.length)];
                const title = randomArticle.textContent;
                const content = randomArticle.closest('.fc-item__container').querySelector('.fc-item__standfirst').textContent;
                return {
                    title: title,
                    content: content.trim()
                };
            } catch (error) {
                console.error("Error fetching the article from The Guardian:", error);
                return {
                    title: "Error",
                    content: "Unable to fetch article content from The Guardian."
                };
            }
        }

        async function fetchRandomArticle() {
            const sources = [
                fetchRandomArticleFromWikipedia,
                fetchRandomArticleFromSimpleWikipedia,
                fetchRandomArticleFromNewYorkTimes,
                fetchRandomArticleFromBBC,
                fetchRandomArticleFromGuardian
            ];
            const randomSource = sources[Math.floor(Math.random() * sources.length)];
             return await randomSource();
        }

        async function generateArticle() {
            const resultArea = document.getElementById('new-result-area');
            let article;

            // Keep fetching until an article with more than 20 lines is retrieved
            do {
                article = await fetchRandomArticle();
            } while (article.content.split('\n').length <= 20);

            const header = `Title: ${article.title}\n\n`;
            const content = article.content;

            resultArea.value = header + content + "\n\n";
        }

        function copyResult() {
            const resultArea = document.getElementById('new-result-area');
            resultArea.select();
            document.execCommand('copy');
        }