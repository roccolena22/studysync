import Input from "../../../../shared/component/Input";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TimeEventSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function TimeEventSection({
  register,
  errors,
}: TimeEventSectionProps) {
  return (
    <>
      <div className="flex space-x-2 sm:space-x-4">
        <Input
          label="Start date"
          errorMessage={errors.startDate?.message as string | undefined}
          register={register("startDate")}
          type="date"
        />
        <Input
          label="Start time"
          errorMessage={errors.startTime?.message as string | undefined}
          register={register("startTime")}
          type="time"
        />
      </div>
      <div className="flex space-x-2 sm:space-x-4">
        <Input
          label="End date"
          errorMessage={errors.endDate?.message as string | undefined}
          register={register("endDate")}
          type="date"
        />
        <Input
          label="End time"
          errorMessage={errors.endTime?.message as string | undefined}
          register={register("endTime")}
          type="time"
        />
      </div>
    </>
  );
}
