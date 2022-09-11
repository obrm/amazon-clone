import { ChangeEvent, useReducer } from 'react'
import { InputState } from '../models'
import { Action } from '../../shared/models'
import { inputActions } from '../models'
import { ValidatorFn } from '../../shared/utils/validation/models'

const initialInputState: InputState = {
  text: '',
  hasBeenTouched: false,
}

const inputReducer = (
  state: InputState,
  action: Action<inputActions.InputActionType>
) => {
  const { type, value = '' } = action

  switch (type) {
    case inputActions.INPUT_ACTION_CHANGE:
      return { text: value, hasBeenTouched: state.hasBeenTouched }
    case inputActions.INPUT_ACTION_BLUR:
      return { text: state.text, hasBeenTouched: true }
    case inputActions.INPUT_ACTION_CLEAR:
      return { text: '', hasBeenTouched: false }
    default:
      return { ...state }
  }
}

const useInput = (validatorFn?: ValidatorFn) => {
  const [{ text, hasBeenTouched }, dispatch] = useReducer(
    inputReducer,
    initialInputState
  )

  let shouldDisplayError

  if (validatorFn) {
    const isValid = validatorFn(text)
    shouldDisplayError = !isValid && hasBeenTouched
  }

  const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: inputActions.INPUT_ACTION_CHANGE, value: e.target.value })
  }

  const textBlurHandler = () => {
    dispatch({ type: inputActions.INPUT_ACTION_BLUR })
  }

  const textClearHandler = () => {
    dispatch({ type: inputActions.INPUT_ACTION_CLEAR })
  }

  return {
    text,
    shouldDisplayError,
    textChangeHandler,
    textBlurHandler,
    textClearHandler,
  }
}

export default useInput
