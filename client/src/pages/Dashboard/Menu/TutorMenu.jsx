import MenuItem from "./MenuItem";
import { IoCreateOutline } from "react-icons/io5";
import { FaRegRectangleList } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdCalendarViewDay } from "react-icons/md";

const TutorMenu = () => {
  return (
    <>
      <MenuItem
        icon={IoCreateOutline}
        label="Create Session"
        address="create-session"
      />
      <MenuItem
        icon={FaRegRectangleList}
        label="My Listing Sessions"
        address="my-listing-sessions"
      />
      <MenuItem
        icon={IoCloudUploadOutline}
        label="Upload Materials"
        address="upload-materials"
      />
      <MenuItem
        icon={MdCalendarViewDay}
        label="View All Meterials"
        address="view-all-meterials"
      />
    </>
  );
};

export default TutorMenu;
