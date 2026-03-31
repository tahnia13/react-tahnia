import { createRoot } from "react-dom/client";
import TailWindCSS from "./TailWindCSS";
import "./tailwind.css";
import UserForm from "./UserForm";
import HitungGajiForm from "./HitungGajiForm";



createRoot (document.getElementById("root"))
    .render(
        <div>
            <TailWindCSS/>
            <UserForm/>
            <HitungGajiForm/>
        </div>
    )