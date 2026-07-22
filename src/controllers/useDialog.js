import { useState } from "react";

export const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return {
        isOpen,
        handleOpen,
        handleClose
    }
}