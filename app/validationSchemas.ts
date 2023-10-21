import z from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is required.').max(60_000),
});

export const patchIssueSchema = z
  .object({
    assignedToUserId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Must be a valid Object ID')
      .nullable(),
  })
  .merge(issueSchema)
  .partial()
  .refine(data => !!Object.keys(data).length, 'Nothing to update.');
