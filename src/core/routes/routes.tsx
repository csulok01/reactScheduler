import {compose, map, mount, redirect, route} from "navi";
import Login from "../../login/login";
import Home from "../../home/home";
import React from "react";

export const routes =
    mount({
        '/': redirect("/home"),
        '/login': route({
            title: 'login',
            view: <Login/>
        }),
        '/home': map(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                return redirect("/login");
            }
            return route({
                title: 'home',
                view: <Home/>
            })
        })
    })
