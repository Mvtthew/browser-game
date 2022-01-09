enum LogLevel {
  'MESSAGE'
}

export default class Logger {
  public static Log(...messages: [string]): void {
    // eslint-disable-next-line no-console
    console.log(...messages);
  }
}
