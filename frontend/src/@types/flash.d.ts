export interface IFlashMessage {
    message: string;
    type?: string;
  }

  export type FlashContextType = {
    flash: (message: string, type?: string, duration?: number) => void;
    hideFlash: () => void;
    flashMessage: IFlashMessage;
    visible: boolean;
  }