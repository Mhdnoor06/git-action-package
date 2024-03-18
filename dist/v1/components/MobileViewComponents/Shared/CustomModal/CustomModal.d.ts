interface UseCustomModalHook {
    showModalFunction: (title: string, content: string, onConfirm: () => void, onCancel: () => void) => Promise<boolean>;
    showModal: boolean;
}
declare const useCustomModal: () => UseCustomModalHook;
export default useCustomModal;
//# sourceMappingURL=CustomModal.d.ts.map