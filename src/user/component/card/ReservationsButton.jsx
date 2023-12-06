import Icon from "../../../shared/component/Icon";

export default function ReservationsButtonButton({
  places,
  handleReservationsPopup,
}) {
  return (
    <div
      className="flex flex-col cursor-pointer text-cyan-700 items-center"
      onClick={() => handleReservationsPopup()}
    >
      <Icon name="group" style="w-3 h-3"/>
      <span className="text-[10px]">0{places && "/" + places}</span>
    </div>
  );
}
