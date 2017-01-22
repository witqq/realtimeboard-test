import angular = require('angular');
import {EmailsEditorModule} from "./EmailsEditor/EmailsEditor";
import {AppControllerModule} from "./AppController";


angular.module('app', [EmailsEditorModule, AppControllerModule]);


angular.element(document).ready(function () {
    angular.bootstrap(document, ["app"]);
});

