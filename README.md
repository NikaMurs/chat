# Chat  ![CI](https://github.com/NikaMurs/chat/actions/workflows/web.yml/badge.svg) 

Это небольшой веб-сайт с чатом, где пользователи могут общаться между собой.

## Демонстрация

Чтобы увидеть проект в действии, вы можете посетить [сайт проекта](https://nikamurs.github.io/chat/). 
Обратите внимание, что для запуска сервиса может потребоваться немного времени (1-2 минуты), так как бэкенд размещен на [render.com](https://render.com/).

## Функционал

- Регистрация: При загрузке страницы появляется всплывающее окно, в котором пользователь должен ввести свой никнейм. Если никнейм свободен, пользователь будет зарегистрирован в чате. В противном случае, он увидит сообщение о том, что никнейм уже занят, и ему нужно выбрать другой.

- Чат: После успешной регистрации пользователь попадает в окно чата. В этом окне слева отображается список всех участников чата, включая себя. Если появляется новый участник или кто-то покидает чат, информация обновляется автоматически.

- Обмен сообщениями: Пользователи могут обмениваться сообщениями в режиме реального времени благодаря использованию WebSocket. Сообщения передаются моментально.

## Технологии

- HTML
- CSS
- JavaScript
- WebSocket

