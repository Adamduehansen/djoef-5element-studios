import CONTROL_CLASSES from '../../lib/ControlClasses';

function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button className={CONTROL_CLASSES} {...props}>
      {children}
    </button>
  );
}

export default Button;
