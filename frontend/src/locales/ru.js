export default {
  translation: {
    languages: {
      ru: 'Русский',
    },
    navbar: {
      homeLink: 'Hexlet Chat',
      logOutButton: 'Выйти',
    },
    loginAndSignUp: {
      heading: 'Войти',
      headingSignUp: 'Регистрация',
      username: 'Ваш ник',
      usernameSignUp: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      loginBtn: 'Войти',
      signupBtn: 'Зарегистрироваться',
      linkSignUp: 'Регистрация',
      footerSpan: 'Нет аккаунта?',
      errors: {
        validation: {
          required: 'Обязательное поле',
          wrongData: 'Неверные имя пользователя или пароль',
          confirmPassword: 'Пароли должны совпадать',
          nameSymbols: 'От 3 до 20 символов',
          pasMinSymbols: 'Не менее 6 символов',
          status409: 'Такой пользователь уже существует',
        },
      },
    },
    homePage: {
      heading: 'Каналы',
      channelСontrolBtn: 'Управление каналом',
      prefix: '#',
      remove: 'Удалить',
      rename: 'Переименовать',
      addChannel: '+',
      loader: 'Загрузка',
      messageCount: {
        keyWithCount_one: '{{count}} сообщение', // 1
        keyWithCount_few: '{{count}} сообщения', // для 2-4
        keyWithCount_many: '{{count}} сообщений', // для 5 и больше
        keyWithCount_other: '{{count}} сообщений', // 0, 5...
      },
      sendMessageBtn: 'Отправить',
      inputMessage: 'Введите сообщение...',
      inputLabel: 'Новое сообщение',
    },
    notFoundPage: {
      heading: 'Страница не найдена',
      body: 'Но вы можете перейти ',
      homeLink: 'на главную страницу',
    },
    modal: {
      submitBtn: 'Отправить',
      cancelBtn: 'Отменить',
      name: 'Имя канала',
      add: {
        heading: 'Добавить канал',
      },
      remove: {
        heading: 'Удалить канал',
        body: 'Уверены?',
        submitBtn: 'Удалить',
      },
      rename: {
        heading: 'Переименовать канал',
      },
      errors: {
        validation: {
          required: 'Обязательное поле',
          minMax: 'От 3 до 20 символов',
          unique: 'Должно быть уникальным',
        },
      },
    },
    toasts: {
      createChannel: 'Канал создан',
      removeChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
      fetchError: 'Ошибка сети',
      otherError: 'Ошибка в загрузке данных',
    },
  },
};
