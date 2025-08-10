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
import AlertBanner from "../../../shared/component/AlertBanner";
import { AlertTypes, TabelName } from "../../../shared/models";
import { addEventRecord } from "../../../api/apiEvents";

interface AddEventFormProps {
  handleClose: () => void;
  handleCreatedEventAlert: () => void;
   loggedUserId: string;
  startDate?: any; 
  endDate?: any; 
  startTime?: any; 
  endTime?: any;
}

export default function AddEventForm({
  startDate,
  endDate,
  startTime,
  endTime,
  handleClose,
  handleCreatedEventAlert,
  loggedUserId,
}: AddEventFormProps) {
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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
  const start = moment(`${data.startDate} ${data.startTime}`, "YYYY-MM-DD HH:mm").toDate();
  const end = moment(`${data.endDate} ${data.endTime}`, "YYYY-MM-DD HH:mm").toDate();
  const currentDate = new Date();

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
  if (!loggedUserId) {
    setAlertMessage("User not logged in");
    setShowNoValidDateAlert(true);
    return;
  }

  // Estrai startTime e endTime da data, mantenendo tutti gli altri campi
  const { startTime, endTime, ...restData } = data;

  // Crea l'evento con startDate e endDate modificati come Date oggetto
  const fullEvent = {
    ...restData,
    startDate: start,
    endDate: end,
    authorId: [loggedUserId],
    creationDate: new Date().toISOString(),
  };

  const result = await addEventRecord(fullEvent);

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
          <Button type="submit" label="Create" />
        </div>
      </form>
      {showNoValidDateAlert && (
        <AlertBanner text={alertMessage ?? ""} type={AlertTypes.ALERT} />
      )}
    </div>
  );
}
