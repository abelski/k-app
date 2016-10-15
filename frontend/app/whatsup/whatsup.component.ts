import { Component } from '@angular/core';

declare var $: any;

@Component({
    templateUrl: 'app/whatsup/whatsup.template.html',
    providers: []
})

export class WhatsupComponent {

    private instImages = [];

    constructor() {

    }

    ngAfterViewInit() {
        this.loadInstPictures("cheerleader");
    }

    private loadInstPictures(hashtag) {
        $("#insta-images .fa-spin").show();
        var that = this;
        $.get({
            url: "https://api.instagram.com/v1/tags/" + hashtag + "/media/recent?access_token=4027454714.8e6503f.c0dd220c575e4ad6bf6331e4cc22c914&callback=?",
            dataType: 'jsonp',
            success: function(data) {
                $("#insta-images .fa-spin").hide();
                data.data.forEach(function(obj, i) {
                    var url = obj.images.low_resolution.url;
                    if (that.instImages.indexOf(url) == -1) {
                        that.instImages.push(url);
                    }
                });
            }
        });
    }

}