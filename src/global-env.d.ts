

  export type Boxes = {
    confirm: (confirmContent: ConfirmContent) => Promise<boolean>;
    toast: (toastData: ToastMessage | ToastMessage[]) => void;
  };