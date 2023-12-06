import Icon from "../../../shared/component/Icon";

export default function FooterCard({
  event,
  handleOpenEditPopup,
  handleDelete,
  indexSection,
}) {
  return (
    <div className="flex space-x-2">
      {indexSection === 1 ? (
        <div
          className="flex flex-col cursor-pointer text-cyan-700 items-center"
          onClick={() => handleDelete(event)}
        >
          <Icon name="delete" style="w-3 h-3" />
          <span className="text-[10px] text-red-800">DELETE</span>
        </div>
      ) : (
        <>
          <div
            className="flex flex-col cursor-pointer text-cyan-700 items-center"
            onClick={handleOpenEditPopup}
          >
            <Icon name="edit" style="w-3 h-3" />
            <span className="text-[10px]">EDIT</span>
          </div>
          <div
            className="flex flex-col cursor-pointer text-cyan-700 items-center"
            onClick={() => handleDelete(event)}
          >
            <Icon name="delete" style="w-3 h-3" color="red-800" />
            <span className="text-[10px] text-red-800">DELETE</span>
          </div>
        </>
      )}
    </div>
  );
}
