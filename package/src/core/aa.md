### монтаж

создаётся контекст (?)
в нём создаётся чип. это на плечах контекста.
Чип возвращается

Создание контекста - настройка всех хуков. Я в этом контексте при создании сразу указываю, что по этому адресу входит. Откуда инфу беру? Нужен ещё слой абстракции - поле. Оно реактивно? Не знаю. Оно нужно для:

-   получить данные о том, что сейчас входящего по адресу есть.
-   сообщить, что один адрес излучает туда-то

### нахуй это всё

Сделаю самым тупым и прямым путём, без оптимизации. Прямые вычисляемые свойства. В клетке есть received - это computed от того, что приходит в эту клетку. Хер с ним, что оно будет перевычисляться каждый раз через весь массив данных. Ещё клетка выдаёт emitted - это реактивная величина. От неё можно создать computed с трансляцией, куда именно поступает сигнал. Или даже можно без этого всего. Без трансляций, без каких-либо оптимизаций, пока что. Пусть прямо так прямо вычисляется каждый раз.
