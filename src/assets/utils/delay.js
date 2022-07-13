export function delay(callback, time = 500) {
  setTimeout(() => {
    callback();
  }, time);
}
