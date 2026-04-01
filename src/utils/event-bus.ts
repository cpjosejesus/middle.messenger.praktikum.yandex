type EventHandler = (...args: unknown[]) => void;

export class EventBus {
  private listeners: Map<string, EventHandler[]> = new Map();

  on(event: string, callback: EventHandler): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: EventHandler): void {
    const handlers = this.listeners.get(event);
    if (!handlers) {
      throw new Error(`No event: ${event}`);
    }
    this.listeners.set(
      event,
      handlers.filter((h) => h !== callback),
    );
  }

  emit(event: string, ...args: unknown[]): void {
    const handlers = this.listeners.get(event);
    if (!handlers) {
      throw new Error(`No event: ${event}`);
    }
    handlers.forEach((handler) => handler(...args));
  }
}
