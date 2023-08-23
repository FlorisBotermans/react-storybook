import canUseDOM from './serverSide/canUseDOM';

const asyncRequestIdleCallback = async <T>(callback: () => Promise<T>): Promise<T> => {
  if (
    canUseDOM &&
    typeof window !== 'undefined' &&
    window.requestIdleCallback
  ) {
    return await new Promise((resolve, reject) => window.requestIdleCallback(async () => {
      try {
        const result = callback();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }));
  } else {
    return await callback();
  }
};
export default asyncRequestIdleCallback;