import { Component } from '@angular/core';

declare var $: any;
declare var c3: any;

@Component({
    templateUrl: 'app/whatsup/whatsup.template.html',
    providers: []
})

export class WhatsupComponent {

    private instImages = [];
    private instaThreads = 0;

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
                title: 'We travel by'
            },
            color: {
                pattern: ['#39c2d7', '#a3c644', '#b22746', '#8b5a9f', '#ffdc19']
            }
        });

        c3.generate({
            bindto: '#c3-donut-seasons-europe',
            size: {
                height: 280,
                width: 280
            },
            data: {
                columns: [
                    ['Dec-Feb', 80],
                    ['Mar-Apr', 50],
                    ['May-Jul', 50],
                    ['Aug-Sept', 120],
                    ['Oct-Nov', 60]
                ],
                type: 'donut'
            },
            donut: {
                title: 'Europe Travels'
            },
            color: {
                pattern: ['#39c2d7', '#a3c644', '#b22746', '#8b5a9f', '#ffdc19']
            }
        });

        c3.generate({
            bindto: '#c3-donut-seasons-america',
            size: {
                height: 280,
                width: 280
            },
            data: {
                columns: [
                    ['Dec-Feb', 30],
                    ['Mar-Apr', 80],
                    ['May-Jul', 90],
                    ['Aug-Sept', 110],
                    ['Oct-Nov', 50]
                ],
                type: 'donut'
            },
            donut: {
                title: 'America Travels'
            },
            color: {
                pattern: ['#39c2d7', '#a3c644', '#b22746', '#8b5a9f', '#ffdc19']
            }
        });

        c3.generate({
            bindto: '#c3-donut-seasons-asia',
            size: {
                height: 280,
                width: 280
            },
            data: {
                columns: [
                    ['Dec-Feb', 90],
                    ['Mar-Apr', 50],
                    ['May-Jul', 70],
                    ['Aug-Sept', 90],
                    ['Oct-Nov', 60]
                ],
                type: 'donut'
            },
            donut: {
                title: 'Asia Travels'
            },
            color: {
                pattern: ['#39c2d7', '#a3c644', '#b22746', '#8b5a9f', '#ffdc19']
            }
        });

        this.loadInstPictures("mototripepam");
        this.loadInstPictures("khackathon");
        this.loadInstPictures("yogatrip");
        this.loadInstPictures("yoga");
        this.loadInstPictures("skiing");
    }

    private loadInstPictures(hashtag) {
        $("#insta-images .fa-spin").show();
        var that = this;
        this.instaThreads++;
        $.get({
            url: "https://api.instagram.com/v1/tags/" + hashtag + "/media/recent?access_token=4027454714.8e6503f.c0dd220c575e4ad6bf6331e4cc22c914&callback=?",
            dataType: 'jsonp',
            success: function(data) {
                that.instaThreads--;
                if (that.instaThreads == 0) {
                    $("#insta-images .fa-spin").hide();
                }
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