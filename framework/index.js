import "./components/index.js";
import { LanguageService } from "./services/language-service.js"
//import { MyModel }  from "./models/my-model.js";
//import { ReactiveElement } from "./components/reactive-element.js";
//import { Subject } from 'rxjs';
//window.MyModel = MyModel;
window.LanguageService = LanguageService;
window.i18n = LanguageService.t;
//export { ReactiveElement };
//export { MyModel }