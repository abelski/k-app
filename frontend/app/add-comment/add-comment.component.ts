import { Component, OnInit, Input } from '@angular/core';
import { User } from '../domain/user';
import { Vacation } from '../domain/vacation';
import { RegistrationService } from '../registration/registration.service';
import { Image } from '../domain/image';
import { Comment } from '../domain/comment';
import { CommentService } from '../comment/comment.service';
import Globals = require('../globals');

@Component({
    selector: 'add-comment',
    templateUrl: 'app/add-comment/add-comment.template.html',
    providers: [RegistrationService, CommentService]
})
export class AddCommentComponent implements OnInit {
    @Input() vacation: Vacation;
    public currentUser: User;
    private comment: Comment;

    constructor(private registrationService: RegistrationService,
                private commentService: CommentService) {
        // delete when registered user will be converted in object
        this.currentUser = Globals.userInfo;
     }

    ngOnInit() { }

    addComment(textComment) {
        if (textComment !== null && textComment !== "") {
            let comment: Comment = new Comment("", this.currentUser, textComment);
            this.vacation.comments.push(comment);
            this.commentService.addComment(comment).
                subscribe(com => this.vacation.comments.push(com));
        }
    }
}