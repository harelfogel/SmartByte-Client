import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRooms } from "./../../store/rooms/rooms.actions";
import Room from "../../components/Rooms/Room";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import classes from "./RoomsDashboard.module.scss";

const RoomsDashboard = ({ fetchRooms, rooms }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchRooms) {
      fetchRooms();
    }
  }, [fetchRooms]);

  const onClickRoomHandler = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  if (!rooms) {
    return null;
  }

  return (
    <div className={classes.Row}>
      {Object.entries(rooms).map((roomData) => {
        const roomId = roomData[0];
        const room = roomData[1];
        return (
          <div
            data-test={`room-card-${roomId}`}
            key={roomId}
            className={classes.Column}
            onClick={() => onClickRoomHandler(roomId)}
          >
            <Room
              id={roomId}
              name={room.name}
              icon={room.icon}
              devicesCount={room.devicesCount}
            />
          </div>
        );
      })}
       <Outlet />
    </div>
  );
};

RoomsDashboard.propTypes = {
  fetchRooms: PropTypes.func,
  rooms: PropTypes.object,
};

const mapStateToProps = (state) => ({
  rooms: state.rooms.rooms,
});

const mapDispatchToProps = {
  fetchRooms,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsDashboard);
