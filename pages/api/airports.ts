import Mongo from "@/clients/mongo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return;

  try {
    const mongodb = new Mongo();
    await mongodb.connect();
    const db = await mongodb.getDatabase();

    const data = await db.find({});

    res.status(200).json({ locations: data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
