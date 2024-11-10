import { X } from "lucide-react";
import { ReactNode } from "react";

interface CustomModalProps {
  title?: string;
  show: boolean;
  onDismiss: () => void;
  children: ReactNode;
  subTitle?: string;
  width?: string;
  headerClassName?: string;
  customHeader?: ReactNode;
  modalClassName?: string;
  modalPosition?: string;
}

const CustomModal = ({
  title,
  show,
  onDismiss,
  children,
  subTitle,
  width = "600px",
  headerClassName,
  customHeader,
  modalClassName,
  modalPosition = "center",
}: CustomModalProps) => {
  if (!show) return null;

  let placementClass = "";

  switch (modalPosition) {
    case "top-left":
      placementClass = "top-0 left-0";
      break;
    case "top-right":
      placementClass = "top-0 right-0";
      break;
    case "bottom-left":
      placementClass = "bottom-0 left-0";
      break;
    case "bottom-right":
      placementClass = "bottom-0 right-0";
      break;
    case "center":
      placementClass = "inset-0 flex items-center justify-center";
      break;
    default:
      placementClass = modalPosition;
  }

  return (
    <div className={`fixed z-50 bg-black bg-opacity-50 ${placementClass} ${modalClassName}`}>
      <div
        className="bg-white rounded-lg shadow-lg relative"
        style={{ width: width, maxHeight: "100vh" }}
      >
       {!customHeader && (<div className={`flex p-6 items-center justify-between pb-4 border-b ${headerClassName}`}>
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            {subTitle && <p className="text-sm text-gray-500">{subTitle}</p>}
          </div>
          <X
            className="text-2xl cursor-pointer"
            onClick={onDismiss}
          />
        </div>)}
        {customHeader}
        <div className="mt-4 px-6 pb-6 overflow-auto chatbot-scrollbar" style={{ maxHeight: "60vh" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
