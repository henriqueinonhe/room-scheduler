/**
 * Wrapper so that one doesn't need to keep spamming
 * try/catch blocks everywhere, given that express
 * doesn't natively treat exceptions thrown by async functions.
 * 
 * @param {*} method Actual controller method
 */
export function controllerMethodWrapper(method) {
  return async (req, res, next) => {
    try {
      await method(req, res, next);
    }
    catch(error) {
      next(error);
      return;
    }
  }
}