import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers'
import { getAllPosts } from '../../../lib/api';

export async function GET(request: NextRequest) {
	const referer = headers().get('referer');

	if (referer?.includes('admin')) {
		const rawSection = request.nextUrl.searchParams.get('section');

		let section: string | undefined;

		if (rawSection) {
			if (typeof rawSection !== 'string') {
				return NextResponse.json({ message: 'Invalid section' }, { status: 400 });
			}

			section = rawSection;
		}

		return NextResponse.json(getAllPosts(section));
	}

	return NextResponse.json({ message: 'Not found' }, { status: 404 });
};
