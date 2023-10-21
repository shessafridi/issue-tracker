import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { issueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';

import authOptions from '../auth/authOptions';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({ data: validation.data });

  return NextResponse.json(newIssue, { status: 201 });
}
