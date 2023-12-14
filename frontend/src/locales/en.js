export default {
  translation: {
    noAccount: "Don't have an account?",
    signup: 'Sign up',
    notFoundPage: {
      pageNotFound: 'Page not found',
      youcan: 'But ypu can go',
      mainPage: 'to the home page',
    },
    headers: {
      login: 'Log in',
      signup: 'Sign up',
    },
    buttons: {
      login: 'Log in',
      signup: 'Sign up',
      logout: 'Log out',
      send: 'Send',
      remove: 'Remove',
      cancel: 'Calncel',
    },
    chat: {
      channels: 'Channels',
      counter: {
        count_one: '{{count}} message',
        count_other: '{{count}} messages',
      },
    },
    placeholders: {
      username: 'Username',
      nickname: 'Your nickname',
      password: 'Password',
      passwordsMatch: 'Passwords must match',
      passwordConfirm: 'Confirm password',
      message: 'Enter message...',
      channelName: 'Channel name',
      newMessage: 'New message',
    },
    errors: {
      wrongUserOfPassword: 'Invalid username or password',
      userExists: 'This user already exists',
      required: 'Required field',
      mustBeUnique: 'Must be unique',
      passwordsMatch: 'Passwords must match',
      channelName: {
        counter: {
          count_one: 'From {{minCount}} to {{maxCount}} symbol',
          count_few: 'From {{minCount}} to {{maxCount}} symbols',
          count_many: 'From {{minCount}} to {{maxCount}} symbols',
        },
      },
      username: {
        counter: {
          count_one: 'From {{minCount}} to {{maxCount}} symbol',
          count_few: 'From {{minCount}} to {{maxCount}} symbols',
          count_many: 'From {{minCount}} to {{maxCount}} symbols',
        },
      },
      password: {
        counter: {
          count_one: 'At least {{count}} symbol',
          count_few: 'At least {{count}} symbols',
          count_many: 'At least {{count}} symbols',
        },
      },
    },
    modals: {
      addChannel: 'Add channel',
      removeChannel: 'Remove channel',
      renameChannel: 'Rename channel',
      wentWrong: 'Something went wrong, try later',
      sure: 'Are you sure?',
    },
    controls: {
      remove: 'Remove',
      rename: 'Rename',
    },
    notifications: {
      channelAdded: 'Channel created',
      channelRenamed: 'Channel renamed',
      channelRemoved: 'Channel removed',
      channelAddFail: 'Error while creating a channel',
      channelRenameFail: 'Error while renaming a channel',
      channelRemoveFail: 'Error when removing a channel',
      messageAddFail: 'Error while sending a message',
      wentWrong: 'Something went wrong, try again later',
      fetchFail: 'Error while loading data, try again later',
    },
  },
};
