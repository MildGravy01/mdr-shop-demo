# Магазин сервера MD-RESORTS.RU

Используемый стек - `Node.js`, `Express`, `React`, `Wepback`, `TypeScript`
## Начало работы

`npm run build` - сбилдить фронтенд проект.<br>
`npm start` - запускает сервер на порту 3001.<br>
`npm run dev` - запускает сервер на порту 3001 через nodemon и фронт на 3000.<br>

## Страницы 
`/shop/:category/:subCategory` - страница магазина<br>
`/rules` - страница правил<br>
`/about` - страница о сервере<br>

## Доступное API

`/api/products` - получить все продукты (вывод в json) <br>
`/api/categories` - получить все категории (вывод в json)<br>
`/api/subcategories` - получить все подкатегории (вывод в json)<br>
`/api/validatePromo?promo=` - проверяет введенный промокод, при успехе статус 200 + (вывод объекта промокода в json), при отсутствии 404, если промокод просречен или истекло кол-во использований 412.<br>
`/api/payment` - POST. Параметры id, product_id, price, status, player, email. При успехе возращает ссылку на оплату в headers.location и статус 200<br>
`/api/server/status` - возращает статусы серверов.<br>
`/api/rules` - возращает список правил сервера<br>
`/api/user-agreement` - возращает политику использования <br>
`/api/img?image_id=` - возращает картинку, используется для товаров<br>
`/api/checkPurchase?order_id=` - возращает статус заказа<br>

## Стенды
`Prod` - https://md-resorts.ru
`test` - https://test.md-resorts.ru 

# Авторы
`MildGravy0`
