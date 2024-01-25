// @ts-check

export default {
  translation: {
    appName: 'Fastify Boilerplate',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        update: {
          error: 'Failed to update User',
          success: 'User updated successfully',
        },
        delete: {
          error: 'Failed to delete',
          success: 'User deleted',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
      },
    },
    views: {
      session: {
        new: {
          signIn: {
            login: 'Login',
            email: 'email',
            password: 'password',
          },
          submit: 'Login',
        },
      },
      users: {
        id: 'ID',
        email: 'Email',
        fullName: 'Full Name',
        actions: {
          action: 'Actions',
          change: 'Сhange',
          delete: 'Delete',
        },
        createdAt: 'Created at',
        new: {
          submit: 'Register',
          signUp: {
            register: 'Register',
            firstName: 'firstName',
            lastName: 'lastName',
            password: 'password',
            email: 'email',
          },
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
    },
  },
};
