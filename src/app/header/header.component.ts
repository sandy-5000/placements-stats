import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	home = () => this.router.navigateByUrl('/home');
	placementRecords = () => this.router.navigateByUrl('/placementRecords');
	yearRecords = () => this.router.navigateByUrl('/yearRecords');
	aboutUs = () => this.router.navigateByUrl('/aboutus');
	recruiters = () => this.router.navigateByUrl('/recruiters');
	team = () => this.router.navigateByUrl('/team');

	sess = (c: string) => sessionStorage.setItem('current', c);

}
