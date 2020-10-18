import React, { useCallback, useReducer } from 'react';
import { Footer, Header, Page } from 'components/common';
import { Col, Row } from 'components/ui';
import { ERROR_MESSAGE_OTHER } from 'constants/errors';
import { axios, isAxiosError } from 'utils';
import Form from './components/NewEventForm/NewEventForm';
import Success from './components/Success/Success';
import {
  ActionsTypes,
  ActionSubmitFailurePayload,
  initState,
  reducer,
} from './reducer';

export const AddEventPage = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initState);

  /**
   * Form submit handler
   */
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      dispatch({
        type: ActionsTypes.submitRequest,
      });

      try {
        await axios.post('/events', state.data);

        dispatch({
          type: ActionsTypes.submitSuccess,
        });
      } catch (error) {
        const payload: ActionSubmitFailurePayload = {};

        if (isAxiosError(error)) {
          const { data } = error.response;

          if (typeof data === 'string') {
            payload.error = data;
          } else {
            payload.errors = data;
          }
        } else {
          payload.error = ERROR_MESSAGE_OTHER;
        }

        dispatch({
          type: ActionsTypes.submitFailure,
          payload,
        });
      }
    },
    [state]
  );

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((event) => {
    const { name, value } = event.target;

    dispatch({
      type: ActionsTypes.change,
      payload: {
        name,
        value,
      },
    });
  }, []);

  return (
    <Page
      center={state.isFetched}
      topOffset
      header={<Header />}
      footer={<Footer />}
    >
      <Row>
        <Col align={state.isFetched ? 'center' : 'left'}>
          {state.isFetched ? (
            <Success />
          ) : (
            <Form
              data={state.data}
              errors={state.errors}
              error={state.error}
              isFetching={state.isFetching}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          )}
        </Col>
      </Row>
    </Page>
  );
};
