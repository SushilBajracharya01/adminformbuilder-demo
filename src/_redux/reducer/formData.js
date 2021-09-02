import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
	formElements: [],
};

export default function FormData(state = initialState, action) {
	let tempForm, index;
	switch (action.type) {
		case ActionTypes.REORDER_FORM:
			return { ...state, formElements: [...action.payload] };
		case ActionTypes.ADD_FORM_DATA:
			console.log(action.payload)
			index = state.formElements.findIndex((form) => form.id === action.payload.id);
			if (index !== -1) {
				tempForm = [...state.formElements];
				tempForm[index] = action.payload;
				return { ...state, formElements: tempForm };
			}
			return { ...state, formElements: [...state.formElements, action.payload] };
		case ActionTypes.DELETE_FORM_ELEMENT:
			tempForm = [...state.formElements];
			index = tempForm.findIndex((form) => form.id === action.payload);
			tempForm.splice(index, 1);
			return { ...state, formElements: tempForm };
		case ActionTypes.REMOVE_fORM:
			return { ...state, formElements: [] };
		case ActionTypes.SET_EVV_DEFAULT:
			return { ...state, formElements: state.defaultEvvFormElements };

		default:
			return state;
	}
}
