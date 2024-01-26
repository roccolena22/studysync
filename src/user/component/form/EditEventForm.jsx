import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { EventFormValidator } from "./validator/EventFormValidator";
import Input from "../../../shared/component/Input";
import { useDispatch } from "react-redux";
import { updateDatabaseRecord } from "../../../api/apiRequest";
import TimeEventSection from "./component/TimeEventSection";
import DetailsEventInForm from "./component/DetailsEventInForm";
import { fetchEvents } from "../../Utilities/fetchFunctions";
import { useState } from "react";
import AlertBanner from "../shared/AlertBanner";

export default function EditEventForm({
  event,
  handleCloseEditPriorityPopup,
  handleisEditedAlert,
}) {
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleNoValidDateAlert = () => {
    setShowNoValidDateAlert(!showNoValidDateAlert);
  };
  const dispatch = useDispatch();

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
      link: event.link,
    },
  });

  const currentDate = new Date();

  const onSubmit = async (data) => {
    const start = new Date(data.startDate + " " + data.startTime);
    const end = new Date(data.endDate + " " + data.endTime);

    if (start <= currentDate || end <= currentDate) {
      handleNoValidDateAlert(!showNoValidDateAlert);
      setAlertMessage("You cannot create an event in the past");
      return;
    } else if (start >= end) {
      handleNoValidDateAlert(!showNoValidDateAlert);
      setAlertMessage("The start and end dates are not consistent");
      return;
    }

    const editedData = {
      title: data.title,
      mode: data.mode,
      location:
        data.mode === "In person" || data.mode === "Mixed" ? data.location : "",
      platform:
        data.mode === "Remotely" || data.mode === "Mixed" ? data.platform : "",
      startTime: data.startTime,
      endTime: data.endTime,
      places: data.places,
      info: data.info,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    const result = await updateDatabaseRecord("events", event.id, editedData);
    fetchEvents(dispatch);
    handleCloseEditPriorityPopup(false);
    result && handleisEditedAlert();
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
      {showNoValidDateAlert && <AlertBanner text={alertMessage} type="alert" />}
    </div>
  );
}
