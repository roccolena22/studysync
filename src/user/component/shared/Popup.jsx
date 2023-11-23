import Icon from "../../../shared/component/Icon";

export default function Popup({ children, handleClose }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-20 z-[100]">
      <div className="bg-white rounded-lg px-4 w-5/6 md:w-2/3 h-5/6 overflow-y-auto">
        <div className="flex justify-end pt-2 sticky top-0">
          <Icon
            name="close"
            style="rounded-full hover:bg-slate-50 w-6 h-6 bg-white border hover:border-red-800"
            onClick={handleClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
