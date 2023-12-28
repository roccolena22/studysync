import Icon from "../../../shared/component/Icon";
import Title from "./Title";

export default function PriorityPopup({ children, handleClose, title }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-20 z-[100]">
      <div className="bg-white rounded-lg px-4 w-5/6 lg:w-2/3 h-5/6 overflow-y-auto">
        <div className="flex justify-end pt-2 sticky top-0 bg-white">
          <Icon
            name="close"
            style="rounded-2xl w-6 h-6 hover:border border-red-800 hover:text-red-800"
            onClick={handleClose}
          />
        </div>
        <div className="sticky top-8 bg-white">
          {title && <Title title={title} fontSize="text-lg" />}
        </div>
          {children}
      </div>
    </div>
  );
}
