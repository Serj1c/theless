import React from 'react';
import { Link, Paragraph } from 'components/ui';

interface Props {
  isAuthorised: boolean;
}

export const AddFavorite: React.FunctionComponent<Props> = ({
  isAuthorised,
}) => (
  <>
    <Paragraph color='inverted'>
      Событие добавлено в&nbsp;
      <Link href='/profile/favorites' color='light'>
        избранное
      </Link>
    </Paragraph>

    {!isAuthorised && (
      <Paragraph color='inverted'>
        <Link href='/auth' color='light'>
          Авторизуйтесь
        </Link>{' '}
        или{' '}
        <Link href='/signup' color='light'>
          зарегистрируйтесь
        </Link>{' '}
        чтобы не&nbsp;забыть о&nbsp;нем
      </Paragraph>
    )}
  </>
);
