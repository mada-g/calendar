import keys from '../../keys.js';
import MongoObj from './index.js';
import userSchema from '../models/user.js';

import buildData from "../models/example.js";

export default async function(){
  let db = new MongoObj({url: keys.dbUrl, schema: {name: "User", definition: userSchema}});
  console.log(await db.connect());
  console.log("connected...");

//  console.log(buildData(10));

//  await db.save(buildData(10));

  return db;
}
