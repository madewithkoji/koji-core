import axios from 'axios';
import { Database } from './index';

jest.mock('axios');

describe('backend/database', () => {
  const testCollectionName = 'testCollection';
  const testDocumentName = 'testDocument';

  const testDocument = {
    stringKey: 'testString',
    numericKey: 100,
    booleanKey: true,
    arrayKey: ['one', 'two', 'three'],
  };

  const database = new Database({
    projectId: 'projectId',
    projectToken: 'projectToken',
  });

  it('should get a document', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: {
        document: {
          id: testDocumentName,
          ...testDocument,
        },
      },
    });

    // @ts-ignore
    const document = await database.get(testCollectionName, testDocumentName);

    expect(document).toEqual({ id: testDocumentName, ...testDocument });
  });
});
