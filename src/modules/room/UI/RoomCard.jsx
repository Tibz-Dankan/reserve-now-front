import React, { Fragment, useState } from "react";
import { Button } from "../../../shared/UI/Button";
import { Card } from "../../../shared/UI/Card";
import { LabelTag } from "../../../shared/UI/LabelTag";
import sprite from "../../../assets/icons/sprite.svg";
import { useSelector } from "react-redux";
import { RoomMenuList } from "./RoomMenuList";

export const RoomCard = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Fragment>
      <Card
        className="m-1 w-[280px] flex flex-col items-center justify-center
         space-y-2"
      >
        <img
          src={props?.images[0].url}
          alt={`${props?.roomName} ${props?.images[0].viewType} view`}
          className="bg-gray-light-3 w-full h-[220px] rounded-lg"
        />
        <div className="w-full flex items-center justify-between relative">
          <span>{props?.roomName}</span>
          {/* {user.role === "admin" && ( */}
          <svg
            className="w-[24px] h-[24px] fill-gray-dark-3 rotate-[90deg]
            cursor-pointer hover:bg-gray-light-3 rounded-[50%] hover:border-[1px]
            hover:border-gray-light-4"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <use href={`${sprite}#icon-dots-y`}></use>
          </svg>
          {showMenu && <RoomMenuList room={props.room} />}
          {/* )} */}
        </div>
        <div className="flex items-center justify-start w-full gap-x-1">
          {props?.beds &&
            props.beds.map((bed, index) => {
              return (
                <LabelTag
                  className="bg-primary px-2 py-[2px] text-gray-light-1 rounded-2xl"
                  key={index}
                >
                  {bed.bedType}
                </LabelTag>
              );
            })}
        </div>
        <div className="w-full text-start space-x-1">
          <span>{props?.price.amount}</span>
          <span>{props?.price.currency}</span>
          <span>per night</span>
        </div>
        <div className="w-full">
          <Button className="w-full font-bold">Book</Button>
        </div>
      </Card>
    </Fragment>
  );
};
