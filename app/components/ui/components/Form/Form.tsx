import React, { useMemo } from 'react';
import { Grid } from '../Grid';
import { Header } from '../Header';
import { Paragraph } from '../Paragraph';
import { ActionRow, Row } from './components';
import styles from './Form.module.css';

interface Context {
  narrow?: boolean;
}

export const context = React.createContext<Context>(undefined);

interface Props {
  children: React.ReactNode;
  title?: string;
  error?: string;
  narrow?: boolean;
  onSubmit?: React.FormEventHandler;
}

export const Form: React.FunctionComponent<Props> & {
  Row: typeof Row;
  ActionRow: typeof ActionRow;
} = ({ children, title, error, narrow, onSubmit }) => {
  const value = useMemo<Context>(() => ({ narrow }), [narrow]);

  return (
    <context.Provider value={value}>
      <form className={styles.root} onSubmit={onSubmit}>
        {/* Form title */}
        {Boolean(title) && (
          <Grid.Row marginBottom='l'>
            <Grid.Col
              cols={12}
              colsSM={narrow ? 12 : 8}
              offsetSM={narrow ? 0 : 4}
            >
              <Header
                level={2}
                margin='none'
                align={narrow ? 'center' : undefined}
              >
                {title}
              </Header>
              {error && (
                <Paragraph color='caution' align={narrow ? 'center' : 'left'}>
                  {error}
                </Paragraph>
              )}
            </Grid.Col>
          </Grid.Row>
        )}

        {/* Form content */}
        {children}
      </form>
    </context.Provider>
  );
};

Form.Row = Row;
Form.ActionRow = ActionRow;
