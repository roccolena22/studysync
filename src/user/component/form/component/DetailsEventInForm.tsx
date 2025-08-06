import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import Input from "../../../../shared/component/Input";
import DropdownMenu from "../../shared/DropdownMenu";


interface DetailsEventInFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function DetailsEventInForm({
  register,
  errors,
}: DetailsEventInFormProps) {
  const [selectedMode, setSelectedMode] = useState<any["mode"]>("In person");
  const modes: any["mode"][] = ["In person", "Remotely", "Mixed"];

  return (
    <>
      <div className="flex space-x-2 sm:space-x-4">
        <DropdownMenu
          label="Mode:"
          register={register("mode")}
          options={modes}
          errorMessage={errors.mode?.message as string | undefined}
          onOptionSelected={(option: any["mode"]) => setSelectedMode(option)}
        />
        <div className="w-full lg:w-48">
          <Input
            label="Places available"
            errorMessage={errors.places?.message as string | undefined}
            register={register("places")}
            type="number"
          />
        </div>
      </div>

      {selectedMode === "In person" && (
        <Input
          label="Location"
          errorMessage={errors.location?.message as string | undefined}
          register={register("location")}
          placeholder="where will it take place?"
        />
      )}

      {selectedMode === "Remotely" && (
        <div>
          <Input
            label="Platform"
            errorMessage={errors.platform?.message as string | undefined}
            register={register("platform")}
            placeholder="Where will the event take place, on a meeting platform?"
          />
          <Input
            label="Link"
            errorMessage={errors.link?.message as string | undefined}
            register={register("link")}
            placeholder="Meeting link"
          />
        </div>
      )}

      {selectedMode === "Mixed" && (
        <>
          <div className="flex space-x-2 sm:space-x-4">
            <Input
              label="Location"
              errorMessage={errors.location?.message as string | undefined}
              register={register("location")}
              placeholder="Physical location?"
            />
            <Input
              label="Platform"
              errorMessage={errors.platform?.message as string | undefined}
              register={register("platform")}
              placeholder="where will it take place?"
            />
          </div>
          <Input
            label="Link"
            errorMessage={errors.link?.message as string | undefined}
            register={register("link")}
            placeholder="Meeting link"
          />
        </>
      )}

      <Input
        label="Info (optional)"
        errorMessage={errors.info?.message as string | undefined}
        register={register("info")}
        placeholder="Add a little additional info"
      />
    </>
  );
}
