import { useMemo, useEffect, useState, ChangeEvent } from 'react';

// const formValidations = {
//   fullName: [ ( value: string ) => value.length >= 1, 'Full name is required.' ],
//   email: [ ( value: string ) => value.includes( '@' ), 'Email must have @.' ],
// };

type ValidatorFn = (value: string) => boolean;

interface FormValidations {
  [key: string]: [ValidatorFn, string];
}

interface FormValidationState {
  [key: string]: string | null;
}

export const useForm = <T extends Record<string, any>>(
  initialForm: T = {} as T,
  formValidations: FormValidations = {},
) => {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formValidation, setFormValidation] = useState<FormValidationState>({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: FormValidationState = {};

    for (const formField in formValidations) {
      const [fn, errorMessage] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  const isFormValid = useMemo(() => {
    for (const formField in formValidation) {
      if (formValidation[formField] !== null) return false;
    }
    return true;
  }, [formValidation]);

  return {
    isFormValid,
    formValidation,
    formState,
    ...formValidation,
    ...formState,
    onInputChange,
    onResetForm,
  };
};
