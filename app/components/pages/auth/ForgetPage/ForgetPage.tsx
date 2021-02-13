import React from 'react';
import { useUser } from 'components/providers';
import { AuthLayout } from 'components/layouts';
import { Grid, Header, Link, Paragraph } from 'components/ui';
import { HOMEPAGE_URL } from 'constants/common';

export const ForgetPage: React.FunctionComponent = () => {
  const { email } = useUser();

  return (
    <AuthLayout>
      <Header level={2} align='center'>
        Восстановление пароля
      </Header>

      <Paragraph marginBottom='m'>
        Проверьте ящик <strong>{email}</strong>, там уже ждем письмо
        с&nbsp;ссылкой на&nbsp;восстановление пароля.
      </Paragraph>

      <Grid.Row marginTop='xl'>
        <Grid.Col>
          <Link href={HOMEPAGE_URL} design='primary' fullWidth>
            Ок
          </Link>
        </Grid.Col>
      </Grid.Row>
    </AuthLayout>
  );
};
