import { IconProps } from "@/ITypes";

const Logo: React.FC<IconProps> = (props) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mb-4"
    {...props}
  >
    <circle cx="100" cy="100" r="95" fill="#4CAF50" />
    <path
      d="M100 30C67.9086 30 42 55.9086 42 88C42 120.091 100 170 100 170C100 170 158 120.091 158 88C158 55.9086 132.091 30 100 30Z"
      fill="white"
    />
    <path
      d="M70 100L95 125L135 75"
      stroke="#4CAF50"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Logo;
