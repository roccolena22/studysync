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
  startDate: yup.string().required("The starting date is mandatory"),
  endDate: yup.string().required("The ending date is mandatory"),
  endTime: yup.string().required("The end time is mandatory"),
  places: yup
    .mixed()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    ),
  location: yup.string(),
  platform: yup.string().max(25, "Max. 25 characters"),
  link: yup.string().trim(),
});
