import { LocalStorageManagement } from "./Localstorage";

export class ThemeManagement{
    constructor(){
        this.localStorageManagement = new LocalStorageManagement("theme");
    }
    setTheme(theme){
        this.localStorageManagement.saveData(theme);
        return theme
    }
    getTheme(){
        var theme = this.localStorageManagement.getData();
        if(theme)
        return theme;

        const userTheme = window.matchMedia('(prefers-color-scheme: light)');
        if (userTheme.matches)
        return this.setTheme('theme-light');
        return this.setTheme('theme-dark')
    }
}