<p align="center">
  <img src="./WERSTACK.png" alt="WERSTACK-PLATFORM">
</p>

---

<font size="2"><a href="../README.md">< Назад</a></font>

# Удаление папки (необходим авторизация по токену)

Запрос удаляет указанную в url папку вместе с ее содержимым

### Request

 + HTTP Method: DELETE
 
 + URL: https://stock.werstack.com/folders/2f0df4e5-13a0-41b9-aea9-5908162ad94e

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
 
  {
    message: "Папка 2f0df4e5-13a0-41b9-aea9-5908162ad94e успешно удалена"
  }

 ```

---

<p align="center">
  <font size="2" color="#999999"><small>© 2023, made with ❤ for WERSTACK.COM</small></font>
</p>