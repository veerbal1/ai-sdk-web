import { z } from 'zod';

// Define a schema for the notifications, placing it within the feature's lib directory
export const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe('Name of a fictional person.'),
      message: z.string().describe('Message. Do not use emojis or links.'),
      // Adding an optional timestamp for potential future use
      timestamp: z.string().datetime().optional().describe('Timestamp of the message'),
    }),
  ),
});

// Optionally, define the type for a single notification for easier use elsewhere
export type Notification = z.infer<typeof notificationSchema>['notifications'][number];
