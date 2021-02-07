import React from 'react';
import { Header, Link, Paragraph, Grid } from 'components/ui';
import { HOMEPAGE_URL } from 'constants/common';

interface Props {
  email: string;
}

export const Confirm: React.FunctionComponent<Props> = ({ email }) => (
  <>
    <Header level={2} align='center'>
      Регистрация
    </Header>

    <Paragraph>
      Осталось сделать последний шаг&nbsp;&mdash; подтвердить email.
    </Paragraph>

    <Paragraph>
      Проверьте ящик <strong>{email}</strong>, там уже ждем письмо
      с&nbsp;ссылкой на&nbsp;подтверждение регистрации.
    </Paragraph>

    <Grid.Row marginTop='xl'>
      <Grid.Col>
        <Link href={HOMEPAGE_URL} design='secondary' fullWidth>
          Ок
        </Link>
      </Grid.Col>
    </Grid.Row>
  </>
);
