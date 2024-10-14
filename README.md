# myAuth
cd frontend
npm install react react-dom typescript axios tailwindcss
npx tsc --init
npx tailwindcss init

cd ../backend
npm install express cors typescript
npx tsc --init

Технологии для фронтенда:
React — основной фреймворк для пользовательского интерфейса.✅
Tailwind CSS — для стилизации.✅
Axios — для отправки запросов к серверу.✅
React Router — для маршрутизации страниц (логин, регистрация, профиль).
Formik/Yup — для работы с формами и валидацией данных.
JWT (JSON Web Tokens) — для хранения и отправки токенов аутентификации в заголовках запросов.

2. Технологии для бэкенда:
Node.js/Express — серверная платформа и фреймворк.✅
TypeScript — для типизации.✅
bcrypt — для хэширования паролей.
jsonwebtoken — для работы с JWT токенами.
nodemailer — для отправки писем (восстановление пароля).
PostgreSQL — база данных для хранения данных пользователей.
Mongoose/Sequelize — ORM для работы с базой данных (в зависимости от того, MongoDB или PostgreSQL ты выберешь).
express-validator — для валидации данных на сервере.
dotenv — для работы с переменными окружения (например, для конфиденциальных данных как API-ключи).
cors — для обеспечения безопасности запросов между клиентом и сервером.✅