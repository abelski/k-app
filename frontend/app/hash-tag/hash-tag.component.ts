import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { ColorUtil } from '../utils/color.util';
import { Tag } from '../domain/tag';

declare var $: any;

@Component({
    selector: 'hash-tag',
    templateUrl: 'app/hash-tag/hash-tag.template.html',
    providers: []
})

export class HashTagComponent {
    public colorClass = "";
    @Input('tag') tag: Tag;

    public constructor(public ref: ChangeDetectorRef) {
        
    }

    public ngAfterViewInit() {
        this.colorClass = ColorUtil.getColorClass(this.tag.name);
        this.ref.detectChanges();
    }
}