import { ICustomButton } from '../../type/button';

function CustomButton({ children, onClick, className }: ICustomButton) {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      children={children}
    ></button>
  );
}

export default CustomButton;
