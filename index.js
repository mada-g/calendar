console.log("\n");
console.log("###########################################################");
console.log("##                                                       ##");
console.log("##  Build webpack bundles with: npm run build            ##");
console.log("##                                                       ##");
console.log("##  The bundles are created in the '/public' directory   ##");
console.log("##                                                       ##");
console.log("###########################################################");
console.log("##                                                       ##");
console.log("##  Start development server with: npm run devserver     ##");
console.log("##                                                       ##");
console.log("##  The application is served at http://localhost:8080/  ##");
console.log("##                                                       ##");
console.log("###########################################################");
console.log("\n");

var cal = require("calendar");

var c = new cal.Calendar(1);

var m = c.monthDates(2017, 1, function(d){
  return d.getDate();
});

//console.log(m);

m.forEach(function(w){
  console.log(w);
});
