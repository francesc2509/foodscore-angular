import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models';
import { ProfileService } from '../../services';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fs-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
    user: User;
    infoForm: FormGroup;
    avatarForm: FormGroup;
    passwordForm: FormGroup;

    avatarTmp = '';

    messages = {
        info: undefined,
        avatar: undefined,
        password: undefined,
    };

    constructor(
        private service: ProfileService,
        private fb: FormBuilder,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.user = this.route.snapshot.data.user;

        this.infoForm = this.fb.group({
            name: [this.user.name, [Validators.required]],
            email: [this.user.email, [Validators.required, Validators.email]]
        });

        this.avatarForm = this.fb.group({
            avatar: ['', [Validators.required]]
        });

        this.avatarForm.get('avatar').valueChanges.subscribe(
            data => this.avatarTmp = data
        );

        this.passwordForm = this.fb.group({
            password: ['', [Validators.required]],
            password2: ['', [Validators.required]]
        });
    }

    editInfo(event) {
        const email = this.infoForm.get('email').value;
        const name = this.infoForm.get('name').value;
        const user = <User>{ name, email };

        this.service.updateInfo(user).subscribe(
            ok => {
                this.messages.info = { ok, text: 'Info updated successfully' };
            },
            err => {
                this.messages.info = {
                    ok: false,
                    text: err.message
                };
            }
        );

        event.preventDefault();
    }

    editAvatar(event) {
        const avatar = this.avatarForm.get('avatar').value;
        const user = <User>{ avatar };

        this.service.updateAvatar(user).subscribe(
            data => {
                this.user.avatar = data.avatar;
				this.avatarForm.get('avatar').setValue('');
                this.messages.avatar = { ok: true, text: 'Avatar updated successfully' };
            },
            err => {
                this.messages.avatar = {
                    ok: false,
                    text: err.message
                };
            }
        );

        event.preventDefault();
    }

    editPassword(event) {
        const password = this.passwordForm.get('password').value;
        const user = <User>{ password };

        this.service.updatePassword(user).subscribe(
            ok => {
                this.messages.password = { ok: true, text: 'Password updated successfully' };
            },
            err => {
                this.messages.password = {
                    ok: false,
                    text: err.message
                };
            }
        );

        event.preventDefault();
    }
}
