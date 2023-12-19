import IconAndName from "../user/IconAndName";

export default function FooterCard({
  event,
  handleOpenEditPriorityPopup,
  handleDelete,
  indexSection,
}) {
  return (
    <div className="flex space-x-2">
      {indexSection === 1 ? (
        <IconAndName
          iconName="delete"
          label="delete"
          onClick={() => handleDelete(event.id)}
          color="text-red-800"
        />
      ) : (
        <>
          <IconAndName
            iconName="edit"
            label="edit"
            onClick={handleOpenEditPriorityPopup}
          />
          <IconAndName
            iconName="delete"
            label="delete"
            onClick={() => handleDelete(event.id)}
            color="text-red-800"
          />
        </>
      )}
    </div>
  );
}
