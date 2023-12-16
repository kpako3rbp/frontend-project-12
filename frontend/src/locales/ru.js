export default {
  translation: {
    noAccount: 'Нет аккаунта?',
    signup: 'Регистрация',
    notFoundPage: {
      pageNotFound: 'Страница не найдена',
      youcan: 'Но вы можете перейти',
      mainPage: 'на главную страницу',
    },
    headers: {
      login: 'Войти',
      signup: 'Регистрация',
    },
    buttons: {
      login: 'Войти',
      signup: 'Зарегистрироваться',
      logout: 'Выйти',
      send: 'Отправить',
      remove: 'Удалить',
      cancel: 'Отменить',
      manageChannel: 'Управление каналом',
    },
    chat: {
      channels: 'Каналы',
      counter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
    placeholders: {
      username: 'Имя пользователя',
      nickname: 'Ваш ник',
      password: 'Пароль',
      passwordsMatch: 'Пароли должны совпадать',
      confirmPassword: 'Подтвердите пароль',
      message: 'Введите сообщение...',
      channelName: 'Имя канала',
      newMessage: 'Новое сообщение',
    },
    errors: {
      wrongUserOfPassword: 'Неверные имя пользователя или пароль',
      userExists: 'Такой пользователь уже существует',
      required: 'Обязательное поле',
      mustBeUnique: 'Должно быть уникальным',
      passwordsMatch: 'Пароли должны совпадать',
      channelName: {
        counter: {
          count_one: 'От {{minCount}} до {{maxCount}} символа',
          count_few: 'От {{minCount}} до {{maxCount}} символов',
          count_many: 'От {{minCount}} до {{maxCount}} символов',
        },
      },
      username: {
        counter: {
          count_one: 'От {{minCount}} до {{maxCount}} символа',
          count_few: 'От {{minCount}} до {{maxCount}} символов',
          count_many: 'От {{minCount}} до {{maxCount}} символов',
        },
      },
      password: {
        counter: {
          count_one: 'Не менее {{count}} символа',
          count_few: 'Не менее {{count}} символов',
          count_many: 'Не менее {{count}} символов',
        },
      },
    },
    modals: {
      addChannel: 'Добавить канал',
      removeChannel: 'Удалить канал',
      renameChannel: 'Переименовать канал',
      wentWrong: 'Ошибка соединения',
      sure: 'Уверены?',
    },
    controls: {
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    notifications: {
      channelAdded: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удалён',
      channelAddFail: 'Ошибка при создании канала',
      channelRenameFail: 'Ошибка при переименовании канала',
      channelRemoveFail: 'Ошибка при удалении канала',
      messageAddFail: 'Ошибка при отправке сообщения',
      wentWrong: 'Ошибка соединения',
      fetchFail: 'Ошибка соединения',
    },
  },
};
