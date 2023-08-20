import React, { useEffect, Fragment, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { IconButton } from "./IconButton";

export const ImagePicker = (props) => {
  const [photo, setPhoto] = useState(null);

  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },

    maxFileSize: 50,
  });
  useEffect(() => {
    filesContent.map((file, index) => {
      return setPhoto(file.content);
    });
  }, [filesContent]);
  //   TODO: include webcam capture
  //   TODO: include drag and drop

  const saveHandler = () => {
    props.onSave(photo);
  };
  useEffect(() => {
    console.log("Photo selected");
    console.log(photo);
    saveHandler();
  }, [photo]);

  return (
    <Fragment>
      <div className="flex items-center justify-center gap-x-2">
        {!photo && (
          <IconButton
            icon="cloud-check"
            onClick={() => openFileSelector()}
            label="Choose from computer"
            iconClass="w-[24px] h-[24px] fill-gray-light-2"
          />
        )}
        {photo && (
          <IconButton
            icon="cross"
            onClick={() => setPhoto(null)}
            label="Cancel"
            iconClass="w-[12px] h-[12px] fill-gray-light-2"
          />
        )}
      </div>
    </Fragment>
  );
};
