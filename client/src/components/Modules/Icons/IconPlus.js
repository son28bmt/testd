const IconPlus = ({ size = "20", color = "currentColor", ...attributes }) => {
    return (
        <>
            <svg
                enableBackground="new 0 0 10 10"
                viewBox="0 0 10 10"
                x="0"
                y="0"
                width={size}
                height={size}
                {...attributes}
            >
                <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
            </svg>
        </>
    );
};

export default IconPlus;
