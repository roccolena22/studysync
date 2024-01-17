import * as yup from "yup";

export const EventFormValidator = yup.object().shape({
  title: yup
    .string()
    .max(60, "The event name cannot exceed 60 characters")
    .required("The event name is required")
    .trim(),
  mode: yup.string().required("The mode is required"),
  info: yup.string().max(20, "The additional info cannot exceed 20 characters"),
  startTime: yup.string().required("The starting time is mandatory"),
  endTime: yup.string().required("The end time is mandatory"),
  places: yup
    .mixed()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    ),
  location: yup.string().max(25, "Max. 25 characters"),
  platform: yup.string().max(25, "Max. 25 characters"),
  link: yup.string().trim(),
});
