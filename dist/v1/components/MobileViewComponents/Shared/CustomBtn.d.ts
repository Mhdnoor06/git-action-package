import React from "react";
type PropsType = {
    eventHandler: (val: any) => void;
    size?: string;
    label: string;
    TxColor?: string;
    showIcon?: boolean;
    isLoading?: boolean;
    bgColor?: string;
    hightSize?: string;
    borderClr?: string;
    isDisabled?: boolean;
    children?: React.ReactNode;
    icon?: any;
};
declare const CustomBtn: ({ eventHandler, label, isLoading, bgColor, borderClr, TxColor, showIcon, isDisabled, size, hightSize, children, icon, }: PropsType) => JSX.Element;
export default CustomBtn;
//# sourceMappingURL=CustomBtn.d.ts.map