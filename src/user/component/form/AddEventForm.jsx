import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { EventFormValidator } from "./validator/EventFormValidator";
import Input from "../../../shared/component/Input";
import DropdownMenu from "../shared/DropdownMenu";
import { useState } from "react";
import { addToDatabase } from "../../../api/apiRequest";
import { useDispatch } from "react-redux";
import { addEvent } from "../../../redux/eventsSlice";

export default function AddEventForm({
  loggedUser,
  selectedDate,
  handleEventsFromForm,
  setSelectedDate,
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
  });

  const onSubmit = (data) => {
    data.start = moment(selectedDate);
    data.end = moment(selectedDate);
    data.authorId = loggedUser.id;
    data.authorEmail = loggedUser.email;
    data.authorFirstName = loggedUser.firstName;
    data.authorLastName = loggedUser.lastName;

    const EventArray = [
      {
        title: data.title,
        location: data.location,
        platform: data.platform,
        startTime: data.startTime,
        endTime: data.endTime,
        mode: data.mode,
        places: data.places,
        info: data.info,
        // start: data.start,
        // end: data.end,
        authorEmail: data.authorEmail,
        authorId: data.authorId,
        authorFirstName: data.authorFirstName,
        authorLastName: data.authorLastName,
      },
    ];

    addToDatabase("events", EventArray);
    dispatch(addEvent(EventArray))

    handleEventsFromForm(data);
    setSelectedDate(null);
    reset();
  };

  const modes = ["In person", "Remotely", "Mixed"];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-4">
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
          <div className="flex space-x-4">
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
        <div className="flex space-x-4">
          <Input
            label="Start time"
            errorMessage={errors.startTime?.message}
            register={register("startTime")}
            type="time"
          />
          <Input
            label="End time"
            errorMessage={errors.endTime?.message}
            register={register("endTime")}
            type="time"
          />
        </div>

        <div className="flex justify-end pb-4">
          <Button type="submit" name="Create" />
        </div>
      </form>
    </div>
  );
}
