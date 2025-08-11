export enum AlertTypes {
  ERROR = "error",
  SUCCESS = "success",
  ALERT = "alert",
}

export enum UserRoles {
  TEACHER = "teacher",
  STUDENT = "student",
}

export enum MessageTypes {
  ERROR = "error",
  HIGHLIGHTED = "highlighted",
  DEFAULT = "default",
}

export enum TabelName {
  USERS = "users",
  EVENTS = "events",
  BOOKINGS = "bookings",
FOLLOWERS = "followers"
}

const primaryColor = "cyan-700"
const secondaryColor = "white"

export enum DefaultColor{
  PRIMARY_COLOR = primaryColor,
  SECONDARY_COLOR = secondaryColor,
  BG_PRIMARY_COLOR = `bg-${primaryColor}`,
  BG_SECONDARY_COLOR = `bg-${secondaryColor}`,
  BORDER_PRIMARY_COLOR = `border-${primaryColor}`,
  BORDER_SECONDARY_COLOR = `border-${secondaryColor}`,
  TEXT_PRIMARY_COLOR = `text-${primaryColor}`,
  TEXT_SECONDARY_COLOR = `text-${secondaryColor}`,
  FROM_PRIMARY_COLOR = `from-${primaryColor}`
}