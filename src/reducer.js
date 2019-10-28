export function numberReducer(observer, value, action) {
  switch (action.type) {
    case 'plus':
      setTimeout(() => {
        observer.next(value + 1);
      }, 500)
      break;
    case 'minus':
      observer.next(value - 1);
      break;
  }
}