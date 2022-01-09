import socket from '../socket/socket';

export default {
  install: (app) => {
    app.config.globalProperties.$io = socket;
  },
};
