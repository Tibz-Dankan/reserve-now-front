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

  return (
    <Fragment>
      <div className="w-full flex items-center justify-center mb-8 mt-12">
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
                    className="w-10 h-10 bg-primary flex items-center justify-center 
                     rounded-[50%] text-gray-light-1"
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
                    className="w-10 h-10 bg-primary flex items-center justify-center 
                    rounded-[50%] text-gray-light-1"
                  >
                    {stage}
                  </span>
                  <span className="h-3 w-[160px] mx-[-2px] bg-primary"></span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
