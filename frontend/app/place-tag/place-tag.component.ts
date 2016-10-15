import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { ColorUtil } from '../utils/color.util';
import { Tag } from '../domain/tag';

declare var $: any;

@Component({
    selector: 'place-tag',
    templateUrl: 'app/place-tag/place-tag.template.html',
    providers: []
})

export class PlaceTagComponent {
    public colorClass = "";
    @Input('place') place: any;
    private textMsg: string;

    public constructor(public ref: ChangeDetectorRef) {
        
    }

    public ngAfterViewInit() {
        this.textMsg = this.place.country.name + ", " + this.place.city.name;
        this.colorClass = ColorUtil.getColorClass(this.textMsg);
        this.ref.detectChanges();
    }
}