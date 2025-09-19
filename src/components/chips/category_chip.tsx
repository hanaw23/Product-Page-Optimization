"use client";

interface CategoryChipProps {
  categoryName: string;
  onClick?: () => void;
  isClickable?: boolean;
  defaultCategory?: string;
}

const CategoryChip = (props: CategoryChipProps) => {
  return (
    <div
      className={`w-[100px] rounded-lg p-1.5 sm:p-3 text-center text-xs ${props.isClickable && "cursor-pointer"} hover:bg-[#f2683a] hover:text-white transition ${
        props.categoryName === props.defaultCategory ? `bg-[#f2683a] text-white font-semibold` : `bg-slate-200`
      }`}
      onClick={props.onClick}
    >
      <div>{props.categoryName}</div>
    </div>
  );
};

export default CategoryChip;
