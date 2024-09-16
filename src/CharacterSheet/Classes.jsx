import React, { useState } from "react";
import { useCharacterAttributes } from "./hooks/useCharacterSheet";
import { CLASS_LIST } from "../consts";
import { ClassContainer } from "./components";
import useRenderCounter from "../hooks/useRenderCounter";

const Classes = ({ character }) => {
  const { qualifiedClassesMap } = useCharacterAttributes(character);

  const classes = Object.keys(CLASS_LIST);
  const [activeClassRequirements, setActiveClassRequirements] = useState("");

  const handleClassClickCurry = (classType) => () => {
    setActiveClassRequirements(classType);
  };

  const handleCloseClassRequirements = () => {
    setActiveClassRequirements("");
  };

  const renderCount = useRenderCounter();
  return (
    <ClassContainer>
      <h2>Classes {renderCount}</h2>
      {classes.map((classType) => {
        return (
          <>
            <div key={classType}>
              <span
                className={`class-name ${
                  qualifiedClassesMap[classType] ? "qualified" : ""
                }`}
                onClick={handleClassClickCurry(classType)}
              >
                {classType}
              </span>
            </div>
            {activeClassRequirements === classType && (
              <div className={"class-requirements"}>
                {Object.keys(CLASS_LIST[classType]).map((attribute) => {
                  return (
                    <div key={attribute}>
                      {attribute}: {CLASS_LIST[classType][attribute]}
                    </div>
                  );
                })}
                <button onClick={handleCloseClassRequirements}>
                  Close requirements
                </button>
              </div>
            )}
          </>
        );
      })}
    </ClassContainer>
  );
};

export default Classes;
