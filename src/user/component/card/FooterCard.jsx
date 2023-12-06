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
        <Icon
          name="delete"
          onClick={() => handleDelete(event)}
          style="w-5 h-5 rounded-full hover-bg-slate-200 cursor-pointer"
        />
      ) : (
        <>
          <Icon
            name="edit"
            onClick={handleOpenEditPopup}
            style="w-5 h-5 rounded-full hover:bg-slate-200 cursor-pointer"
          />
          <Icon
            name="delete"
            onClick={() => handleDelete(event)}
            style="w-5 h-5 rounded-full hover-bg-slate-200 cursor-pointer"
          />
        </>
      )}
    </div>
  );
}
