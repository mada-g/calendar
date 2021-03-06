export default {

  date: { year: 2017, month: 0, day: 10, dayOfWeek: 0 },

  viewMonth: {
    dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    table: [],
    daysMetaD: {"d4": {metaD: {tags: {}}, eId: "qqq"}},
    tags: [],
    people: []
  },

  viewDay: {
    date: {
      year: 2017,
      month: 11,
      dayNum: 11,
      dayOfWeek: 0
    },
    allTags: [],
    allPeople: [],
    metaD : {
      titles: [],
      tags: {
        "tagID" : {"eid": true}
      },
      people: {}
    },

    eids: {day: [], reg: ["ijV30x9"]},
    filtered: {day: [], reg: []},

    events: {
      "ijV30x9": {start: [9,15], end: [10,10], isAllDay: false, description: "", title: "Mia's meeting", people:[], tags:[] }
    }
  },

  appUI: {
    dayFilter: {}
  }

}
