import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { EventFormValidator } from "./validator/EventFormValidator";
import Input from "../../../shared/component/Input";
import TimeEventSection from "./component/TimeEventSection";
import DetailsEventInForm from "./component/DetailsEventInForm";
import { useState } from "react";
import AlertBanner from "../../../shared/component/AlertBanner";
import { AlertTypes } from "../../../shared/models";
import { updateEventRecord } from "../../../api/apiEvents";
import { EventModel } from "../../models";
import moment from "moment";

interface EditEventFormProps {
  event: EventModel;
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
      startDate: moment(event.startDate).format("YYYY-MM-DD"),
      endDate: moment(event.endDate).format("YYYY-MM-DD"),
      startTime: moment(event.startDate).format("HH:mm"),
      endTime: moment(event.endDate).format("HH:mm"),
      places: event.places,
      link: event.link,
    },
  });

  const currentDate = new Date();

  const onSubmit = async (data: any) => {
    const start = moment(`${data.startDate} ${data.startTime}`, "YYYY-MM-DD HH:mm").toDate();
    const end = moment(`${data.endDate} ${data.endTime}`, "YYYY-MM-DD HH:mm").toDate();

    if (start <= currentDate || end <= currentDate) {
      handleNoValidDateAlert();
      setAlertMessage("You cannot create an event in the past");
      return;
    }

    if (start >= end) {
      handleNoValidDateAlert();
      setAlertMessage("The start and end dates are not consistent");
      return;
    }

    // Escludi startTime e endTime e invia startDate e endDate come Date
    const { startTime, endTime, ...restData } = data;

    const editedData = {
      ...restData,
      startDate: start,
      endDate: end,
      location:
        data.mode === "In person" || data.mode === "Mixed" ? data.location : "",
      platform:
        data.mode === "Remotely" || data.mode === "Mixed" ? data.platform : "",
    };

    const result = await updateEventRecord(event.id, editedData);

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
          <Button type="submit" label="Save" />
        </div>
      </form>
      {showNoValidDateAlert && (
        <AlertBanner text={alertMessage ?? ""} type={AlertTypes.ERROR} />
      )}
    </div>
  );
}
