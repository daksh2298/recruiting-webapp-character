import React, { useMemo } from "react";
import { SkillsContainer } from "./components";
import { SKILL_LIST } from "../consts";
import { useCharacterSheet } from "./hooks/useCharacterSheet";

const Skills = ({ character }) => {
  const { skills, updateSkill, attributeModifiers, availableSkillPoints } =
    useCharacterSheet(character);

  const totalSkillPointsRemaining = useMemo(() => {
    return (
      availableSkillPoints -
      Object.values(skills).reduce((acc, curr) => acc + curr, 0)
    );
  }, [skills, availableSkillPoints]);

  const handleSkillIncreaseCurry = (skillName) => () => {
    if (totalSkillPointsRemaining <= 0) {
      alert("You need more skill points! Upgrade intelligence to get more.");
      return;
    }
    updateSkill(skillName, skills[skillName] + 1);
  };

  const handleSkillDecreaseCurry = (skillName) => () => {
    updateSkill(skillName, Math.max(skills[skillName] - 1, 0));
  };

  return (
    <SkillsContainer>
      <h2>Skills</h2>
      <p>
        Available Skill Points: {availableSkillPoints} (Remaining:{" "}
        {totalSkillPointsRemaining})
      </p>

      <div className={"skill-list"}>
        <table>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Value</th>
              <th>Modifier</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {SKILL_LIST.map((skill) => {
              return (
                <tr>
                  <td>{skill.name}</td>
                  <td>
                    <div className={"controls"}>
                      <button onClick={handleSkillDecreaseCurry(skill.name)}>
                        -
                      </button>
                      {skills[skill.name]}
                      <button onClick={handleSkillIncreaseCurry(skill.name)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    {skill.attributeModifier}:{" "}
                    {attributeModifiers[skill.attributeModifier]}
                  </td>
                  <td>
                    {(skills[skill.name] || 0) +
                      (attributeModifiers[skill.attributeModifier] || 0)}
                  </td>
                </tr>
                // <SkillItem
                //   key={skill.name}
                //   name={skill.name}
                //   value={0}
                //   modifierName={skill.attributeModifier}
                //   modifierValue={modifiers[skill.attributeModifier]}
                //   onIncrease={() => {}}
                //   onDecrease={() => {}}
                // />
              );
            })}
          </tbody>
        </table>
      </div>
    </SkillsContainer>
  );
};

export default Skills;
