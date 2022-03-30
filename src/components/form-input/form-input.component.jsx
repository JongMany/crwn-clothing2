import { FormInputLabel, Group, Input } from './form-input.styles.jsx';

const FormInput = ({ label, labelFor, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={otherProps.value.length}
          htmlFor={labelFor}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
