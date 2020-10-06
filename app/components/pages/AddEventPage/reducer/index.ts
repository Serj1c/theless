interface Data {
  name: string;
  date: string;
  address: string;
  contacts: string;
  description: string;
  notes: string;
}

export enum ActionsTypes {
  change = 'change',
  submitRequest = 'submit_request',
  submitSuccess = 'submit_success',
  submitFailure = 'submit_failure',
}

type Errors = {
  [key in keyof Data]?: string;
};

interface State {
  data: Data;
  errors: Errors;
  error?: string;
  isFetching: boolean;
  isFetched: boolean;
}

export const initState: State = {
  data: {
    name: '',
    date: '',
    address: '',
    contacts: '',
    description: '',
    notes: '',
  },
  errors: {},
  error: undefined,
  isFetching: false,
  isFetched: false,
};

interface ActionChangePayload {
  name: string;
  value: string;
}

export interface ActionChange {
  type: ActionsTypes.change;
  payload: ActionChangePayload;
}

export interface ActionSubmitRequest {
  type: ActionsTypes.submitRequest;
}

export interface ActionSubmitSuccess {
  type: ActionsTypes.submitSuccess;
}

export interface ActionSubmitFailurePayload {
  errors?: Errors;
  error?: string;
}

export interface ActionSubmitFailure {
  type: ActionsTypes.submitFailure;
  payload: ActionSubmitFailurePayload;
}

type Action =
  | ActionChange
  | ActionSubmitRequest
  | ActionSubmitSuccess
  | ActionSubmitFailure;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionsTypes.change: {
      const { name, value } = action.payload;

      return {
        ...state,
        data: {
          ...state.data,
          [name]: value,
        },
      };
    }
    case ActionsTypes.submitRequest: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ActionsTypes.submitSuccess: {
      return {
        ...state,
        error: undefined,
        errors: {},
        isFetching: false,
        isFetched: true,
      };
    }
    case ActionsTypes.submitFailure: {
      return {
        ...state,
        errors: action.payload.errors || {},
        error: action.payload.error,
        isFetching: false,
      };
    }
    default: {
      return state;
    }
  }
};
