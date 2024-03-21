import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../assets/localStorage";

const Unknow: React.FC = () => {
    const navigate = useNavigate();

    const { getLocation} = useLocalStorage('location');
    const { getItem } = useLocalStorage("value");
    const user = getItem();


    useEffect(() => {
        if (user.id) {
            const savedLocation = getLocation();
            if (savedLocation) {
                navigate(savedLocation.pathname);
            } else {
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, []);

    return (
        <div>
        </div>
    );
}

export default Unknow;
