import CustomButton from './common/Button';

function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around p-4 bg-gray-200">
      <CustomButton>Home</CustomButton>
      <CustomButton>Calendar</CustomButton>
      <CustomButton>Asset</CustomButton>
      <CustomButton>Info</CustomButton>
    </div>
  );
}

export default Footer;
