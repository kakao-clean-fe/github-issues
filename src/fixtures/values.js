export const issues = [{
	"title": "new issue",
	"_id": 123,
	"tags": [{
		"tagName": "bug",
		"color":"brown"
	}, {
		"tagName": "document",
		"color":"blue"
	}],
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
	"tags": [{
		"tagName": "bug",
		"color":"brown"
	}, {
		"tagName": "document",
		"color":"green"
	}],
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
	"tags": [{
		"tagName": "feature",
		"color":"black"
	}, {
		"tagName": "backend",
		"color":"red"
	}],
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
];


export const labels =[
    {
        "name":"bug",
        "color":"ff0000",
        "description":"this is red"
    },
    {
        "name":"documentation",
        "color":"22c55e",
        "description":"this is documetation"
    },
    {
        "name":"enhancement",
        "color":"fde047",
        "description":"this is enhancement"
    },
    {
        "name":"question",
        "color":"eef1ff",
        "description":"this is question"
    },
    {
        "name":"invalid",
        "color":"b1b2ff",
        "description":"this is not valid"
    },
    {
        "name":"duplicate",
        "color":"FFA1CF",
        "description":"this is dulicate"
    }
];
