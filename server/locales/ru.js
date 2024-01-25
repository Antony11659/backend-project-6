// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        update: {
          error: 'Не удалось обновить',
          success: 'Пользователь успешно обновлен',
        },
        delete: {
          error: 'Не удалось удалить',
          success: 'Пользователь удален',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      session: {
        new: {
          signIn: {
            login: 'Вход',
            email: 'Почта (email)',
            password: 'Пароль',
          },
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        email: 'Почта',
        fullName: 'Полное Имя',
        createdAt: 'Дата создания',
        actions: {
          action: 'Действия',
          change: 'Изменить',
          delete: 'Удалить',
        },
        new: {
          submit: 'Сохранить',
          signUp: {
            register: 'Регистрация',
            firstName: 'Имя',
            lastName: 'Фамилия',
            password: 'Пароль',
            email: 'Почта (email)',
          },
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
    },
  },
};
