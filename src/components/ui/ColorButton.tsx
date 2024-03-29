interface ColorButtonProps {
  value: string;
  onClick: (value: string) => void;
}

function ColorButton({ value, onClick }: ColorButtonProps): JSX.Element {
  return (
    <button
      className='h-8 w-8 border border-white hover:border-gray-700'
      style={{
        background: `#${value}`,
      }}
      onClick={(): void => {
        onClick(`#${value}`);
      }}
    ></button>
  );
}

export default ColorButton;
