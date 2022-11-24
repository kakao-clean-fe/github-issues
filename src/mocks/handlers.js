import {rest} from 'msw';
import {removeItem} from "../libs/utils.js";

const countIssues = (labelName) => issues
  .filter(({tags}) => tags.map(({tagName}) => tagName).includes(labelName))
  .length
const getLabels = (search) => {
  let items = labels
  if (search) {
    items = items.filter(
      label =>
        label.name.includes(search)
        || label.description.includes(search)
    )
  }
  return items.map((label) => ({...label, count: countIssues(label.name)}))
}
const isLabelIdExists = (id) => !!labels.find(label => label.id === id)
const isLabelNameExists = (name) => !!labels.find(label => label.name === name)

export const handlers = [
  rest.get('/issues', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(issues));
  }),
  rest.get('/labels', (req, res, ctx) => {
    const search = req.url.searchParams.get('search')
    console.log('search', search)
    return res(ctx.status(200), ctx.json(getLabels(search)));
  }),
  rest.get('/labels-delay', async (req, res, ctx) => {
    await new Promise((resolve) => setTimeout(() => resolve(), 5000));
    return res(ctx.status(200), ctx.json(getLabels()));
  }),
  rest.post('/labels', async (req, res, ctx) => {
    const newData = await req.json();
    // if (Math.floor(Math.random() * 10) > 5) {
    //   return res(ctx.status(500), ctx.json({"error": "서버에러 발생"}));
    // }
    if (isLabelNameExists(newData.name)) {
      return res(ctx.status(409), ctx.json({"error": "already exists"}))
    }
    labels.push(newData);
    return res(ctx.status(201), ctx.json({result: "OK"}));
  }),

  rest.put('/labels/:labelId', async (req, res, ctx) => {
    const {labelId} = req.params
    const {name, color, description} = await req.json();
    const originLabel = labels.find(label => label.id === Number(labelId))
    if (isLabelIdExists(labelId)) {
      return res(ctx.status(400), ctx.json({"error": "no such label"}))
    }
    if (originLabel.name !== name && isLabelNameExists(name)) {
      return res(ctx.status(409), ctx.json({"error": "already exists"}))
    }
    originLabel.name = name
    originLabel.color = color
    originLabel.description = description
    return res(ctx.status(200), ctx.json({result: "OK"}));
  }),
  rest.delete('/labels/:labelId', (req, res, ctx) => {
    const {labelId} = req.params
    if (isLabelIdExists(labelId)) {
      return res(ctx.status(400), ctx.json({"error": "no such label"}))
    }
    removeItem(labels, (label) => label.id === Number(labelId))
    return res(ctx.status(200), ctx.json({result: "OK"}));
  })
];

const issues = [
  {
    "title": "new issue",
    "_id": 123,
    "tags": [
      {"tagName": "bug", "color": "brown"},
      {"tagName": "document", "color": "blue"}
    ],
    "status": "open",
    "open-date": "6hours",
    "creator": "crongro",
    "projects": "",
    "milestones": "sprint2",
    "assignee": "crong",
    "subtask": ["loream", "loreamlorem"],
    "comments-count": 4
  },

  {
    "title": "new issue 124",
    "_id": 124,
    "tags": [
      {"tagName": "bug", "color": "brown"},
      {"tagName": "document", "color": "green"}
    ],
    "status": "close",
    "open-date": "6hours",
    "creator": "crongro",
    "projects": "",
    "milestones": "sprint2",
    "assignee": "crong",
    "subtask": ["loream", "loreamlorem"],
    "comments-count": 4
  },

  {
    "title": "new issue 126",
    "_id": 125,
    "tags": [
      {"tagName": "feature", "color": "black"},
      {"tagName": "backend", "color": "red"}
    ],
    "status": "open",
    "open-date": "3hours",
    "creator": "crongro",
    "projects": "",
    "milestones": "",
    "assignee": "crong",
    "subtask": ["loream", "loreamlorem"],
    "comments-count": 4
  },
  {
    "title": "research : lorem...",
    "_id": 129,
    "tags": [],
    "status": "open",
    "open-date": "3hours",
    "creator": "honux",
    "projects": "",
    "milestones": "",
    "assignee": "crong",
    "subtask": [],
    "comments-count": 0
  }
]


const labels = [
  {id: 1, name: "bug", color: "bfdadc", description: "this is red"},
  {id: 2, name: "documentation", color: "0075ca", description: "this is documetation"},
  {id: 3, name: "enhancement", color: "a2eeef", description: "this is enhancement"},
  {id: 4, name: "question", color: "d876e3", description: "this is question"},
  {id: 5, name: "invalid", color: "e4e669", description: "this is not valid"},
  {id: 6, name: "duplicate", color: "cfd3d7", description: "this is dulicate"}
]
