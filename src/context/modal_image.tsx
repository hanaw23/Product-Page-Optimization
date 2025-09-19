"use client";

import { createContext, useState } from "react";
import Image from "next/image";

interface ModalImageContextType {
  imageModal: string;
  setImageModal: React.Dispatch<React.SetStateAction<string>>;
  setOpenModalImage: React.Dispatch<React.SetStateAction<boolean>>;
  openModalImage: boolean;
}

export const ModalImageContext = createContext<ModalImageContextType>({} as ModalImageContextType);

export const ModalImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModalImage, setOpenModalImage] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<string>("");

  const isOpen = openModalImage && imageModal !== "";

  const handleCloseModal = () => {
    setOpenModalImage(false);
    setImageModal("");
  };

  return (
    <ModalImageContext.Provider value={{ imageModal, setImageModal, setOpenModalImage, openModalImage }}>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={handleCloseModal}>
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <div className="relative max-w-[90%] sm:max-w-[80%] w-full h-full pointer-events-auto">
              <Image src={imageModal} alt="Recipe Image" fill className="object-contain w-full h-full rounded-xl p-3 sm:p-10" />
            </div>
          </div>
        </div>
      )}

      <div className={`${openModalImage ? "pointer-events-none blur-sm opacity-50" : ""}`}>{children}</div>
    </ModalImageContext.Provider>
  );
};
