import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MyDay from "./pages/MyDay";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/myday' exact component={MyDay}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;