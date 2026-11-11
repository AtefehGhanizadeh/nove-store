'use client';

import { useId, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { CheckIcon, MailIcon } from '@/assets/Icons';
import { Button } from '@/shared/Button';
import Container from '@/shared/Container';
import { createNewsletterSchema } from '@/validations/newsletterSchema';
import type { NewsletterValues } from '@/validations/newsletterSchema';
import {
  Card,
  Description,
  ErrorText,
  Field,
  Form,
  Input,
  Intro,
  MailBadge,
  Section,
  SuccessText,
  Title,
} from './Newsletter.styles';

const INITIAL_VALUES: NewsletterValues = { email: '' };

export default function Newsletter() {
  const t = useTranslations('newsletter');
  const tValidation = useTranslations('validation');
  const [subscribed, setSubscribed] = useState(false);
  const inputId = useId();
  const errorId = useId();
  const titleId = useId();

  const validationSchema = useMemo(
    () =>
      createNewsletterSchema({
        required: tValidation('emailRequired'),
        invalid: tValidation('emailInvalid'),
      }),
    [tValidation],
  );

  const formik = useFormik<NewsletterValues>({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: (_values, { resetForm }) => {
      resetForm();
      setSubscribed(true);
    },
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSubscribed(false);
    formik.handleChange(event);
  }

  const error = formik.touched.email ? formik.errors.email : undefined;

  return (
    <Section aria-labelledby={titleId}>
      <Container>
        <Card>
          <Intro>
            <MailBadge>
              <MailIcon />
            </MailBadge>
            <div>
              <Title id={titleId}>{t('title')}</Title>
              <Description>{t('description')}</Description>
            </div>
          </Intro>

          <Form onSubmit={formik.handleSubmit} noValidate>
            <Field>
              <label htmlFor={inputId} className="visually-hidden">
                {t('emailLabel')}
              </label>
              <Input
                id={inputId}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={t('placeholder')}
                value={formik.values.email}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                $invalid={Boolean(error)}
              />
              <Button type="submit" disabled={formik.isSubmitting}>
                {t('submit')}
              </Button>
            </Field>
            {error && <ErrorText id={errorId}>{error}</ErrorText>}
            <div role="status">
              {subscribed && (
                <SuccessText>
                  <CheckIcon />
                  {t('success')}
                </SuccessText>
              )}
            </div>
          </Form>
        </Card>
      </Container>
    </Section>
  );
}
