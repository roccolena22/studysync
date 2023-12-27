import { Link } from "react-router-dom";
import Button from "../../../shared/component/Button";

export default function NoEvents () {
    return(
        <div className="flex justify-between items-center pt-6">
        <span className="text-lg text-slate-400">No events to show</span>
        <Link to="/calendar">
        <Button outline small>New event</Button>
        </Link>
      </div>
    )
}