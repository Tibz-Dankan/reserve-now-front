import React, { useState, useEffect } from "react";

export const useDetectReload = () => {
  //   const [isReload, setIsReload] = useState(false);

  const navigationType = performance.getEntriesByType("navigation")[0].type;
  const isReload = navigationType === "reload";

  console.log("reLoad");
  console.log(isReload);

  //   useEffect(() => {
  //     setIsReload(reLoad);
  //   }, []);

  return { isReload };
};
