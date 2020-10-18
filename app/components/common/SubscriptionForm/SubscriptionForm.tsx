import React, { useCallback, useReducer } from 'react';
import { Col, Row } from 'components/ui';
import { ERROR_MESSAGE_OTHER } from 'constants/errors';
import { axios, isAxiosError } from 'utils';
import Form, { OnSubmitParams } from './components/Form/Form';
import Success from './components/Success/Success';
import { FailurePayload, initialState, reducer } from './reducers/reducers';

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

        await axios.post('/events/subscribe', { ...params, email });

        dispatch({ type: 'SUCCESS' });
      } catch (err) {
        const payload: FailurePayload = {};

        if (isAxiosError(err)) {
          if (typeof err.response.data === 'string') {
            payload.error = err.response.data;
          } else {
            payload.errors = err.response.data;
          }
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

export default SubscriptionForm;
