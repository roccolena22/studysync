import Icon from "../../../shared/component/Icon";
import Title from "./Title";

export default function Popup({ children, handleClose, title }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-20 z-[110]">
      <div className="bg-white rounded-lg px-4 w-5/6 md:w-2/3 h-5/6 overflow-y-auto">
        <div className="flex justify-end pt-2 sticky top-0">
          <Icon
            name="close"
            style="rounded-2xl w-6 h-6 bg-white border hover:border-red-800"
            onClick={handleClose}
          />
        </div>
        <div className="py-6">
          {title && <Title title={title} fontSize="text-lg" />}
          {children}
        </div>
      </div>
    </div>
  );
}
