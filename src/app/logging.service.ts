import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  lastMessage: string;
  constructor() {}
  log(message: string) {
    console.log(message);
    console.log(this.lastMessage);
    this.lastMessage = message;
  }
}
