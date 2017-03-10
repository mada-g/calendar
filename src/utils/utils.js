

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


export function resolveSuffix(num){
  if(num > 3 && num < 21) return "th";
  let c = (""+num).slice(-1);
  return c==="1" ? "st" : (c==="2" ? "nd" : (c==="3" ? "rd" : "th"));
}

export function strSearch(term, wordlist){
  const expr = new RegExp("^"+term, "i");
  let matchlist = wordlist.filter(w => expr.test(w));
  return matchlist;
}
