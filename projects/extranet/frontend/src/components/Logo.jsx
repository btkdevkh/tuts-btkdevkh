const Logo = ({ size }) => {
  return (
    <>
      <div className="bg-[#fcb9b2] flex flex-col items-center p-3">
        <img src="/logo.png" width={size} />
      </div>
    </>
  );
};

export default Logo;
