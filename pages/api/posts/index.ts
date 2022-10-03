import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts } from '../../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.headers.referer?.includes('admin')) {
		const { section: rawSection } = req.query;
		let section: string | undefined;

		if (rawSection) {
			if (typeof rawSection !== 'string') {
				return res.status(400).json({ message: 'Invalid section' });
			}

			section = rawSection;
		}

		return res.status(200).json(getAllPosts(section));
	}

	return res.status(404).json({ message: 'Not found' });
};
