import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Images from "../pages/Images";
import Events from "../pages/Events";
import Texts from "../pages/Texts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Admin from "../pages/Admin";

import Private from "./Private";

export default function RoutesApp() {

    return (
        <Routes>
            <Route path="/home/:userLink" element={<Home />} />
            <Route path="/images/:userLink" element={<Images />} />
            <Route path="/events/:userLink" element={<Events />} />
            <Route path="/texts/:userLink" element={<Texts />} />

            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/admin/:userLink" element={ <Private> <Admin /> </Private> } />

            <Route path="*" element={ <Login /> } />

        </Routes>
    )
}