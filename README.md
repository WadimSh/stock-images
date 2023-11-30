# stock.werstack

stock.werstack - это серверное приложение, разработанное на основе платформы Node.js и фреймворка Express.js. Оно предназначено для хранения и управления файлами с изображениями, используемыми на сайтах, созданных на платформе WerStack.

## Описание API

API предоставляет роуты для загрузки, получения, поиска и удаления файлов с изображения, а так же создания и удаления папок на сервере. Для выполнения операций с папками требуется отправка авторизационного токена в заголовке запроса.

### Роуты для работы с файлами изображений

| Роуты | Методы | Описание |
|:-----|:------|:---------|
| /images/:folder  | POST |  |
| /images/:folder | GET |  |
| /images/:folder/:file | GET |  |
| /images/:folder/:file | DELETE |  |

### Роут для поиска файлов изображений

| Роуты | Методы | Описание |
|:-----|:------|:---------|
| /search/:folder?files=search_query | GET |  |

### Роуты для работы с папками для хранения файлов изображений

| Роуты | Методы | Описание |
|:-----|:------|:---------|
| /folders | POST |  |
| /folders | GET |  |
| /folders/:folder | DELETE |  |