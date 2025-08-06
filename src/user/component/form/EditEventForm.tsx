import { useForm, FieldErrors, UseFormRegister } from "react-hook-form";
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
import AlertBanner from "../../../shared/component/AlertBanner";
import { AlertTypes, TabelName } from "../../../shared/models";

interface Event {
  id: string;
  title: string;
  location: string;
  platform: string;
  info: string;
  mode: "In person" | "Remotely" | "Mixed";
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  places: number;
  link?: string;
}

interface EditEventFormProps {
  event: Event;
  handleCloseEditPriorityPopup: (value: boolean) => void;
  handleisEditedAlert: () => void;
}

export default function EditEventForm({
  event,
  handleCloseEditPriorityPopup,
  handleisEditedAlert,
}: EditEventFormProps) {
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleNoValidDateAlert = () => {
    setShowNoValidDateAlert((prev) => !prev);
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

  const onSubmit = async (data: any) => {
    const start = new Date(data.startDate + " " + data.startTime);
    const end = new Date(data.endDate + " " + data.endTime);

    if (start <= currentDate || end <= currentDate) {
      handleNoValidDateAlert();
      setAlertMessage("You cannot create an event in the past");
      return;
    } else if (start >= end) {
      handleNoValidDateAlert();
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
    const result = await updateDatabaseRecord(TabelName.EVENTS, event.id, editedData);
    fetchEvents(dispatch);
    handleCloseEditPriorityPopup(false);
    if (result) {
      handleisEditedAlert();
    }
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
      {showNoValidDateAlert && (
        <AlertBanner text={alertMessage ?? ""} type={AlertTypes.ERROR} />
      )}
    </div>
  );
}
