"use client";

interface CustomButtonProps {
  title?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode | string;
  disabled?: boolean;
}

const CustomButton = (props: CustomButtonProps) => {
  return (
    <button className={props?.className} onClick={props?.onClick} disabled={props?.disabled}>
      {props?.title} {props?.icon}
    </button>
  );
};

export default CustomButton;
