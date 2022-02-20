import React from "react";

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="flex justify-between px-8 py-2 bg-gray-600 text-white">
      <h2 className="text-3xl font-bold">Habits</h2>
      <button>Add</button>
    </div>
  );
}

export default Navbar;
