<p align="center">
  <img src="./WERSTACK.png" alt="WERSTACK-PLATFORM">
</p>

---

<font size="2"><a href="../README.md">< Назад</a></font>

# Возвращает массив имен папок (необходим авторизация по токену)

Запрос возвращает массив намиенований папок, расположенных на сервере

### Request

 + HTTP Method: GET
 
 + URL: https://stock.werstack.com/folders

 + Headers: 
 ```javascript

  Content-Type: application/json
  Authorization: Bearer {авторизационный_токен}

 ```

### Response

 + Status: 200

 + Headers: 
 ```javascript

  Content-Type: application/json

 ```

 + Body:
 ```javascript
 
  [
    "2f0df4e5-13a0-41b9-aea9-5908162ad94e",
    "c4a563c5-b325-4868-9711-940ec16cb353"
  ]

 ```

---

<p align="center">
  <font size="2" color="#999999"><small>@ 2023, made with ❤ for WERSTACK.COM</small></font>
</p>