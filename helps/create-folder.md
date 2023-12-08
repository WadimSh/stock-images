<p align="center">
  <img src="./WERSTACK.png" alt="WERSTACK-PLATFORM">
</p>

---

<font size="2"><a href="../README.md">< Назад</a></font>

# Создание папки (необходим авторизация по токену)

Запрос создает папку на сервере, наименование папки генерируется сервисом

### Request

 + HTTP Method: GET
 
 + URL: https://stock.werstack.com/folders/create

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
    folderName: "c4a563c5-b325-4868-9711-940ec16cb353"
 }

 ```

---

<p align="center">
  <font size="2" color="#999999"><small>@ 2023, made with ❤ for WERSTACK.COM</small></font>
</p>