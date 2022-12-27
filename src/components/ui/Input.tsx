import { useId } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  changed?: boolean;
}

function Input({ text, changed, ...inputProps }: Props): JSX.Element {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className='pr-2'>
        {text}
      </label>
      {changed && <span>*</span>}
      <input id={id} {...inputProps} />
    </div>
  );
}

export default Input;
