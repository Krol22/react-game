import store from "../store";

export const throttledDispatch = (timeout, ...actions) => {
  setTimeout(() => {
    actions.forEach(action => {
      store.dispatch(action);
    });
  }, timeout);
};
