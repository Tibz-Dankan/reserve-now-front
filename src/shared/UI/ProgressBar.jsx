import React, { Fragment } from "react";

export const ProgressBar = (props) => {
  const generateStagesArray = () => {
    const stages = [];
    for (let i = 1; i <= props?.stageNum; i++) {
      stages.push(i);
    }
    return stages;
  };

  const stages = generateStagesArray();
  const stageLabelList = props.stageLabelList;

  const filledCircle = (index) => {
    const currentStage = 2;
    console.log("currentStage === index");
    console.log(currentStage === index);
    return currentStage === index;
  };

  // const filledCircle = (index) => props.currentStage === index;
  const filledBar = (index) => {
    const currentStage = 2;
    console.log("currentStage < index");
    console.log(currentStage < index);
    return currentStage < index;
  };
  // const filledBar = (index) => props.currentStage < index;

  return (
    <Fragment>
      <div className="w-full flex items-center justify-center mb-4 mt-12">
        {stages.map((stage, index) => {
          return (
            <div key={stage}>
              {stage === stages.length && (
                <div className="relative ">
                  <label
                    className="absolute top-[-32px] left-[-20px] 
                     w-auto h-auto text-gray-dark-2  text-center font-bold"
                  >
                    {stage === stageLabelList[index].stage &&
                      stageLabelList[index].label}
                  </label>
                  <span
                    className={`w-10 h-10 bg-primary flex items-center justify-center 
                     rounded-[50%] text-gray-light-1 ${
                       filledCircle(index)
                         ? "bg-primary text-gray-light-1"
                         : "bg-gray-light-3 text-gray-900"
                     }`}
                  >
                    {stage}
                  </span>
                </div>
              )}
              {stage !== stages.length && (
                <div className="flex items-center justify-start relative">
                  <label
                    className="absolute top-[-32px] left-[-32px] w-auto h-auto
                    text-gray-dark-2 text-center font-bold"
                  >
                    {stage === stageLabelList[index].stage &&
                      stageLabelList[index].label}
                  </label>
                  <span
                    className={`w-10 h-10 bg-primary flex items-center justify-center 
                     rounded-[50%] text-gray-light-1 ${
                       filledCircle(index)
                         ? "bg-primary text-gray-light-1"
                         : "bg-gray-light-3 text-gray-900"
                     }`}
                  >
                    {stage}
                  </span>
                  <span
                    className={`h-3 w-[160px] mx-[-2px] ${
                      filledBar(index) ? "bg-primary" : "bg-gray-light-3"
                    }`}
                  ></span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
