import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <Image
      src="/logo.svg"
      alt="Next Tutorial Logo"
      width={100}
      height={100}
    />
  );
};

export default Logo;
