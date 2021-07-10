import React, { useReducer, useCallback } from 'react';
import { Page, Header, Footer } from 'components/common';
import { Row, Col } from 'components/ui';
import jsonrpc, { JsonrpcError, HTTPError } from 'utils/jsonrpc';
import Form from './components/NewEventForm/NewEventForm';
import Success from './components/Success/Success';
import {
  ActionsTypes,
  ActionSubmitFailurePayload,
  initState,
  reducer,
} from './reducer';
import { ERROR_MESSAGE_HTTP, ERROR_MESSAGE_OTHER } from 'constants/errors';

export const AddEventPage = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      dispatch({
        type: ActionsTypes.submitRequest,
      });

      try {
        await jsonrpc.request('Events.AddV1', state.data);

        dispatch({
          type: ActionsTypes.submitSuccess,
        });
      } catch (error) {
        const payload: ActionSubmitFailurePayload = {};

        if (error instanceof JsonrpcError && error.data) {
          payload.errors = error.data;
        } else if (error instanceof HTTPError) {
          payload.error = ERROR_MESSAGE_HTTP;
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
