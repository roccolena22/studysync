import Input from "../../../../shared/component/Input";

export default function TimeEventSection({ register, errors }) {
  return (
    <>
      <div className="flex space-x-2 sm:space-x-4">
        <Input
          label="Start date"
          errorMessage={errors.startDate?.message}
          register={register("startDate")}
          type="date"
        />
        <Input
          label="Start time"
          errorMessage={errors.startTime?.message}
          register={register("startTime")}
          type="time"
        />
      </div>
      <div className="flex space-x-2 sm:space-x-4">

        <Input
          label="End date"
          errorMessage={errors.endDate?.message}
          register={register("endDate")}
          type="date"
        />
        <Input
          label="End time"
          errorMessage={errors.endTime?.message}
          register={register("endTime")}
          type="time"
        />
      </div>

    </>

  )
}