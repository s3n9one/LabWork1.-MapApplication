## Лабораторная работа №1.
# Инструкция по установке
Шаг 1: Установка Node.js и npm
Перейдите на официальный сайт Node.js.

Скачайте и установите последнюю стабильную версию Node.js

Шаг 2: Установка Expo CLI
Откройте терминал (или командную строку).

Установите Expo CLI глобально с помощью npm:

npm install -g expo-cli

Шаг 3: Создание нового проекта
В терминале выполните команду для создания нового проекта:

expo init MyNewProject

Выберите шаблон проекта (например, "blank" для пустого проекта).

Перейдите в папку проекта:

cd MyNewProject

Шаг 4: Установка Expo Go на устройство
Скачайте приложение Expo Go из магазина приложений:

Для iOS: App Store

Для Android: Google Play

Убедитесь, что ваше устройство и компьютер находятся в одной сети Wi-Fi.

Шаг 5: Запуск проекта
В терминале запустите проект:

npm start

или

expo start

Откроется веб-интерфейс Expo Dev Tools с QR-кодом.

Откройте приложение Expo Go на вашем устройстве и отсканируйте QR-код с помощью камеры.

Шаг 6: Разработка и тестирование
После сканирования QR-кода ваш проект запустится в приложении Expo Go.

## Отчет по работе.

Разработано мобильное приложение "Карта с маркерами" на React Native с использованием Expo. Приложение позволяет:

- Добавлять маркеры на карту долгим нажатием.

- Просматривать детали маркера, включая координаты и прикрепленные изображения.

- Добавлять и удалять изображения для каждого маркера.

## Принятые решения и реализованные функции

Использование кастомного маркера:
Вместо стандартного маркера react-native-maps использовано кастомное изображение. Изображение маркера загружено из локальных ресурсов (require('../assets/images/mark.png')). Стилизация маркера выполнена с помощью resizeMode="contain", чтобы убрать лишний фон.

Управление состоянием маркеров:
Для управления состоянием маркеров использован массив markers, хранящийся в состоянии компонента Home. Функции addMarker и updateMarker позволяют добавлять и обновлять маркеры.

Добавление и удаление изображений:
Реализована функция добавления изображений через expo-image-picker. Реализована функция удаления изображений из маркера.

Передача данных между экранами:
Для передачи данных между экранами использованы параметры маршрута (useLocalSearchParams и useRouter). Массив markers и функция updateMarker передаются через параметры маршрута.

Известные проблемы:
При выходе из маркера, изображение удаляется. Проблема с сохранением изображений в маркерах возникает из-за того, что изменения, внесенные в маркер (например, добавление изображений), не сохраняются в глобальном состоянии. В React состояние компонента (useState) существует только во время жизни этого компонента. Когда компонент размонтируется (например, при переходе на другой экран), его состояние теряется. 

Было найдено два решения данной проблемы: 
1. Использование Contex API. Context API позволяет сохранять изменения между компонентами.
2. Использование локального хранилища. Локальное хранилище (например, AsyncStorage) сохраняет данные даже после закрытия приложения. Это позволяет сохранять изменения в маркерах и изображениях. Данные из локального хранилища могут быть загружены в любом компоненте, что делает их доступными даже после перехода между экранами. Локальное хранилище позволяет синхронизировать состояние между компонентами без необходимости передачи данных через пропсы или маршрутизацию.
Оба перечисленных решения будут реализованы в рамках Лабораторной работы №2.
