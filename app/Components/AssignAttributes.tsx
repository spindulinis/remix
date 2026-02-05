import { useOpenState } from "~/hooks/useOpenState";
import { useCallback, useState } from "react";
import { AttributeDto } from "~/dtos/attribute.dto";

interface AssignAttributesProps {
  allAttributes: AttributeDto[];
  initialAssignedIds?: number[];
}

const AssignAttributes = (props: AssignAttributesProps) => {
  const { allAttributes, initialAssignedIds = [] } = props;
  const { isOpen, setIsOpen, ref: menuRef } = useOpenState();
  const [selectedIds, setSelectedIds] = useState<number[]>(initialAssignedIds);

  const handleCheckboxChange = useCallback((attributeId: number) => {
    setSelectedIds(prevIds => {
      if (prevIds.includes(attributeId)) {
        return prevIds.filter(id => id !== attributeId);
      } else {
        return [...prevIds, attributeId];
      }
    });
  }, []);


  return (
    <div className="relative">
      <button
        className="w-full inline-flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true)
        }}>
        Assign attributes
      </button>
      <div
        className={
          `z-10 mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-full dark:bg-gray-700 dark:divide-gray-600 
                        ${isOpen ? "block absolute" : "hidden"}`
        }
        ref={menuRef}>
        {allAttributes && <ul className="h-48 select-none overflow-y-auto p-2">
          {allAttributes.map(attribute => {
            const isChecked = selectedIds.includes(attribute.id);
            return (
              <li key={attribute.id}>
                <div
                  className="inline-flex items-center w-full p-2">
                  <input id={`attribute-${attribute.id}`}
                         name="attributeIds"
                         type="checkbox"
                         checked={isChecked}
                         value={String(attribute.id)}
                         onChange={() => handleCheckboxChange(attribute.id)}
                         className="w-4 h-4"/>
                  <label htmlFor={`cat-${attribute.id}`} className="w-full ms-2 text-sm">{attribute.title}</label>
                </div>
              </li>
            );
          })}
        </ul>
        }
      </div>
    </div>
  );
};
export default AssignAttributes;