import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { EventFormValidator } from "./validator/EventFormValidator";
import Input from "../../../shared/component/Input";
import { editEvent } from "../../../redux/eventsSlice";
import { useDispatch } from "react-redux";
import { updateDatabaseRecord } from "../../../api/apiRequest";
import TimeEventSection from "./component/TimeEventSection";
import DetailsEventSection from "./component/DetailsEventSection";

export default function EditEventForm({ event, loggedUser, handleCloseEditPriorityPopup, handleAlert }) {
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

  const onSubmit = async (data) => {
    const editedData = {
      authorId: [loggedUser.id],
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
        <div className="flex space-x-2 sm:space-x-4">
          <Input
            label="Start date"
            errorMessage={errors.startDate?.message}
            register={register("startDate")}
          />
          <Input
            label="Start time"
            errorMessage={errors.startTime?.message}
            register={register("startTime")}
          />
        </div>
        <TimeEventSection register={register} errors={errors} />
        <DetailsEventSection register={register} errors={errors}/>
        <div className="flex justify-end pb-4">
          <Button type="submit" name="Edit" />
        </div>
      </form>
    </div>
  );
}
