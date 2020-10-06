import React, { memo, useCallback, useReducer } from 'react';
import { HTTPError, jsonRpcClient, JsonrpcError } from 'utils/jsonrpc';
import Form, { OnSubmitParams } from './components/Form/Form';
import Success from './components/Success/Success';
import { Col, Row } from 'components/ui';
import { FailurePayload, initialState, reducer } from './reducers/reducers';
import { ERROR_MESSAGE_HTTP, ERROR_MESSAGE_OTHER } from 'constants/errors';

interface Props {
  title: string;
  params?: {
    [key: string]: any;
  };
}

const SubscriptionForm = ({ title, params = {} }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = useCallback(
    async ({ email }: OnSubmitParams): Promise<void> => {
      try {
        dispatch({ type: 'REQUEST' });

        await jsonRpcClient.request('Events.SubscribeV1', { ...params, email });

        dispatch({ type: 'SUCCESS' });
      } catch (error) {
        const payload: FailurePayload = {};

        if (error instanceof JsonrpcError && error.data) {
          payload.errors = error.data;
        } else if (error instanceof HTTPError) {
          payload.error = ERROR_MESSAGE_HTTP;
        } else {
          payload.error = ERROR_MESSAGE_OTHER;
        }

        dispatch({
          type: 'FAILURE',
          payload,
        });
      }
    },
    [params]
  );

  return (
    <Row marginTop='xl' marginBottom='xxl'>
      <Col align='center'>
        {state.isSubmitted ? (
          <Success />
        ) : (
          <Form
            title={title}
            isFetching={state.isSubmitting}
            errors={state.errors}
            error={state.error}
            onSubmit={handleSubmit}
          />
        )}
      </Col>
    </Row>
  );
};

export default memo(SubscriptionForm);
