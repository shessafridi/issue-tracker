import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { issueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';

import authOptions from '../../auth/authOptions';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue)
    return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: validation.data,
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({ where: { id } });

  if (!issue)
    return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

  await prisma.issue.delete({ where: { id } });

  return NextResponse.json({});
}
