import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-recruiters',
	templateUrl: './recruiters.component.html',
	styleUrls: ['./recruiters.component.css']
})
export class RecruitersComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	list = [
		29, 31, 2, 61, 32, 7, 28, 10, 15, 6, 17, 18, 19,
		23, 24, 25, 30, 33, 20, 21, 22, 16, 8, 3, 1, 4,
		5, 9, 11, 12, 13, 27, 26, 34, 35, 36, 37, 38,
		39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
		51, 52, 53, 54, 55, 56, 57, 58, 59, 60
	];

}
