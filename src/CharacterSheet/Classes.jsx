import React, { useState } from "react";
import { useCharacterSheet } from "./hooks/useCharacterSheet";
import { CLASS_LIST } from "../consts";
import { ClassContainer } from "./components";

const Classes = ({ character }) => {
  const { qualifiedClassesMap } = useCharacterSheet(character);

  const classes = Object.keys(CLASS_LIST);
  const [activeClassRequirements, setActiveClassRequirements] = useState("");

  const handleClassClickCurry = (classType) => () => {
    setActiveClassRequirements(classType);
  };

  const handleCloseClassRequirements = () => {
    setActiveClassRequirements("");
  };

  console.log("qualifiedClassesMap", qualifiedClassesMap);
  return (
    <ClassContainer>
      <h2>Classes</h2>
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
