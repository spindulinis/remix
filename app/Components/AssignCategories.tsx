import { useOpenState } from "~/hooks/useOpenState";
import { CategoryDto } from "~/dtos/category.dto";
import { useCallback, useState } from "react";

interface AssignCategoriesProps {
  allCategories: CategoryDto[];
  initialAssignedIds?: number[];
}

const AssignCategories = (props: AssignCategoriesProps) => {
  const { allCategories, initialAssignedIds = [] } = props;
  const { isOpen, setIsOpen, ref: menuRef } = useOpenState();
  const [selectedIds, setSelectedIds] = useState<number[]>(initialAssignedIds);

  const handleCheckboxChange = useCallback((categoryId: number) => {
    setSelectedIds(prevIds => {
      if (prevIds.includes(categoryId)) {
        return prevIds.filter(id => id !== categoryId);
      } else {
        return [...prevIds, categoryId];
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
        Assign categories
      </button>
      <div
        className={
          `z-10 mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-full dark:bg-gray-700 dark:divide-gray-600 
                        ${isOpen ? "block absolute" : "hidden"}`
        }
        ref={menuRef}>
        {allCategories && <ul className="h-48 select-none overflow-y-auto p-2">
          {allCategories.map(category => {
            const isChecked = selectedIds.includes(category.id);
            return (
              <li key={category.id}>
                <div
                  className="inline-flex items-center w-full p-2">
                  <input id={`category-${category.id}`}
                         name="categoryIds"
                         type="checkbox"
                         checked={isChecked}
                         value={String(category.id)}
                         onChange={() => handleCheckboxChange(category.id)}
                         className="w-4 h-4"/>
                  <label htmlFor={`cat-${category.id}`} className="w-full ms-2 text-sm">{category.title}</label>
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
export default AssignCategories;