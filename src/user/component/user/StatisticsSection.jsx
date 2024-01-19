import React from "react";
import moment from "moment";
import ManageUsers from "../user/ManageUsers";
import Gadget from "../user/Gadget";
import { useSelector } from "react-redux";

export default function StatisticsSection({
  users,
  followers,
  loggedUser,
  activeEvents,
  bookedEvents,
  fetchFollowers,
  nextEvents
}) {

  function countEventsForToday(events) {
    const today = moment().format("YYYY-MM-DD");
  
    const eventsForToday = events.filter((event) => {
      return event.startDate === today;
    });
  
    return eventsForToday.length;
  }
  
  return (
    <div className="grid grid-cols-1 gap-2 pt-6 w-full">
      <div className="grid gap-2 sm:grid-cols-2">
        <ManageUsers
          users={users}
          followers={followers}
          loggedUser={loggedUser}
          fetchFollowers={fetchFollowers}
        />
        <div className="grid grid-cols-1 gap-2">
          <Gadget title="Today's events:" value={countEventsForToday(nextEvents)} />
          <Gadget
            title="All next events:"
            value={nextEvents.length}
          />
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 w-full">
        <Gadget
          title="My active events:"
          value={activeEvents ? activeEvents.length : "0"}
        />
        <Gadget
          title="Events I am booked for:"
          value={bookedEvents ? bookedEvents.length : "0"}
        />
      </div>
    </div>
  );
}
