import { Route } from "react-router-dom";
import LazyLoad from "@lazy/lazyLoading";

export default (
    <>
        <Route path="register" element={LazyLoad(() => import("./Register"))()}></Route>
        <Route path="login" element={LazyLoad(() => import("./Login"))()}></Route>
        <Route path="profile" element={LazyLoad(() => import("./Info"))()}></Route>
        <Route path="admin" element={LazyLoad(() => import("./Admin"))()}></Route>
        <Route path="cart" element={LazyLoad(() => import("./Cart"))()}></Route>
    </>
);
