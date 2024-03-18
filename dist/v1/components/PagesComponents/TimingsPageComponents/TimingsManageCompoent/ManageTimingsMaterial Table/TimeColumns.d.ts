interface EditComponentProps {
    rowData: any;
    onChange: (value: any) => void;
}
export declare const TimeColumns: ({
    field: string;
    title: string;
    width: number;
    render?: undefined;
    editComponent?: undefined;
} | {
    field: string;
    title: string;
    width: number;
    render: (data: any) => string;
    editComponent: (props: EditComponentProps) => JSX.Element;
})[];
export {};
//# sourceMappingURL=TimeColumns.d.ts.map