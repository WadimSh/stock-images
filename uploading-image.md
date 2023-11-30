[< Назад][1]

# Загрузка изображения

Запрос отправляет файл изображения и возвращает ссылку на него на сервере. Сервер принимает файлы размером до **1Mb** с расширениями ```.jpg```, ```.jpeg``` и ```.png```.

### Request

 + HTTP Method: POST
 
 + URL: https://stock.werstack.com/images/test

 + Headers: 
 ```javascript
 Content-Type: multipart/form-data
 ```

 + Body:
```javascript
{
  "image": (binary)
}
```

### Response

 + Status: 200 OK

 + Body:
 ```javascript
{
  "url": "https://stock.werstack.com/images/test/93e4e139-373a-4870-8780-98094844b59b-2.jpg"
}
```

---
###### @ 2023, made with ❤ for WERSTACK.COM

[1]:/README.md