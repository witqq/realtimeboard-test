import angular = require("angular");
import {getRandomEmail} from "./utils/utils";
import {EmailsEditorController} from "./EmailsEditor/EmailsEditor";
import "./app.less";


class AppController {
    public emails: Array<string>=["sidorov@mail.ru"];
    private emailsControl: EmailsEditorController;

    public showCnt() {
        alert(this.emails.length);
    }

    public addRandomEmail() {
        this.emailsControl && this.emailsControl.addEmail(getRandomEmail());
        // не испольуем прямое обращение к коллекции
        // т.к. в методе контрллера реализована валидация email-а на пустоту и уникальность
        // this.emails.push(getRandomEmail())
    }
}

export const AppControllerModule = angular.module('app.home', [])
    .controller('AppController', AppController)
    .name;
