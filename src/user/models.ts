export interface User {
id: string;
email: string;
firstName: string;
lastName: string;
role: string;
password?: string;
eventIds?: string[];
followingIds?: string[];
followerIds?: string[];
}

export interface Event {
  id: string;
  email: string;
  role: string;
  endDate: string;
  endTime: string;
  startDate: string;
  startTime: string;
  authorId: string;
  bookingsRecordId?: string[];
  places?: number;
  title: string;
  mode?: string;
  location?: string;
  platform?: string;
  link?: string;
  info?: string;
  firstName?: string;
  lastName?: string;
}

export interface Booking {
  id: string;
  bookedId: string;
  eventId: string;
  authorId: string;
}

export interface Follower{
  id: string;
  idFrom: string;
  idTo: string;
}