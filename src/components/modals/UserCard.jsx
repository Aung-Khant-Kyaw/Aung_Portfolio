import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { blue500 } from "material-ui/styles/colors";
import "../../styles/userCard.css";

const UserCard = ({ username, avatar, email }) => {
	const [photo, setPhoto] = useState("");
	
	useEffect(() => {
		setPhoto(`profile_images/${avatar}`);
	}, []);
	
	return (
    <div className="card-container">
      <div className="business">
        <Avatar
          sx={{
            bgcolor: blue500,
            height: 50,
            width: 50,
          }}
          src={photo}
        />
        <div className="cardInfo">
			<div className="job_title"> {username} </div>
        	<div> {email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
