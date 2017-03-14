import mongoose from 'mongoose';

export default class MongoObj {

  constructor({url, schema : {name, definition}}){
    this.url = url;
    this.schema = {name, definition};
    this.model = null;
    this.connected = false;
  }

  connect(){
    this.connection = mongoose.createConnection(this.url);
    this.model = this.connection.model(this.schema.name, this.schema.definition);

    return new Promise((resolve, reject) => {
      this.connection.on("error", err => reject(err));
      this.connection.once("open", () => {
        this.connected = true;
        resolve("CONNECTED");
      })
    })
  }

  getModel(){
    return this.model;
  }

  save(data){
    return new Promise((resolve, reject) => {
      if(!this.connected || !this.model) reject("not connected");

      let doc = new this.model(data);
      doc.save((err, doc) => err ? reject(err) : resolve(doc));
    })
  }

  findOne(query, fields){
    return new Promise((resolve, reject) => {
      if(!this.connected || !this.model) reject("not connected");
      this.model.findOne(query, fields, (err, res) => err ? reject(err) : resolve(res));
    })
  }

  findAll(query, fields){
    return new Promise((resolve, reject) => {
      if(!this.connected || !this.model) reject("not connected");
      this.model.find(query, fields, (err, res) => err ? reject(err) : resolve(res));
    })
  }

  aggregate(pipeline){
    return new Promise((resolve, reject) => {
      if(!this.connected || !this.model) reject("not connected");
      this.model.aggregate(pipeline, (err, res) => err ? reject(err) : resolve(res));
    })
  }

  update(query, fields){
    return new Promise((resolve, reject) => {
      if(!this.connected || !this.model) reject("not connected");
      this.model.update(query, fields, (err, res) => err ? reject(err) : resolve(res));
    })
  }
}
