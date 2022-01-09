import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      name: '',
    };
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
  },
  actions: {
    setName(context, { name }) {
      context.dispatch('setName', name);
    },
  },
});

export default store;
