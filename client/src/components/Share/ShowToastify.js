import { toast } from "react-toastify";

export const ShowToastify = ({ data, type, isDefault = true })  => {
    return toast(data, {
        type,
        theme: "colored",
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: isDefault,
        progress: undefined,
        className: "text-xs",
        icon: isDefault,
    });
};