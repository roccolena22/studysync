import IconAndName from "../user/IconAndName";

export default function FooterCard({
  event,
  handleOpenEditPriorityPopup,
  handleDelete,
  indexSection,
}) {
  const deleteIcon = (
    <IconAndName
      iconName="delete"
      label="delete"
      onClick={() => handleDelete(event)}
      color="text-red-800"
    />
  );

  return (
    <div className="flex space-x-2">
      {indexSection === 1 ? (
        deleteIcon
      ) : (
        <>
          <IconAndName iconName="edit" label="edit" onClick={handleOpenEditPriorityPopup} />
          {deleteIcon}
        </>
      )}
    </div>
  );
}
