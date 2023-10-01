export class LocalStorageManagement{
    constructor(local){
        this.local = local;
    }

    getData(){
        const data = localStorage.getItem(this.local);
        return JSON.parse(data) || []
    }
    saveData(data){
        return localStorage.setItem(this.local,JSON.stringify(data));
    }
}