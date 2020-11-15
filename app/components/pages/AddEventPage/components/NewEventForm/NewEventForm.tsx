import React from 'react';
import { Button, Form } from 'components/ui';
import InputRow from './components/Row/Row';

interface Fields {
  name: string;
  date: string;
  address: string;
  contacts: string;
  description: string;
  notes: string;
}

interface Props {
  data: Fields;
  errors: Partial<Fields>;
  error?: string;
  isFetching: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const FIELDS: (keyof Fields)[] = [
  'name',
  'date',
  'address',
  'contacts',
  'description',
  'notes',
];
const LABELS = [
  'Название',
  'Дата проведения',
  'Адрес',
  'Контактное лицо',
  'Описание',
  'Примечание',
];

const NewEventForm = ({
  data,
  errors,
  error,
  isFetching,
  onChange,
  onSubmit,
}: Props): JSX.Element => {
  const focusField = getFocusField(errors, isFetching);

  return (
    <Form title='Новое событие' error={error} onSubmit={onSubmit}>
      {FIELDS.map((f, i) => (
        <InputRow
          key={f}
          label={LABELS[i]}
          name={f}
          value={data[f]}
          error={errors[f]}
          disabled={isFetching}
          autoFocus={focusField === f}
          onChange={onChange}
        />
      ))}
      <Form.ActionRow>
        <Button type='submit' loading={isFetching} design='primary'>
          Добавить
        </Button>
      </Form.ActionRow>
    </Form>
  );
};

export default NewEventForm;

function getFocusField(
  errors: Partial<Fields>,
  isFetching: boolean
): keyof Fields | null {
  if (isFetching) {
    return null;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const f of FIELDS) {
    if (f in errors) {
      return f;
    }
  }

  return FIELDS[0];
}
