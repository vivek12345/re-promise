const retryPromise = ({ fn, retries = 3, retryDelay = 0, retryOn, backOffFactor = 1, debug = false }) => {
  return new Promise((resolve, reject) => {
    const retry = ({ remainingRetries, retryDelay, e }) => {
      if (debug) {
        console.group(`Retry Attempt: ${retries - remainingRetries + 1}`);
        console.dir({
          remainingRetries: remainingRetries - 1,
          retryDelay,
          error: e
        });
        console.groupEnd();
      }
      return new Promise(res => {
        setTimeout(() => {
          return res(retryAttempt(remainingRetries - 1, retryDelay * backOffFactor));
        }, retryDelay);
      });
    };
    const retryAttempt = (remainingRetries, retryDelay) => {
      fn()
        .then(resolve)
        .catch(e => {
          if (remainingRetries > 0) {
            if (retryOn) {
              if (retryOn(e)) {
                retry({ remainingRetries, retryDelay, e });
              } else {
                return reject(e);
              }
            } else {
              retry({ remainingRetries, retryDelay, e });
            }
          } else {
            return reject(e);
          }
        });
    };
    retryAttempt(retries, retryDelay);
  });
};
export { retryPromise };
