interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

function Button({ text, ...props }: Props): JSX.Element {
  return <button {...props}>{text}</button>;
}

export default Button;
