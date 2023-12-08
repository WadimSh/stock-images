<p align="center">
  <img src="./WERSTACK.png" alt="WERSTACK-PLATFORM">
</p>

---

<font size="2"><a href="../README.md">< Назад</a></font>

# Загрузка изображения в папку

Запрос отправляет файл изображения и возвращает ссылку на него на сервере. Сервер принимает файлы размером до **1Mb** с расширениями ```.jpg```, ```.jpeg``` и ```.png```.

### Request

 + HTTP Method: POST
 
 + URL: https://stock.werstack.com/images/c41562be-5668-4b0f-88a0-d7b1eafb146d

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

 + Status: 200

 + Body:
 ```javascript
{
  "url": "http://localhost:3000/images/c41562be-5668-4b0f-88a0-d7b1eafb146d/veselaya.jpg",
  "size": 170155,
  "name": "veselaya.jpg"
}
```

---

<p align="center">
  <font size="2" color="#999999"><small>@ 2023, made with ❤ for WERSTACK.COM</small></font>
</p>