import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RestaurantService } from '../../services';
import { Restaurant, Comment } from '../../models';

@Component({
    selector: 'fs-restaurant-details',
    templateUrl: './restaurant-details.component.html'
})
export class RestaurantDetailsComponent implements OnInit {

    restaurant: Restaurant;
    comments: Comment[];
    commentForm: FormGroup;
    position;

    constructor(
        private route: ActivatedRoute,
        private service: RestaurantService,
        private fb: FormBuilder
    ) {}


    ngOnInit() {
        this.restaurant = this.route.snapshot.data.restaurant;

        this.position = {
            address: this.restaurant.address,
            coords: <Coordinates> {
                latitude: this.restaurant.lat,
                longitude: this.restaurant.lng,
            }
        };

        this.commentForm = this.fb.group({
            text: ['', [ Validators.required ] ],
            stars: [0, [ Validators.required ] ]
        });

        this.service.getComments(this.restaurant.id).subscribe(
            data => {
                this.comments = data;
            },
            err => console.log(err)
        );
    }

    sendComment(event) {
        event.preventDefault();

        if (this.commentForm) {
            const newComment = <Comment> {
                text: this.commentForm.get('text').value,
                stars: this.commentForm.get('stars').value
            };

            this.service.addComment(newComment, this.restaurant.id).subscribe(
                comment => {
                    this.commentForm = this.fb.group({
                        text: '',
                        stars: 0,
                    });

                    this.restaurant.commented = true;

                    if (this.comments) {
                        this.comments = this.comments.concat([ comment ]);
                    } else {
                        this.comments = [ comment ];
                    }
                },
                err => console.log(err)
            );
            console.log(this.commentForm);
        }
    }
}
