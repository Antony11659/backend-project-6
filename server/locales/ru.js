/* eslint-disable quotes */
// @ts-check

export default {
  translation: {
    appName: "Менеджер задач",
    flash: {
      session: {
        create: {
          success: "Вы залогинены",
          error: "Неправильный емейл или пароль",
        },
        delete: {
          success: "Вы разлогинены",
        },
      },
      users: {
        create: {
          error: "Не удалось зарегистрировать",
          success: "Пользователь успешно зарегистрирован",
        },
        update: {
          error: "Не удалось обновить",
          success: "Пользователь успешно обновлен",
        },
        delete: {
          error: "Не удалось удалить",
          success: "Пользователь удален",
        },
      },
      statuses: {
        create: {
          error: "Не удалось зарегистрировать",
          success: "Статус успешно зарегистрирован",
        },
        update: {
          error: "Не удалось обновить",
          success: "Статус успешно обновлен",
        },
        delete: {
          error: "Не удалось удалить",
          success: "Статус удален",
        },
      },
      labels: {
        create: {
          error: "Не удалось зарегистрировать",
          success: "Метка успешно зарегистрирована",
        },
        update: {
          error: "Не удалось обновить",
          success: "Метка успешно обновлена",
        },
        delete: {
          error: "Не удалось удалить",
          success: "Метка удалена",
        },
      },
      tasks: {
        create: {
          error: "Не удалось зарегистрировать",
          success: "Задача успешно зарегистрирована",
        },
        update: {
          error: "Не удалось обновить",
          success: "Задача успешно обновлена",
        },
        delete: {
          error:
            "Не удалось удалить! Удалить задачу может только тот пользователь, который ее создал!",
          success: "Задача удалена",
        },
      },
      authError: "Доступ запрещён! Пожалуйста, авторизируйтесь.",
      userHasTaskError: "Не удалось удалить пользователя, у него есть задача",
    },
    layouts: {
      application: {
        users: "Пользователи",
        signIn: "Вход",
        signUp: "Регистрация",
        signOut: "Выход",
        statuses: "Статусы",
        tasks: "Задачи",
        labels: "Метки",
      },
    },
    views: {
      session: {
        new: {
          signIn: {
            login: "Вход",
            email: "Почта (email)",
            password: "Пароль",
          },
          submit: "Войти",
        },
      },
      users: {
        id: "ID",
        email: "Почта",
        fullName: "Полное Имя",
        createdAt: "Дата создания",
        actions: {
          action: "Действия",
          change: "Изменить",
          delete: "Удалить",
        },
        new: {
          submit: "Сохранить",
          signUp: {
            register: "Регистрация",
            firstName: "Имя",
            lastName: "Фамилия",
            password: "Пароль",
            email: "Почта (email)",
          },
        },
      },
      statuses: {
        id: "ID",
        name: "Наименование",
        createdAt: "Дата создания",
        actions: {
          action: "Действия",
          change: "Изменить",
          delete: "Удалить",
          create: "Создать статус",
        },
        new: {
          value: "Наименование",
          creationStatus: "Создание статуса",
          button: "Создать",
        },
      },
      labels: {
        id: "ID",
        name: "Наименование",
        createdAt: "Дата создания",
        actions: {
          action: "Действия",
          change: "Изменить",
          delete: "Удалить",
          create: "Создать Метку",
        },
        new: {
          value: "Наименование",
          creationLabel: "Создание метки",
          button: "Создать",
        },
      },
      tasks: {
        id: "ID",
        name: "Наименование",
        createdAt: "Дата создания",
        creator: "Автор",
        status: "Статус",
        executor: "Исполнитель",
        label: "Метки",
        creation: "Создание задачи",
        actions: {
          action: "Действия",
          change: "Изменить задачу",
          delete: "Удалить",
          create: "Создать задачу",
        },
        new: {
          creator: "Автор",
          value: "Наименование",
          description: "Описание",
          status: "Статус",
          executor: "Исполнитель",
          label: "Метки",
          button: "Создать",
        },
      },
      welcome: {
        index: {
          hello: "Привет от Хекслета!",
          description: "Практические курсы по программированию",
          more: "Узнать Больше",
        },
      },
    },
  },
};
