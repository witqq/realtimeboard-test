import angular = require("angular");
import {getRandomEmail} from "./utils/utils";
import "./app.less";


class AppController {
    public emails: Array<string> = ["sidorov@mail.ru"];

    public showCnt() {
        alert(this.emails.length);
    }

    public addRandomEmail() {
        this.emails && this.emails.push(getRandomEmail());
    }
}

export const AppControllerModule = angular.module('app.home', [])
    .controller('AppController', AppController)
    .name;
