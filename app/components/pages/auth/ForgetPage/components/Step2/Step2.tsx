import React from 'react';
import { HOMEPAGE_URL } from 'constants/common';
import { useUser } from 'components/providers';
import { Grid, Link, Paragraph } from 'components/ui';

export const Step2: React.FunctionComponent = () => {
  const { email } = useUser();

  return (
    <>
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
    </>
  );
};
