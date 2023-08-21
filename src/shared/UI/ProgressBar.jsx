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

  const label = (elementStage, elementIndex) => {
    if (elementStage === stageLabelList[elementIndex].stage)
      return stageLabelList[elementIndex].label;
  };

  const filledCircle = (elementIndex) => {
    const elementStage = elementIndex + 1;
    return elementStage <= props.currentStage;
  };

  const filledBar = (elementIndex) => {
    const elementStage = elementIndex + 1;
    return elementStage < props.currentStage;
  };

  const isCurrentStage = (elementIndex) => {
    const elementStage = elementIndex + 1;
    return elementStage === props.currentStage;
  };

  return (
    <Fragment>
      <div className="w-full flex items-center justify-center mb-4 mt-12">
        {stages.map((stage, index) => {
          return (
            <div key={stage}>
              {stage === stages.length && (
                <div className="relative ">
                  <label
                    className={`${
                      isCurrentStage(index) && "font-bold text-lg"
                    } absolute top-[-32px] left-[-16px] 
                     w-auto h-auto text-gray-dark-3  text-center`}
                  >
                    {label(stage, index)}
                  </label>
                  <span
                    className={` ${
                      isCurrentStage(index) && "text-2xl font-bold w-11 h-11"
                    } w-10 h-10 flex items-center justify-center 
                     rounded-[50%] z-10 ${
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
                    className={`${
                      isCurrentStage(index) && "font-bold text-lg"
                    } absolute top-[-32px] left-[-24px] w-auto h-auto
                    text-gray-dark-3 text-center`}
                  >
                    {label(stage, index)}
                  </label>
                  <span
                    className={` ${
                      isCurrentStage(index) && "text-2xl font-bold w-11 h-11"
                    } w-10 h-10 flex items-center justify-center 
                     rounded-[50%] z-10 ${
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
