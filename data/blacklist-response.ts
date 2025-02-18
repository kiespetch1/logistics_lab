export const blacklistResponse = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preload" as="image" href="https://example.com/informer.png">
  <link rel="stylesheet" href="/_next/static/css/app/layout.css?v=1729100500469" data-precedence="next_static/css/app/layout.css">
  <link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/webpack.js?v=1729100500469">
  <script src="/_next/static/chunks/main-app.js?v=1729100500469" async></script>
  <script src="/_next/static/chunks/app-pages-internals.js" async></script>
  <script src="/_next/static/chunks/app/page.js" async></script>
  <script src="/_next/static/chunks/app/layout.js" async></script>
  <script async src="https://aflt.market.yandex.ru/widget/script/api"></script>
  <link rel="alternate" type="application/rss+xml" title="Блог LogisticsHub DB" href="/rss/blog">
  <link rel="alternate" type="application/rss+xml" title="Подборка статей от LogisticsHub DB" href="/rss/feed-compilation">
  <title>LogisticsHub DB</title>
  <meta name="description" content="Логистика - просто">
  <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16">
  <script src="/_next/static/chunks/polyfills.js" nomodule></script>
</head>
<body class="max-w-screen flex min-h-dvh min-w-[500px] flex-col bg-slate-200">
  <div class="sticky top-0 z-50">
    <header class="z-30 flex flex-col items-center justify-between gap-2 bg-teal-500 px-[10%] pb-2.5 pt-1.5 text-white shadow-md md:flex-row">
      <div class="flex items-center gap-3">
        <a href="/"><h1 class="header whitespace-nowrap">LogisticsHub DB</h1></a>
        <span class="hidden text-xl sm:block md:hidden lg:block">/</span>
        <p class="hidden whitespace-nowrap text-xl sm:block md:hidden lg:block">Логистика - просто</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="grow"></div>
        <!-- Поисковая форма можно заменить на специализированный виджет -->
        <div class="ya-site-form ya-site-form_inited_no min-w-40 max-w-72" data-bem='{"action":"/search","arrow":false,"bg":"transparent","fontsize":12,"fg":"#000000","language":"ru","logo":"rb","publicname":"Поиск по LogisticsHub DB","suggest":true,"target":"_self","tld":"ru","type":2,"usebigdictionary":true,"searchid":10700152,"input_fg":"#ffffff","input_bg":"#14b8a6","input_fontStyle":"normal","input_fontWeight":"normal","input_placeholder":"Поиск по сайту","input_placeholderColor":"#dddddd","input_borderColor":"#ffffff"}'>
          <form accept-charset="utf-8" action="https://yandex.ru/search/site/" method="get" target="_self">
            <input type="hidden" class="hidden" name="searchid" value="10700152">
            <input type="hidden" class="hidden" name="l10n" value="ru">
            <input type="hidden" class="hidden" name="reqenc" value="">
            <input type="search" class="hidden" name="text" value="">
            <input type="submit" class="hidden" value="Найти">
          </form>
        </div>
        <form enctype="multipart/form-data" method="POST">
          <input type="hidden" name="$ACTION_ID_c26ad7a0978916b633d881586213b792a012f3fb">
          <button class="py-1 hover:bg-teal-400">Выйти</button>
        </form>
      </div>
    </header>
    <nav>
      <ul class="flex bg-slate-200 px-[10%]">
        <li class="relative z-40 grow basis-0 rounded-b transition-colors hover:bg-slate-300 !bg-teal-500 text-white shadow-md">
          <a class="block w-full px-2 pb-1 pt-0.5 text-center" href="/">Главная</a>
        </li>
        <li class="relative z-40 grow basis-0 rounded-b transition-colors hover:bg-slate-300">
          <p class="cursor-pointer px-2 pb-1 pt-0.5 text-center">Блог</p>
          <ul class="absolute left-0 top-full flex max-h-0 min-h-0 w-full flex-col overflow-hidden rounded bg-slate-300 text-black shadow-lg transition-all [:hover>&]:max-h-96">
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/blog">Все статьи</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center truncate whitespace-nowrap" href="/blog/transport-flows">Транспортные потоки: управление и оптимизация</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center truncate whitespace-nowrap" href="/blog/supply-chain">Современные цепочки поставок</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center truncate whitespace-nowrap" href="/blog/logistics-tech">Технологии в логистике</a>
            </li>
          </ul>
        </li>
        <li class="relative z-40 grow basis-0 rounded-b transition-colors hover:bg-slate-300">
          <p class="cursor-pointer px-2 pb-1 pt-0.5 text-center">Поиск</p>
          <ul class="absolute left-0 top-full flex max-h-0 min-h-0 w-full flex-col overflow-hidden rounded bg-slate-300 text-black shadow-lg transition-all [:hover>&]:max-h-96">
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/search/shipping">Поиск перевозок</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/search/warehouses">Поиск складов</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/search/routes">Поиск маршрутов</a>
            </li>
          </ul>
        </li>
        <li class="relative z-40 grow basis-0 rounded-b transition-colors hover:bg-slate-300">
          <p class="cursor-pointer px-2 pb-1 pt-0.5 text-center">Администрирование</p>
          <ul class="absolute left-0 top-full flex max-h-0 min-h-0 w-full flex-col overflow-hidden rounded bg-slate-300 text-black shadow-lg transition-all [:hover>&]:max-h-96">
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/add/shipping">Добавление перевозок</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/add/warehouses">Добавление складов</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/add/routes">Добавление маршрутов</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/delete/shipping">Удаление перевозок</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/delete/warehouses">Удаление складов</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/delete/routes">Удаление маршрутов</a>
            </li>
          </ul>
        </li>
        <li class="relative z-40 grow basis-0 rounded-b transition-colors hover:bg-slate-300">
          <p class="cursor-pointer px-2 pb-1 pt-0.5 text-center">Другое</p>
          <ul class="absolute left-0 top-full flex max-h-0 min-h-0 w-full flex-col overflow-hidden rounded bg-slate-300 text-black shadow-lg transition-all [:hover>&]:max-h-96">
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/profile">Мой профиль</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/widgets">Виджеты</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/rss/blog/preview">RSS - блог</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/rss/feed-compilation/preview">RSS - подборка статей</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/regions">Регионы доставки</a>
            </li>
            <li class="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50">
              <a class="block px-2 pb-1 pt-0.5 text-center" href="/stats">Статистика по БД</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
  <main class="overflow-show mx-auto flex w-full max-w-[110rem] grow flex-col px-[10%]">
    <div>
      <h1 class="mb-6 mt-10 flex flex-col">
        <span class="text-center text-3xl text-slate-600">Добро пожаловать на</span>
        <span class="text-center text-5xl font-semibold text-slate-600">LogisticsHub DB!</span>
      </h1>
      <p role="contentinfo" class="mb-10 px-[10%] text-center leading-7">
        На этом сайте представлена подробная информация о современных решениях в области логистики! Мы предоставляем удобный поиск по
        <span class="rounded border-2 border-slate-400 px-1 pb-1">перевозкам</span>,
        <span class="rounded border-2 border-slate-400 px-1 pb-1">складированию</span> и
        <span class="rounded border-2 border-slate-400 px-1 pb-1">управлению цепочками поставок</span>.
        Информация берётся из проверенных источников и обновляется регулярно.
      </p>
      <hr class="mx-[10%] mt-14 border-t-[1.5px] border-slate-400">
      <section>
        <h2 class="mb-8 mt-10 text-center text-3xl font-semibold text-slate-600">Последние статьи</h2>
        <div class="mb-6">
          <button class="w-full border border-slate-500 bg-slate-100 px-6 pb-6 pt-8 text-left transition-all hover:-translate-y-1 hover:bg-slate-200 hover:shadow-md [&:hover_span]:underline">
            <span class="mb-2.5 text-2xl font-semibold text-slate-600">Транспортные потоки: структура и управление</span>
            <span class="text-justify">
              Транспортные потоки являются ключевым элементом современной логистики. Эффективное управление потоками грузов позволяет минимизировать затраты и оптимизировать работу складов. Здесь мы рассмотрим основные методы анализа и оптимизации транспортных процессов...
              <span class="text-teal-700">Читать дальше</span>
            </span>
            <span class="text-right text-sm text-slate-400">07.10.2024 в 03:00</span>
          </button>
        </div>
        <div class="mb-6">
          <button class="w-full border border-slate-500 bg-slate-100 px-6 pb-6 pt-8 text-left transition-all hover:-translate-y-1 hover:bg-slate-200 hover:shadow-md [&:hover_span]:underline">
            <span class="mb-2.5 text-2xl font-semibold text-slate-600">Современные цепочки поставок: вызовы и решения</span>
            <span class="text-justify">
              Цепочки поставок играют важную роль в успехе бизнеса. В этой статье мы анализируем современные тенденции и решения, позволяющие обеспечить устойчивость и эффективность цепочки поставок от производства до доставки конечному потребителю...
              <span class="text-teal-700">Читать дальше</span>
            </span>
            <span class="text-right text-sm text-slate-400">06.10.2024 в 03:00</span>
          </button>
        </div>
        <div class="mb-6">
          <button class="w-full border border-slate-500 bg-slate-100 px-6 pb-6 pt-8 text-left transition-all hover:-translate-y-1 hover:bg-slate-200 hover:shadow-md [&:hover_span]:underline">
            <span class="mb-2.5 text-2xl font-semibold text-slate-600">Технологии в логистике: автоматизация и цифровизация</span>
            <span class="text-justify">
              Цифровизация логистических процессов позволяет значительно повысить эффективность работы. От автоматизированного планирования до мониторинга грузоперевозок в режиме реального времени — узнайте о современных технологиях, применяемых в логистике...
              <span class="text-teal-700">Читать дальше</span>
            </span>
            <span class="text-right text-sm text-slate-400">05.10.2024 в 03:00</span>
          </button>
        </div>
      </section>
      <div class="grid grid-cols-2 gap-4 px-[10%]">
        <button class="border-slate-400 hover:bg-slate-300">Показать все статьи</button>
        <button class="border-slate-400 hover:bg-slate-300">Подписаться на RSS-фид блога</button>
      </div>
      <hr class="mx-[10%] mt-14 border-t-[1.5px] border-slate-400">
      <h2 class="mb-8 mt-10 text-center text-3xl font-semibold text-slate-600">Инструменты базы данных</h2>
      <section class="mb-6 flex flex-col gap-10">
        <div class="rounded-xl border-[1.5px] border-dashed border-slate-400 bg-slate-100 px-4 pb-4 pt-3">
          <h3 class="mx-auto -mt-7 mb-1 w-1/3 max-w-[15rem] rounded-full border border-slate-500 bg-slate-100 py-0.5 text-center font-semibold text-slate-500 shadow-lg">Поиск</h3>
          <ul class="flex">
            <li class="flex grow basis-0 justify-center rounded-lg transition-colors hover:bg-slate-200">
              <a class="grow p-3 text-center" href="/search/shipping">Поиск перевозок</a>
            </li>
            <li class="flex grow basis-0 justify-center rounded-lg transition-colors hover:bg-slate-200">
              <a class="grow p-3 text-center" href="/search/warehouses">Поиск складов</a>
            </li>
            <li class="flex grow basis-0 justify-center rounded-lg transition-colors hover:bg-slate-200">
              <a class="grow p-3 text-center" href="/search/routes">Поиск маршрутов</a>
            </li>
          </ul>
        </div>
        <div class="rounded-xl border-[1.5px] border-dashed border-slate-400 bg-slate-100 px-4 pb-4 pt-3">
          <h3 class="mx-auto -mt-7 mb-1 w-1/3 max-w-[15rem] rounded-full border border-slate-500 bg-slate-100 py-0.5 text-center font-semibold text-slate-500 shadow-lg">Добавление</h3>
          <ul class="flex">
            <li class="flex grow basis-0 justify-center rounded-lg transition-colors hover:bg-slate-200">
              <a class="grow p-3 text-center" href="/add/shipping">Добавление перевозок</a>
            </li>
            <li class="flex grow basis-0 justify-center rounded-lg transition-colors hover:bg-slate-200">
              <a class="grow p-3 text-center" href="/add/warehouses">Добавление складов</a>
            </li>
            <li class="flex grow basis-0 justify-center rounded-lg transition-colors hover:bg-slate-200">
              <a class="grow p-3 text-center" href="/add/routes">Добавление маршрутов</a>
            </li>
          </ul>
        </div>
        <div class="rounded-xl border-[1.5px] border-dashed border-slate-400 bg-slate-100 px-4 pb-4 pt-3">
          <h3 class="mx-auto -mt-7 mb-1 w-1/3 max-w-[15rem] rounded-full border border-slate-500 bg-slate-100 py-0.5 text-center font-semibold text-slate-500 shadow-lg">Удаление</h3>
          <ul class="flex">
            <li class="flex grow basis-0 justify-center rounded-lg transition-colors hover:bg-slate-200">
              <a class="grow p-3 text-center" href="/delete/shipping">Удаление перевозок</a>
            </li>
            <li class="flex grow basis-0 justify-center rounded-lg transition-colors hover:bg-slate-200">
              <a class="grow p-3 text-center" href="/delete/warehouses">Удаление складов</a>
            </li>
            <li class="flex grow basis-0 justify-center rounded-lg transition-colors hover:bg-slate-200">
              <a class="grow p-3 text-center" href="/delete/routes">Удаление маршрутов</a>
            </li>
          </ul>
        </div>
        <div class="rounded-xl border-[1.5px] border-dashed border-slate-400 bg-slate-100 px-4 pb-4 pt-3">
          <h3 class="mx-auto -mt-7 mb-1 w-1/3 max-w-[15rem] rounded-full border border-slate-500 bg-slate-100 py-0.5 text-center font-semibold text-slate-500 shadow-lg">Статистика</h3>
          <ul class="flex">
            <li class="flex grow basis-0 justify-center rounded-lg transition-colors hover:bg-slate-200">
              <a class="grow p-3 text-center" href="/stats">Статистика</a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </main>
  <footer class="flex items-center justify-between gap-2 bg-slate-500 px-[10%] py-4 text-white/60 shadow-lg">
    <div>
      <p>© 2024 LogisticsHub DB.</p>
      <p>Разработчик сайта: Черемисинов Егор, ИАТЭ НИЯУ МИФИ, группа ИВТ-Б21</p>
    </div>
    <a href="https://example.com/metrics" target="_blank" rel="nofollow">
      <img src="https://example.com/informer.png" style="width: 88px; height: 31px; border: 0" alt="Метрика" title="Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" class="ym-advanced-informer">
    </a>
  </footer>
  <div class="Toastify"></div>
  <script src="/_next/static/chunks/webpack.js?v=1729100500469" async></script>
  <script>
    (self.__next_f = self.__next_f || []).push([0]);
    self.__next_f.push([2, null]);
  </script>
</body>
</html>
`;