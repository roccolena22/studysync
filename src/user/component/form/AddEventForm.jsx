import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { EventFormValidator } from "./validator/EventFormValidator";
import Input from "../../../shared/component/Input";
import { addRecordToDatabase } from "../../../api/apiRequest";
import { useDispatch } from "react-redux";
import { addEvent } from "../../../redux/eventsSlice";
import TimeEventSection from "./component/TimeEventSection";
import DetailsEventSection from "./component/DetailsEventSection";

export default function AddEventForm({
  loggedUser,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  endTime,
  handleCreatedEventAlert,
}) {

  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    resolver: yupResolver(EventFormValidator),
    defaultValues: {
      startTime: startTime,
      endTime: endTime,
    },
  });

  const onSubmit = async (data) => {
    const fullEvent = {
      authorId: [loggedUser.id],
      startDate,
      endDate,
      ...data,
    };
    await addRecordToDatabase("events", fullEvent);
    dispatch(addEvent([fullEvent]));
    handleCreatedEventAlert()
    setStartDate(null);
    setEndDate(null);
    reset();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Event name"
          errorMessage={errors.title?.message}
          register={register("title")}
          placeholder="Enter the name of the event?"
        />
        <DetailsEventSection register={register} errors={errors} />
        <TimeEventSection register={register} errors={errors} />
        <div className="flex justify-end pt-10">
          <Button type="submit" name="Create" />
        </div>
      </form>
    </div>
  );
}
