import PropTypes from "prop-types";
import cascadeImage from "./assets/cascade.jpg";
import huckleberryImage from "./assets/huckleberry.jpg";
import mcafeeImage from "./assets/mcafee.jpg";
import pandapasImage from "./assets/pandapas.jpg";
import shenandoahImage from "./assets/shenandoah.jpg";
import roanokeImage from "./assets/roanoke.jpg";
import VTImage from "./assets/VT.jpg";
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import APIService from "./APIService";
import { useNavigate } from "react-router-dom";

const GroupList = ({ data }) => {
  const navigate = useNavigate();

  // Create a mapping of group_name to image URLs
  const imageMapping = {
    CASCADE: cascadeImage,
    CASCADES: cascadeImage,
    HUCKLEBERRY: huckleberryImage,
    MCAFEE: mcafeeImage,
    PANDAPAS: pandapasImage,
    SHENANDOAH: shenandoahImage,
    ROANOKE: roanokeImage,
  };

  console.log("I am logging " + imageMapping["INDIA"]);
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // Three items per row
    gap: "50px", // Adjust the gap between items as needed
    marginTop: "50px",
  };

  const itemStyle = {
    border: "1px solid #ccc", // Add a border
    padding: "20px", // Add some padding
    height: "auto", // Set the height
    width: "auto", // Set the width
    backgroundColor: "#75787b", // Set the background color
  };

  const handleDeleteGroup = async (groupId) => {
    const response = await APIService.removeGroup(groupId);

    if (response.error == false) {
      setTimeout(() => {
        navigate("/"); // Replace with the actual home page URL
      }, 2000);
    }
  };

  return (
    <div style={gridStyle}>
      {data.map((item) => (
        <div className="grid-item" style={itemStyle} key={item.id}>
          <img
            src={
              imageMapping[item.travel_destination_name.split(" ")[0]] ||
              VTImage
            }
            alt={item.group_name}
            width="100"
            height="100"
          />
          <h2 style={{ color: "black" }}>{item.group_name}</h2>
          <p>
            Destination:{" "}
            {item.travel_destination_name.toUpperCase().charAt(0) +
              item.travel_destination_name.toLowerCase().slice(1)}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to={`/group/${item.id}`}>
              <Button style={{ backgroundColor: "#E5751F", border: "none" }}>
                <span style={{ color: "black" }}>View Details</span>
              </Button>
            </Link>
            <Button
              style={{ backgroundColor: "white", border: "4px solid orange" }}
              onClick={() => handleDeleteGroup(item.id)}
            >
              <span style={{ color: "black" }}>Delete Group</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

GroupList.propTypes = {
  data: PropTypes.array.isRequired, // Add prop type validation for 'data'
};

export default GroupList;
