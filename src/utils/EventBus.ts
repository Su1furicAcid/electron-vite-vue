import { EventEmitter } from 'events';
/**
 * @abstract 事件总线, 用于组件间通信
 */
export const EventBus = new EventEmitter();