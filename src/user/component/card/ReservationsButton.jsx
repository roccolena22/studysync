import Icon from "../../../shared/component/Icon";

export default function ReservationsButtonButton({ places, handleReservationsPopup }) {
  return (
    <div
      className="flex cursor-pointer text-rose-500 pb-6 sm:pb-0 space-x-1 items-center border border-rose-500 rounded-lg px-2"
      onClick={() => handleReservationsPopup()}
    >
      <span className="text-xs">0{places && "/" + places}</span>
      <Icon name="group" />
    </div>
  );
}
