export const loggerMiddleware =  (store) => (next) => (action) => {
  if(!action.type) {
    return next(action);
  }
  //동기식

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  //reducer에 action을 보낸다
  next(action);

  console.log('next state: ', store.getState());
}