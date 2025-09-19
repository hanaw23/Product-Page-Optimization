interface NextIconProps {
  className?: string;
  fill?: string;
  height?: number;
  width?: number;
}

const NextIcon = (props: NextIconProps) => {
  return (
    <svg className={props.className} fill={props.fill} height={props.height} width={props.width} viewBox="0 0 24 24">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g id="next">
          <g>
            <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 "></polygon>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default NextIcon;
