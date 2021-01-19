import { generateConfig } from './index';

describe('backend/base', () => {
  it('throws an error if a response object is supplied without passing through the middleware', () => {
    expect(() => {
      // @ts-ignore
      generateConfig({ res: {} });
    }).toThrow(
      'The res.locals object is missing your project information. Have you implemented KojiBackend.middleware correctly?',
    );
  });

  it('passes project details correctly from a res that has passed through the middleware', () => {
    const { projectId, projectToken } = generateConfig({
      // @ts-ignore
      res: {
        locals: {
          KOJI_PROJECT_ID: 'testId',
          KOJI_PROJECT_TOKEN: 'testToken',
        },
      },
    });

    expect(projectId).toBe('testId');
    expect(projectToken).toBe('testToken');
  });

  it('throws an error if there is no response object and project details are not explicitly passed', () => {
    expect(() => {
      generateConfig({});
    }).toThrow('Unable to find project details');
  });

  it('passes project details correctly from explicitly passed parameters', () => {
    const { projectId, projectToken } = generateConfig({
      projectId: 'testId',
      projectToken: 'testToken',
    });

    expect(projectId).toBe('testId');
    expect(projectToken).toBe('testToken');
  });
});
