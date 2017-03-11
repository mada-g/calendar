export default {

  date: { year: 2017, month: 0, day: 10, dayOfWeek: 0 },

  viewMonth: {
    table: [],
    days: {
      "day3": { test: "yesyesyes", hols: [], events: [] }
    },

    dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },

  viewDay: {
    metaD : {
      titles: [],
      tags: {
        "tagID" : ["eid"]
      },
      people: []
    },

    eids: {day: [], reg: ["ijV30x9"]},
    filtered: {day: [], reg: []},

    events: {
      "ijV30x9": {start: [9,15], end: [10,10], isAllDay: false, description: "", title: "Mia's meeting", tags: []}
    }
  },


  mockDB: {
    events: {
      "2017": {
        "0": {
          "1" : { entries : [{}] }
        }
      }
    }
  }

}
