type propsType = {
    OpenOn: boolean;
    Message: string;
    OnAcceptedByUser: () => void;
    OnDeclinedByuser: () => void;
    Loading: boolean;
};
declare const ModalComponent: ({ OpenOn, Message, OnAcceptedByUser, OnDeclinedByuser, Loading, }: propsType) => JSX.Element;
export default ModalComponent;
//# sourceMappingURL=ModalComponent.d.ts.map