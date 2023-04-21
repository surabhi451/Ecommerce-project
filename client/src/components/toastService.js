import { toast, Flip } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const currentOptions = {
    position: 'top-right',
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Flip
};
const notify = (message = "") => {
    return {
        success(options = {}) {
            return toast.success(message, { ...currentOptions, ...options });
        },
        info(options = {}) {
            return toast.info(message, { ...currentOptions, ...options });
        },
        warning(options = {}) {
            return toast.warning(message, { ...currentOptions, ...options });
        },
        error(options = {}) {
            return toast.error(message, { ...currentOptions, ...options });
        },
    }
}
export default notify