import { server } from '../@decorators/server';

export class Database {
  setProjectValues: Function;

  constructor(setProjectValues: Function) {
    this.setProjectValues = setProjectValues;
  }

  /**
   * Tells you hello.
   */
  get() {
    return 'hello';
  }

  set() {
    this.setProjectValues('test', 'testTwo');
  }
}

export interface IDatabase extends Database {}
