import { useState } from "react";
import Input from "../../../../shared/component/Input";
import DropdownMenu from "../../shared/DropdownMenu"

export default function DetailsEventSection ({register, errors}) {
    const [selectedMode, setSelectedMode] = useState("In person");
    const modes = ["In person", "Remotely", "Mixed"];

    return(
        <>
        <div className="flex space-x-2 sm:space-x-4">

          <DropdownMenu
            label="Mode:"
            register={register("mode")}
            options={modes}
            errorMessage={errors.mode?.message}
            onOptionSelected={(option) => setSelectedMode(option)}
          />
          <div className="w-full lg:w-48">
            <Input
              label="Places available"
              errorMessage={errors.location?.message}
              register={register("places")}
              type="number"
            />
          </div>
        </div>

        {selectedMode === "In person" && (
          <Input
            label="Location"
            errorMessage={errors.location?.message}
            register={register("location")}
            placeholder="Where will the event take place, in a physical location?"
          />
        )}

        {selectedMode === "Remotely" && (
          <div>
            <Input
              label="Platform"
              errorMessage={errors.platform?.message}
              register={register("platform")}
              placeholder="Where will the event take place, on a meeting platform?"
            />
            <Input
              label="Link"
              errorMessage={errors.link?.message}
              register={register("link")}
              placeholder="Meeting link?"
            />
          </div>
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
          label="Info (optional)"
          errorMessage={errors.info?.message}
          register={register("info")}
        />
        </>
    )
}