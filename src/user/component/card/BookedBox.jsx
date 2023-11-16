import Icon from "../../../shared/component/Icon";

export default function BookedBox({ places, handlePartecipantPopup }) {
  return (
    <div
      className="flex cursor-pointer text-rose-500 pb-6 sm:pb-0 space-x-1 items-center"
      onClick={handlePartecipantPopup}
    >
      {places && <span className="text-xs">0/{places}</span>}
      <Icon name="group" />
    </div>
  );
}
