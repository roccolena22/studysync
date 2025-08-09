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
info?: string;
}

export interface Booking {
  id: string;
  bookedId: string;
  eventId: string;
  authorId: string;
}

export interface Follower{
  id: string;
  idFrom: string[];
  idTo: string[];
}

export interface EventModel {
  id: string;
  email: string;
  role: string;
  endDate: Date;
  endTime: string;
  startDate: Date;
  startTime: string;
  authorId: string;
  bookingsRecordId?: string[];
  places: number;
  title: string;
  mode: string;
  location?: string;
  platform?: string;
  link?: string;
  info?: string;
  firstName: string;
  lastName: string;
}
