import { Component, OnInit, Input } from '@angular/core';

import { Comment } from '../domain/comment';

@Component({
    selector: 'vacation-comment',
    templateUrl: 'app/comment/comment.template.html'
})
export class CommentComponent implements OnInit {
    @Input() comment: Comment;
    constructor() { }

    ngOnInit() { }
}