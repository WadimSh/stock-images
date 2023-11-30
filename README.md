# stock.werstack

stock.werstack - это серверное приложение, разработанное на основе платформы Node.js и фреймворка Express.js. Оно предназначено для хранения и управления файлами с изображениями, используемыми на сайтах, созданных на платформе WerStack.

### Описание API

API предоставляет роуты для загрузки, получения, поиска и удаления файлов с изображения, а так же создания и удаления папок на сервере. Для выполнения операций с папками требуется отправка авторизационного токена в заголовке запроса.

#### Роуты для работы с файлами изображений

| Роуты | Методы | Описание |
|:-----|:------|:---------|
| [/images/:folder]()  | POST | Загружает на сервер файл с изображением в папку ```:folder``` |
| [/images/:folder]() | GET | Возвращает массив ссылок на файлы хранящиеся в папке ```:folder``` |
| [/images/:folder/:file]() | GET | Возвращает файл ```:file``` из папки ```:folder``` |
| [/images/:folder/:file]() | DELETE | Удаляет файл ```:file``` из папки ```:folder``` |

#### Роут для поиска файлов изображений

| Роуты | Методы | Описание |
|:-----|:------|:---------|
| [/search/:folder?files=search_query]() | GET | Возвращает массив ссылок на файлы из папки ```:folder``` содержащие в имени переданные значения ```search_query``` |

#### Роуты для работы с папками для хранения файлов изображений

| Роуты | Методы | Описание |
|:-----|:------|:---------|
| /folders | POST |  |
| /folders | GET |  |
| /folders/:folder | DELETE |  |