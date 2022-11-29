import LabelApi from '../../api/label';

describe('label api test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks()
  });

  it('fetch label test', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        name: 'bug',
        color: 'bfdadc',
        description: 'this is red',
      })
    );

    const res = await LabelApi.fetchLabels();
    expect(res).toHaveProperty('name');
  });
});
