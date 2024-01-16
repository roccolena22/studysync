import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { EventFormValidator } from "./validator/EventFormValidator";
import Input from "../../../shared/component/Input";
import { editEvent } from "../../../redux/slices/eventsSlice";
import { useDispatch } from "react-redux";
import { updateDatabaseRecord } from "../../../api/apiRequest";
import TimeEventSection from "./component/TimeEventSection";
import DetailsEventInForm from "./component/DetailsEventInForm";

export default function EditEventForm({ event, handleCloseEditPriorityPopup, handleAlert, handleNoValidDateAlert }) {
  const dispatch = useDispatch()
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(EventFormValidator),
    defaultValues: {
      title: event.title,
      location: event.location,
      platform: event.platform,
      info: event.info,
      mode: event.mode,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      endTime: event.endTime,
      places: event.places,
      link: event.link
    },
  });

  const currentDate = new Date();

  const onSubmit = async (data) => {
    const start = new Date(data.startDate + " " + data.startTime);
    const end = new Date(data.endDate + " " + data.endTime);

    if (start < currentDate || end <= currentDate || start >= end) {
      handleNoValidDateAlert();
      return;
    }
    const editedData = {
      title: data.title,
      mode: data.mode,
      location:
        data.mode === "In person" || data.mode === "Mixed"
          ? data.location
          : "",
      platform:
        data.mode === "Remotely" || data.mode === "Mixed"
          ? data.platform
          : "",
      startTime: data.startTime,
      endTime: data.endTime,
      places: data.places,
      info: data.info,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    console.log(editedData)
    await updateDatabaseRecord("events", event.id, editedData);
    dispatch(editEvent(editedData));
    handleCloseEditPriorityPopup(false);
    handleAlert();
  };

  return (
    <div className="w-full pt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Event name"
          errorMessage={errors.title?.message}
          register={register("title")}
          placeholder="Enter the name of the event?"
        />
        <TimeEventSection register={register} errors={errors} />
        <DetailsEventInForm register={register} errors={errors} />
        <div className="flex justify-end pb-4">
          <Button type="submit" name="Save" />
        </div>
      </form>
    </div>
  );
}
