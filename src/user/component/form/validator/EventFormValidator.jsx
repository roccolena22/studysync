import * as yup from "yup";

export const EventFormValidator = yup.object().shape({
  title: yup
    .string()
    .max(100, "The event name cannot exceed 100 characters")
    .required("The event name is required"),
  mode: yup.string().required("The mode is required"),
  info: yup
    .string()
    .max(100, "The additional info cannot exceed 100 characters"),
  startTime: yup.string().required("The starting time is mandatory"),
  endTime: yup.string().required("The end time is mandatory"),
  places: yup
    .mixed()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    ),
  location: yup.string().max(100, "Max. 100 characters"),
  platform: yup.string().max(100, "Max. 100 characters"),
});
