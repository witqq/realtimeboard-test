import angular = require('angular');
import IDirectiveFactory = angular.IDirectiveFactory;
import IDirective = angular.IDirective;
import IScope = angular.IScope;
import IAttributes = angular.IAttributes;
import "./emailsEditor.less";
import {validateEmail} from "./utils";

interface EmailEditorScope extends IScope {
    emails: Array<string>;
    currentInput: string;
    addEmail: (email?: string) => void;
    control: EmailsEditorController;
    keyPress: (ev: JQueryEventObject) => void;
    keyUp: (ev: JQueryEventObject) => void;
    testEmail: (input: string) => boolean;
    removeEmail: (input: string) => void;
    paste: (ev: JQueryEventObject) => void;
}

type StringMap<T>= {[index: string]: T};

const emailsEditor = (): IDirective => ({
    restrict: 'E',
    scope: {
        emails: "="
    },
    template: require('./emailsEditor.html'),
    controller: EmailsEditorController,
    link: (scope: EmailEditorScope) => {
        scope.$watchCollection("emails", (newValue: Array<string>, oldValue: Array<string>) => {
            // для накапливания уже встреченных адресов используем мапу, а не коллекцию
            const alreadyExists: StringMap<boolean> = {};
            newValue.filter(newEmail => {
                // Если такой email уже был, то пропускаем
                if (alreadyExists[newEmail]) {
                    return false;
                }
                // Если email был в старой версии коллекции не запускаем проверку
                if (oldValue.indexOf(newEmail) !== -1) {
                    alreadyExists[newEmail] = true;
                    return true;
                }
                // Если email прошел проверку оставляем его, так же заносим в мапу уже присутсвующих
                if (validateEmail(newEmail)) {
                    alreadyExists[newEmail] = true;
                    return true;
                }
                return false;
            });
            scope.emails = newValue;
        });
    }
} as IDirective);


export class EmailsEditorController {

    static $inject = ["$scope"];

    constructor(private scope: EmailEditorScope) {
        scope.control = this;
        scope.emails = scope.emails || [];
        scope.addEmail = this.addEmailFormInput;
        scope.keyPress = this.onKeyPress;
        scope.testEmail = validateEmail;
        scope.removeEmail = this.removeEmail;
        scope.paste = this.onPaste
        scope.keyUp = (ev: JQueryEventObject) => {
            const parent = $(ev.target).parent();
            parent.scrollTop(parent[0].scrollHeight)
        }
    }

    private onPaste = (ev: JQueryEventObject) => {
        const clipEv: ClipboardEvent = ev.originalEvent as ClipboardEvent;
        const input = clipEv.clipboardData.getData("text");
        const withoutLineBreaks = input.replace(/(\r\n|\n|\r)/gm, ",");
        (withoutLineBreaks.split(",") || []).forEach(this.addEmail);
        ev.preventDefault();
    };

    private removeEmail = (email: string) => {
        const scope = this.scope;
        const idx = scope.emails.indexOf(email);
        if (idx !== -1) {
            scope.emails.splice(idx, 1);
        }
    };

    private onKeyPress = (event: JQueryKeyEventObject) => {
        if (event.which === 13 || event.which == 44) {
            this.addEmailFormInput();
            event.preventDefault();
            return false;
        }
        if (event.which === 8 && !$(event.target).val()) {
            this.removeLast();
        }
    };

    private removeLast = () => {
        const scope = this.scope;
        const idx = scope.emails.length - 1;
        scope.emails.splice(idx, 1);
    };

    private addEmailFormInput = () => {
        const scope = this.scope;
        this.addEmail(scope.currentInput);
        scope.currentInput = ""
    };

    public addEmail = (newEmail: string) => {
        if (!newEmail) return;
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