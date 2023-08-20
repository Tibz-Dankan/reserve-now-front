import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { ImagePicker } from "../../../shared/UI/ImagePicker";
import { Button } from "../../../shared/UI/Button";
import { Loader } from "../../../shared/UI/Loader";
import { updateAddRoomStage } from "../../../store/actions/room";
import { updateRoomImage } from "../API";
import sprite from "../../../assets/icons/sprite.svg";

export const AddRoomImages = () => {
  const [interiorRoomImage, setInteriorRoomImage] = useState(null);
  const [exteriorRoomImage, setExteriorRoomImage] = useState(null);
  const [bathRoomImage, setBathRoomImage] = useState(null);

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
    },
    {
      viewType: "exterior",
      src: exteriorRoomImage, //current format arraybuffer
      onSelectFn: exteriorSelectHandler,
    },
    {
      viewType: "bathroom",
      src: bathRoomImage, //current format arraybuffer
      onSelectFn: bathRoomSelectHandler,
    },
  ];

  const clearRoomImages = () => {
    setInteriorRoomImage(null);
    setExteriorRoomImage(null);
    setBathRoomImage(null);
  };

  const token = useSelector((state) => state.auth.token);
  const room = useSelector((state) => state.room.newRoom);
  const dispatch = useDispatch();

  const { isLoading, data, mutate } = useMutation({
    mutationFn: updateRoomImage,
    onSuccess: (data) => {
      dispatch(
        showCardNotification({ type: "success", message: data.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      dispatch(updateAddRoomStage(3));
      clearRoomImages();
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

  const uploadRoomImageHandler = (imageArrayBuffer, viewType) => {
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

  const uploadImages = () => {
    images.map((image) => {
      if (image.src && image.viewType) {
        uploadRoomImageHandler(image.src, image.viewType);
      }
    });
  };

  // const imageURLHandler = (imageArrayBuffer) => {
  //   let url;
  //   if (!imageArrayBuffer) return;
  //   const reader = new FileReader();
  //   reader.readAsDataURL(new Blob([imageArrayBuffer], { type: "image/png" }));

  //   console.log("reader");
  //   console.log(reader);
  //   console.log("reader.result");
  //   console.log(reader.result);

  //   reader.onload = () => {
  //     url = reader.result;
  //   };
  //   console.log("url");
  //   console.log(url);
  //   return url;
  // };

  return (
    <Fragment>
      <div>
        <div className="flex flex-col items-start justify-center px-4 sm:px-8">
          {images.map((image) => {
            return (
              <div
                className="flex items-center justify-start gap-x-4 border-t-[1px]
                border-gray-opacity py-4 w-full "
              >
                <div className="relative group">
                  <svg
                    className="w-[18px] h-[18px] fill-gray-dark-3 cursor-pointer 
                   group-hover:fill-gray-400"
                  >
                    <use href={`${sprite}#icon-info`}></use>
                  </svg>
                  <span
                    className="absolute top-5 left-[88px] invisible opacity-0 w-
                     w-[200px] p-1 bg-gray-800 text-white text-xs rounded-md 
                     transform -translate-x-1/2 translate-y-2 transition-opacity duration-300 
                     group-hover:opacity-100 group-hover:visible z-40"
                  >
                    {"More info about interior images"}
                  </span>
                </div>
                <span className="text-lg bg-green-400s w-[140px]">
                  {image.viewType} image
                </span>
                {image.src && (
                  <img
                    src={image.src}
                    // src={imageURLHandler(image.src)}
                    className="w-[60px] h-[60px] rounded-lg"
                  />
                )}
                <ImagePicker onSave={image.onSelectFn} />
              </div>
            );
          })}
        </div>
        <div
          className="w-full border-t-[1px] border-gray-opacity p-4 sm:px-8 bottom-0 
               right-0 left-0 z-50 bg-gray-light-1 rounded-bl-lg rounded-br-lg"
        >
          {!isLoading && (
            <Button
              type="submit"
              className="bg-gray-light-1 rounded-md px-4 font-bold"
              onClick={() => uploadImages()}
            >
              Upload
            </Button>
          )}
          {isLoading && <Loader className="w-40" label="Uploading" />}
        </div>
      </div>
    </Fragment>
  );
};
