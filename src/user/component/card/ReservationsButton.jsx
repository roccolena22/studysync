import Icon from "../../../shared/component/Icon";

export default function ReservationsButtonButton({
  places,
  handleReservationsPopup,
}) {
  return (
    <div
      className="flex flex-col cursor-pointer text-rose-500 items-center"
      onClick={() => handleReservationsPopup()}
    >
      <Icon name="group" style="w-3 h-3"/>
      <span className="text-[10px]">0{places && "/" + places}</span>
    </div>
  );
}
