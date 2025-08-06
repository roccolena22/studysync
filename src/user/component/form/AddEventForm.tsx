import {
  useForm,
  SubmitHandler,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { EventFormValidator } from "./validator/EventFormValidator";
import Input from "../../../shared/component/Input";
import { addRecordToDatabase } from "../../../api/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import TimeEventSection from "./component/TimeEventSection";
import DetailsEventInForm from "./component/DetailsEventInForm";
import moment from "moment";
import { useEffect, useState } from "react";
import { fetchEvents } from "../../Utilities/fetchFunctions";
import AlertBanner from "../../../shared/component/AlertBanner";
import { AlertTypes, TabelName } from "../../../shared/models";

interface AddEventFormProps {
  startDate: any; // es. "DD/MM/YYYY"
  endDate: any; // es. "DD/MM/YYYY"
  startTime: any; // es. "HH:mm"
  endTime: any; // es. "HH:mm"
  handleClose: () => void;
  handleCreatedEventAlert: () => void;
  loggedUser: any;
}

export default function AddEventForm({
  startDate,
  endDate,
  startTime,
  endTime,
  handleClose,
  handleCreatedEventAlert,
  loggedUser,
}: AddEventFormProps) {
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const currentDate = new Date();

  const [formattedStartDate, setFormattedStartDate] = useState(
    moment(startDate, "DD/MM/YYYY").format("YYYY-MM-DD")
  );
  const [formattedEndDate, setFormattedEndDate] = useState(
    moment(endDate, "DD/MM/YYYY").format("YYYY-MM-DD")
  );

  const handleNoValidDateAlert = () => {
    setShowNoValidDateAlert((prev) => !prev);
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<any>({
    resolver: yupResolver(EventFormValidator),
    defaultValues: {
      startTime,
      endTime,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    },
  });

  const formatDateString = (dateString: string) =>
    moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD");

  useEffect(() => {
    setFormattedStartDate(formatDateString(startDate));
  }, [startDate]);

  useEffect(() => {
    setFormattedEndDate(formatDateString(endDate));
  }, [endDate]);

  const onSubmit: SubmitHandler<any> = async (data) => {
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

    if (!loggedUser?.id) {
      setAlertMessage("User not logged in");
      setShowNoValidDateAlert(true);
      return;
    }

    const fullEvent = {
      authorId: [loggedUser.id],
      ...data,
    };

    const result = await addRecordToDatabase(TabelName.EVENTS, fullEvent);
    fetchEvents(dispatch);
    if (result) handleCreatedEventAlert();
    handleClose();
  };

  return (
    <div className="w-full text-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Event name"
          errorMessage={errors.title?.message as string}
          register={register("title")}
          placeholder="Enter the name of the event?"
        />
        <TimeEventSection register={register} errors={errors} />
        <DetailsEventInForm register={register} errors={errors} />
        <div className="flex justify-end pt-10">
          <Button type="submit" name="Create" />
        </div>
      </form>
      {showNoValidDateAlert && (
        <AlertBanner text={alertMessage ?? ""} type={AlertTypes.ALERT} />
      )}
    </div>
  );
}
