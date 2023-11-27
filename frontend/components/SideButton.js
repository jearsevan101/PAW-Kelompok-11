const SideButton = ({ children, selected, icon, ...props }) => {
    const buttonStyle = selected 
        ? "bg-c-primary flex flex-row items-center text-white w-48 h-10 font-regular px-5 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring text-left" // styles when selected
        : "bg-c-light-grey flex flex-row items-center text-c-text-grey w-48 h-10 font-regular px-5 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring text-left"; // styles when not selected

    return (
        <button className={` ${buttonStyle}`} {...props}>
            {icon}
            <span className="ml-3">{children}</span>
        </button>
    );
};

export default SideButton;