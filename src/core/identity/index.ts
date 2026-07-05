import { v4 as uuidv4 } from 'uuid';

export class Identity {
  static generateId(): string {
    return uuidv4();
  }

  static generateSessionId(): string {
    return `sess_${uuidv4()}`;
  }

  static generateDeviceId(): string {
    return `dev_${uuidv4()}`;
  }

  static generateTransactionId(): string {
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
