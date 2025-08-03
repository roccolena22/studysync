import { useForm } from "react-hook-form";
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
import { AlertTypes } from "../../../shared/models";

export default function AddEventForm({
  startDate,
  endDate,
  startTime,
  endTime,
  handleClose,
  handleCreatedEventAlert,
}) {
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const loggedUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const currentDate = new Date();

  const handleNoValidDateAlert = () => {
    setShowNoValidDateAlert(!showNoValidDateAlert);
  };
  const [formattedStartDate, setFormattedStartDate] = useState(
    moment(startDate, "DD/MM/YYYY").format("YYYY-MM-DD")
  );
  const [formattedEndDate, setFormattedEndDate] = useState(
    moment(endDate, "DD/MM/YYYY").format("YYYY-MM-DD")
  );

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(EventFormValidator),
    defaultValues: {
      startTime: startTime,
      endTime: endTime,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    },
  });

  const formatDateString = (dateString) =>
    moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD");

  useEffect(() => {
    setFormattedStartDate(formatDateString(startDate));
  }, [startDate]);

  useEffect(() => {
    setFormattedEndDate(formatDateString(endDate));
  }, [endDate]);

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

    const fullEvent = {
      authorId: [loggedUser.id],
      ...data,
    };
    const result = await addRecordToDatabase("events", fullEvent);
    fetchEvents(dispatch);
    result && handleCreatedEventAlert();
    handleClose();
  };

  return (
    <div className="w-full text-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Event name"
          errorMessage={errors.title?.message}
          register={register("title")}
          placeholder="Enter the name of the event?"
        />
        <TimeEventSection register={register} errors={errors} />
        <DetailsEventInForm register={register} errors={errors} />
        <div className="flex justify-end pt-10">
          <Button type="submit" name="Create" />
        </div>
      </form>
      {showNoValidDateAlert && <AlertBanner text={alertMessage} type={AlertTypes.ALERT} />}
    </div>
  );
}
