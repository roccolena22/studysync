import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { EventFormValidator } from "./validator/EventFormValidator";
import Input from "../../../shared/component/Input";
import DropdownMenu from "../shared/DropdownMenu";
import { useState } from "react";
import { addToDatabase } from "../../../api/apiRequest";
import { useDispatch } from "react-redux";
import { setEvent } from "../../../redux/eventsSlice";

export default function AddEventForm({
  loggedUser,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  endTime,
  handleAlert
}) {
  const [selectedMode, setSelectedMode] = useState("In person");

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

    await addToDatabase("events", fullEvent);
    dispatch(setEvent([fullEvent]));
    handleAlert()
    setStartDate(null);
    setEndDate(null);
    reset();
  };

  const modes = ["In person", "Remotely", "Mixed"];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-2 sm:space-x-4">
          <Input
            label="Event name"
            errorMessage={errors.title?.message}
            register={register("title")}
            placeholder="Enter the name of the event?"
          />
          <div className="w-full lg:w-48">
            <Input
              label="Places available"
              errorMessage={errors.location?.message}
              register={register("places")}
              type="number"
              placeholder="Limits of participants"
            />
          </div>
        </div>

        <DropdownMenu
          label="Mode:"
          register={register("mode")}
          options={modes}
          errorMessage={errors.mode?.message}
          onOptionSelected={(option) => setSelectedMode(option)}
        />

        {selectedMode === "In person" && (
          <Input
            label="Location"
            errorMessage={errors.location?.message}
            register={register("location")}
            placeholder="Where will the event take place, in a physical location?"
          />
        )}

        {selectedMode === "Remotely" && (
          <Input
            label="Platform"
            errorMessage={errors.platform?.message}
            register={register("platform")}
            placeholder="Where will the event take place, on a meeting platform?"
          />
        )}

        {selectedMode === "Mixed" && (
          <div className="flex space-x-2 sm:space-x-4">
            <Input
              label="Location"
              errorMessage={errors.location?.message}
              register={register("location")}
              placeholder="Physical location?"
            />
            <Input
              label="Platform"
              errorMessage={errors.platform?.message}
              register={register("platform")}
              placeholder="Meeting platform?"
            />
          </div>
        )}

        <Input
          label="Additional info (optional)"
          errorMessage={errors.info?.message}
          register={register("info")}
          placeholder="Do you want to specify more information?"
        />
        <div className="flex space-x-2 sm:space-x-4">
          <Input
            label="Start time"
            errorMessage={errors.startTime?.message}
            register={register("startTime")}
            type="text"
          />
          <Input
            label="End time"
            errorMessage={errors.endTime?.message}
            register={register("endTime")}
            type="text"
          />
        </div>

        <div className="flex justify-end py-4">
          <Button type="submit" name="Create" />
        </div>
      </form>
    </div>
  );
}
