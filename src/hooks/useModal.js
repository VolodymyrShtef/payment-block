import { useEffect, useRef, useState } from "react";

export default function useModal(initial) {
  const [modalShow, changeModalView] = useState(initial);
  const toggle = () => {
    changeModalView(!modalShow);
  };
  const hideModalRef = useRef();
  const hideModal = (e) => {
    console.log(e.code);
    if (e.code === "Escape") {
      toggle();
    }
  };
  useEffect(() => {
    if (modalShow) {
      window.addEventListener("keydown", hideModal);
      hideModalRef.current = hideModal;
      return;
    }
    window.removeEventListener("keydown", hideModalRef.current);
  }, [modalShow]);
  return [modalShow, toggle];
}
