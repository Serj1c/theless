interface State {
   isSubmitting: boolean;
   isSubmitted: boolean;
   errors?: ErrorsField;
   error?: string;
}

interface ErrorsField {
    email?: string;
}

export const initialState: State = {
    isSubmitting: false,
    isSubmitted: false,
};

export interface ActionRequest {
    type: 'REQUEST';
}

export interface ActionSuccess {
    type: 'SUCCESS';
}

export interface ActionFailure {
    type: 'FAILURE';
    payload: FailurePayload;
}

export interface FailurePayload {
    error?: string;
    errors?: {
        [key: string]: string;
    };
}

type Action = ActionRequest | ActionSuccess | ActionFailure;

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
    case 'REQUEST': {
        return {
            ...state,
            isSubmitting: true,
        };
    }
    case 'SUCCESS': {
        return {
            ...state,
            isSubmitting: false,
            isSubmitted: true,
            errors: undefined,
            error: undefined,
        };
    }
    case 'FAILURE': {
        const { error, errors } = action.payload;
        return {
            ...state,
            isSubmitting: false,
            errors,
            error,
        };
    }
    default: {
        return state;
    }
    }
};
