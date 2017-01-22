import angular = require('angular');
import IDirectiveFactory = angular.IDirectiveFactory;
import IDirective = angular.IDirective;
import IScope = angular.IScope;
import IAttributes = angular.IAttributes;
import "./emailsEditor.less";
import {validateEmail} from "../utils/utils";

interface EmailEditorScope extends IScope {
    emails: Array<string>;
    currentInput: string;
    addEmail: (email?: string) => void;
    control: EmailsEditorController;
    keyPress: (ev: JQueryEventObject) => void;
    testEmail: (input: string) => boolean;
    removeEmail: (input: string) => void;
    paste: (ev: JQueryEventObject) => void;
}

const emailsEditor = (): IDirective => ({
    restrict: 'E',
    scope: {
        emails: "=",
        control: "="
    },
    template: require('./emailsEditor.html'),
    controller: EmailsEditorController
} as IDirective);


export class EmailsEditorController {

    static $inject = ["$scope"];

    constructor(private scope: EmailEditorScope) {
        scope.emails = scope.emails || [];
        scope.addEmail = this.addEmailFormInput;
        scope.control = this;
        scope.keyPress = this.onKeyPress;
        scope.testEmail = validateEmail;
        scope.removeEmail = this.removeEmail;
        scope.paste = this.onPaste
    }

    private onPaste = (ev: JQueryEventObject) => {
        const clipEv: ClipboardEvent = ev.originalEvent as ClipboardEvent;
        const input = clipEv.clipboardData.getData("text");
        const withoutLineBreaks = input.replace(/(\r\n|\n|\r)/gm, ",");
        (withoutLineBreaks.split(",") || []).forEach(this.addEmail);
        ev.preventDefault();

    }

    private removeEmail = (email: string) => {
        const idx = this.scope.emails.indexOf(email);
        if (idx !== -1) {
            this.scope.emails.splice(idx, 1);
        }
    }

    private onKeyPress = (event: JQueryKeyEventObject) => {
        if (event.which === 13 || event.which == 44) {
            this.addEmailFormInput();
            event.preventDefault();
            return false;
        }
        if (event.which === 8 && !$(event.target).val()) {
            this.removeLast();
        }
    }

    private removeLast = () => {
        const idx = this.scope.emails.length - 1;
        this.scope.emails.splice(idx, 1);
    }

    private addEmailFormInput = () => {
        this.addEmail(this.scope.currentInput);
        this.scope.currentInput = ""
    }

    public addEmail = (newEmail: string) => {
        const scope = this.scope;
        newEmail = newEmail.trim();
        if (newEmail && scope.emails.indexOf(newEmail) === -1) {
            scope.emails.push(newEmail);
        }
    }


}

export const EmailsEditorModule = angular.module('directives.emailsEditor', [])
    .directive('emailsEditor', emailsEditor)
    .name;