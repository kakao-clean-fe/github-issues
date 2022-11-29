import IssueApi from '../../api/issue';

describe('issue api test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks()
  });

  it('fetch issues test', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      title: 'new issue',
      _id: 123,
      tags: [
        {
          tagName: 'bug',
          color: 'brown',
        },
        {
          tagName: 'document',
          color: 'blue',
        },
      ],
      status: 'open',
      'open-date': '6hours',
      creator: 'crongro',
      projects: '',
      milestones: 'sprint2',
      assignee: 'crong',
      subtask: ['loream', 'loreamlorem'],
      'comments-count': 4,
    }));

    const res = await IssueApi.fetchIssues();
    expect(res).toHaveProperty('_id');
  });
});
