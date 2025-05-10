import { PlusCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useNavigate } from "react-router-dom";

const SelectAction: React.FC = () => {
  const navigate = useNavigate();

  const cemeteryName = localStorage.getItem("cemeteryName");
  const cemeteryId = localStorage.getItem("cemeteryId");

  const handleIndexarClick = () => {
    if (cemeteryId) {
      navigate(`/gravestone/create/${cemeteryId}`);
    }
  };

  const handleSearchClick = () => {
    if(cemeteryId) {
      navigate(`/search-gravestones/${cemeteryId}`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-0">
      <h3 className="text-3xl font-bold mb-6">{cemeteryName}</h3>
      <h2 className="text-2xl font-bold mb-6">Seleccionar Acción</h2>

      <div className="flex space-x-10">
        <div
          onClick={handleIndexarClick}
          className="bg-white p-8 rounded-lg shadow-md text-center cursor-pointer hover:bg-green-100 transition-all"
        >
          <PlusCircleIcon className="h-16 w-16 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Indexar</h3>
        </div>

        <div
          onClick={ handleSearchClick }
          className="bg-white p-8 rounded-lg shadow-md text-center cursor-pointer hover:bg-green-100 transition-all"
        >
          <MagnifyingGlassIcon className="h-16 w-16 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Consultar</h3>
        </div>
      </div>
    </div>
  );
};

export default SelectAction;
