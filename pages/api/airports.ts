import Mongo from '@/clients/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'GET':
			try {
				const mongodb = new Mongo();
				await mongodb.connect();
				const db = await mongodb.getDatabase();

				const data = await db.find({});

				res.status(200).json({ locations: data });
			} catch (error) {
				res.status(500).json({ error: error });
			}
			break;
		case 'POST':
			try {
				const mongodb = new Mongo();
				await mongodb.connect();
				const db = await mongodb.getDatabase();

				const { location, size } = req.body;

				const success = await db.insertMany([
					{ name: location, size: size },
				]);

				res.status(201).json({ message: success });
			} catch (error) {
				res.status(500).json({ error: error });
			}
			break;
		default:
			res.status(404).json({ message: 'Page Not Found' });
			break;
	}
}
