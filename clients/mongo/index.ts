import { Model, Mongoose, Schema } from "mongoose";

export default class Mongo {
  client: Mongoose;

  constructor() {
    this.client = new Mongoose();
  }

  connect = async () => {
    const url = "mongodb://127.0.0.1:27017/";
    this.client.connect(url);

    this.client.connection.once("open", () => {
      console.log("connected");
    });

    this.client.connection.on("error", (err: any) => {
      console.log(err);
    });
  };

  getDatabase = async (): Promise<any> => {
    try {
      const schema: Schema = new this.client.Schema({
        name: String,
        size: Number,
      });
      const db: Model<any> = this.client.model("airports", schema);
      return db;
    } catch (err) {
      return err;
    }
  };
}
