import { db, ref, push, set } from "./firebase";

export async function logError(module, message, error) {
  try {
    const logRef = ref(db, 'logs/');
    const newLogRef = push(logRef);
    await set(newLogRef, {
      module,
      message,
      error: error.toString(),
      timestamp: new Date().toISOString()
    });
    console.log('Error logged:', { module, message, error });
  } catch (loggingError) {
    console.error('Error logging the original error:', loggingError);
  }
}
