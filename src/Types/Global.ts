
export interface GlobalStoreType {
  Modal: {
    isOpen: boolean;
    content: null | any;
    title: string;
  };
  handleModal: (isOpened: boolean, content?: any) => void;
}
