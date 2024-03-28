const Tab = ({ label, onClick, isActive }) => (
  <div
    className={`cursor-pointer px-4 py-2 text-sm font-semibold ${
      isActive ? "text-green-500" : "text-black"
    } ${isActive ? "border-b-2 border-green-500" : ""}`}
    onClick={onClick}
  >
    {label}
  </div>
);

export default Tab;
