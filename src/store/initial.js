export default {

  date: { year: 2017, month: 0, day: 10 },

  viewMonth: {
    month: 5,
    year: 2017,
    table: [],
    days: {
      "day3": { test: "yesyesyes", hols: [], events: [] }
    },

    dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },

  viewDay: {
    year: 2017,
    month: 0,
    day: 1,
    dayOfWeek: 0,

    entries: [
      {start: [9,15], end: [10,10], isAllDay: false, description: "", title: "Mia's meeting", entryId: "ijV30x9", tags: []}
    ]
  },


  mockDB: {
    events: {
      "2017": {
        "0": {
          "1" : {
            entries : [
              {}
            ]
          }
        }
      }
    }
  }

}
