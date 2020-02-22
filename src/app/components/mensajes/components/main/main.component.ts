import { Component, OnInit, DoCheck } from '@angular/core';


@Component({
    selector: 'main',
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, DoCheck {

    public title: string;

    constructor() {
        this.title = 'Mensajes Privados';
    }
    ngDoCheck(): void {

    }
    ngOnInit(): void {

    }

}