import Input from "../../../../shared/component/Input";

export default function TimeEventSection({ register, errors }) {
  return (
    <div className="flex space-x-2 sm:space-x-4">
      <Input
        label="End date"
        errorMessage={errors.endDate?.message}
        register={register("endDate")}
      />
      <Input
        label="End time"
        errorMessage={errors.endTime?.message}
        register={register("endTime")}
      />
    </div>
  )
}