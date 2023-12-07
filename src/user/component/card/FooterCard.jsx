import Icon from "../../../shared/component/Icon";
import IconAndName from "../user/IconAndName";

export default function FooterCard({
  event,
  handleOpenEditPopup,
  handleDelete,
  indexSection,
}) {
  return (
    <div className="flex space-x-2">
      {indexSection === 1 ? (
        <IconAndName
          iconName="delete"
          name="delete"
          onClick={() => handleDelete(event)}
          color="text-red-800"
        />
      ) : (
        <>
          <IconAndName
            iconName="edit"
            name="edit"
            onClick={handleOpenEditPopup}
          />
          <IconAndName
            iconName="delete"
            name="delete"
            onClick={() => handleDelete(event)}
            color="text-red-800"
          />
        </>
      )}
    </div>
  );
}
