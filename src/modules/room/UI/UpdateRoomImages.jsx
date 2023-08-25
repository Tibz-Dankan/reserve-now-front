import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { ImagePicker } from "../../../shared/UI/ImagePicker";
import { Button } from "../../../shared/UI/Button";
import { Loader } from "../../../shared/UI/Loader";
import { updateRoomImage } from "../API";
import sprite from "../../../assets/icons/sprite.svg";

export const UpdateRoomImages = () => {
  const [interiorRoomImage, setInteriorRoomImage] = useState(null);
  const [exteriorRoomImage, setExteriorRoomImage] = useState(null);
  const [bathRoomImage, setBathRoomImage] = useState(null);
  const [currentViewType, setCurrentViewType] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const room = useSelector((state) => state.room.editRoom);
  const dispatch = useDispatch();

  const interiorSelectHandler = (image) => {
    setInteriorRoomImage(image);
  };

  const exteriorSelectHandler = (image) => {
    setExteriorRoomImage(image);
  };

  const bathRoomSelectHandler = (image) => {
    setBathRoomImage(image);
  };

  const images = [
    {
      viewType: "interior",
      src: interiorRoomImage, //current format arraybuffer
      onSelectFn: interiorSelectHandler,
      additionalInfo: "Interior view image",
    },
    {
      viewType: "exterior",
      src: exteriorRoomImage, //current format arraybuffer
      onSelectFn: exteriorSelectHandler,
      additionalInfo: "Exterior view image",
    },
    {
      viewType: "bathroom",
      src: bathRoomImage, //current format arraybuffer
      onSelectFn: bathRoomSelectHandler,
      additionalInfo: "Bathroom view image",
    },
  ];

  const savedImages = room?.images;

  // const clearRoomImages = () => {
  //   setInteriorRoomImage(null);
  //   setExteriorRoomImage(null);
  //   setBathRoomImage(null);
  // };

  const { isLoading, data, mutate } = useMutation({
    mutationFn: updateRoomImage,
    onSuccess: (data) => {
      dispatch(
        showCardNotification({ type: "success", message: data.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const imageName = (viewType) => {
    return `${room.roomName}-${viewType}.png`;
  };

  const uploadRoomImageHandler = async (imageArrayBuffer, viewType) => {
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([imageArrayBuffer], { type: "image/*" }),
      imageName(viewType)
    );
    formData.append("viewType", viewType);
    const roomId = room.id;

    if (!roomId || !viewType || !room.roomName) {
      console.log("No roomId or viewType or roomName");
      return;
    }
    mutate({ roomId, formData, token });
  };

  const imageURLHandler = (imageArrayBuffer) => {
    if (!imageArrayBuffer) return;
    const blob = new Blob([imageArrayBuffer], { type: "image/*" });
    return URL.createObjectURL(blob);
  };

  const capitalizeFirstLetter = (word) => {
    if (!word) return;
    if (typeof word !== "string" || word?.length === 0) {
      throw new Error("Input must be a non-empty string");
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <Fragment>
      <div>
        <div className="border-b-[1px] border-gray-opacity mb-1 pb-2">
          <h1 className="text-xl font-semibold text-gray-dark-4">Images</h1>
        </div>
        <div className="flex flex-col items-start justify-center">
          {images.map((image, index) => {
            return (
              <div
                className="flex items-center justify-start gap-x-4 border-b-[1px]
                border-gray-opacity py-4 w-full"
                key={image.viewType}
              >
                <div className="relative group">
                  <svg
                    className="w-4 h-4 fill-gray-dark-3 cursor-pointer 
                   group-hover:fill-gray-400"
                  >
                    <use href={`${sprite}#icon-info`}></use>
                  </svg>
                  <span
                    className="absolute top-5 left-[88px] invisible opacity-0 w-
                     w-[130px] p-2 bg-gray-800 text-white text-xs rounded-md 
                     transform -translate-x-1/2 translate-y-2 transition-opacity duration-300 
                     group-hover:opacity-100 group-hover:visible z-40"
                  >
                    {image.additionalInfo}
                  </span>
                </div>
                <span className="font-light text-lg bg-green-400s w-[140px]">
                  {capitalizeFirstLetter(image.viewType)} image
                </span>
                {image.src && (
                  <img
                    src={imageURLHandler(image.src)}
                    className="w-[60px] h-[60px] rounded-lg"
                  />
                )}
                {!image.src &&
                  savedImages[index].viewType === image.viewType &&
                  savedImages[index].url && (
                    <img
                      src={savedImages[index].url}
                      className="w-[60px] h-[60px] rounded-lg"
                    />
                  )}
                <ImagePicker onSave={image.onSelectFn} />
                {!isLoading && image.src && (
                  <Button
                    type="submit"
                    className="bg-gray-light-1 rounded-md px-4 font-bold"
                    onClick={() => {
                      uploadRoomImageHandler(image.src, image.viewType),
                        setCurrentViewType(image.viewType);
                    }}
                  >
                    Upload
                  </Button>
                )}
                {isLoading && currentViewType === image.viewType && (
                  <Loader className="w-40" label="Uploading" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
