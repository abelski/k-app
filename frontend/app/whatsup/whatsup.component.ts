import { Component } from '@angular/core';

declare var $: any;
declare var c3: any;

@Component({
    templateUrl: 'app/whatsup/whatsup.template.html',
    providers: []
})

export class WhatsupComponent {

    private instImages = [];

    constructor() {

    }

    ngAfterViewInit() {
        c3.generate({
            bindto: '#c3-donut-travel-type',
            size: {
                height: 280,
                width: 280
            },
            data: {
                columns: [
                    ['Plane', 60],
                    ['Car', 70],
                    ['Bus', 80],
                    ['Motocycle', 120],
                    ['On feet', 30]
                ],
                type: 'donut'
            },
            donut: {
                title: 'Title'
            },
            color: {
                pattern: ['#39c2d7', '#a3c644', '#b22746', '#8b5a9f', '#ffdc19']
            }
        });
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