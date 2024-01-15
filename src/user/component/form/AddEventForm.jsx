import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { EventFormValidator } from "./validator/EventFormValidator";
import Input from "../../../shared/component/Input";
import { addRecordToDatabase } from "../../../api/apiRequest";
import { useDispatch } from "react-redux";
import { addEvent } from "../../../redux/slices/eventsSlice";
import TimeEventSection from "./component/TimeEventSection";
import DetailsEventInForm from "./component/DetailsEventInForm";
import moment from "moment";
import { useEffect, useState } from "react";

export default function AddEventForm({
  loggedUser,
  startDate,
  endDate,
  startTime,
  endTime,
  handleCreatedEventAlert,
  handleClose,
  handleNoValidDateAlert
}) {

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

  useEffect(() => {
    setFormattedStartDate(moment(startDate, "DD/MM/YYYY").format("YYYY-MM-DD"));
  }, [startDate]);

  useEffect(() => {
    setFormattedEndDate(moment(endDate, "DD/MM/YYYY").format("YYYY-MM-DD"));
  }, [endDate]);
  const dispatch = useDispatch();
  const currentDate = new Date();

  const onSubmit = async (data) => {
    const start = new Date(data.startDate + " " + data.startTime);
    const end = new Date(data.endDate + " " + data.endTime);

    if (start < currentDate || end <= currentDate || start >= end) {
      handleNoValidDateAlert();
      return;
    }
    const fullEvent = {
      authorId: [loggedUser.id],
      ...data,
    };
    await addRecordToDatabase("events", fullEvent);
    dispatch(addEvent({
      ...data,
      authorId: loggedUser.id,
      lastName: loggedUser.lastName,
      firstName: loggedUser.firstName,
      email: loggedUser.email,
      role: loggedUser.role,
    }));
    handleCreatedEventAlert();
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
    </div>
  );
}
