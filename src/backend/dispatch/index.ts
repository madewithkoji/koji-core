import { Response } from 'express';

export class Dispatch {
  private projectId: string;
  private projectToken: string;

  constructor(res: Response) {
    this.projectId = res.locals.projectId || process.env.KOJI_PROJECT_ID;
    this.projectToken = res.locals.projectToken || process.env.KOJI_PROJECT_TOKEN;
  }
}

export interface IDispatch extends Dispatch {}
