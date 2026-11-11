import { object, string } from 'yup';
import type { ObjectSchema } from 'yup';

export interface NewsletterValues {
  email: string;
}

export interface NewsletterMessages {
  required: string;
  invalid: string;
}

export function createNewsletterSchema(
  messages: NewsletterMessages,
): ObjectSchema<NewsletterValues> {
  return object({
    email: string().trim().required(messages.required).email(messages.invalid),
  });
}
