# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Лабораторная работа №1.

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