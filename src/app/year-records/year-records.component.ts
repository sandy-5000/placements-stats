import { Component, OnInit } from '@angular/core';
import { ConnectDBService } from '../_services/connect-db.service';

@Component({
	selector: 'app-year-records',
	templateUrl: './year-records.component.html',
	styleUrls: ['./year-records.component.css'],
})
export class YearRecordsComponent implements OnInit {
	constructor(private db: ConnectDBService) { }

	ngOnInit(): void {
		let select_bar = document.getElementById('year');
		select_bar?.addEventListener('change', (event) => {
			this.year_data = [];
			this.company_data = [];
		});
	}

	year_data: any = [];
	company_data: any = [];
	companies: number = 0;
	total: number = 0;
	year: string = '';
	branchCount: any = [];

	process(n: number) {
		if (this.year.length != 4) {
			window.alert('Enter Proper year');
			return;
		}
		this.year_data = [];
		this.branchCount = [];
		this.company_data = [];
		if (n === 1) this.getCompany({ year: this.year });
		else if (n === 2) {
			this.getData({ year: this.year });
			this.getStudentCount({ year: this.year });
		}
	}

	getCourse(c: string) {
		let courses: any = {
			'10': 'B.Tech (Civil Engineering)',
			'20': 'B.Tech (Electrical & Electronics Engineering)',
			'30': 'B.Tech (Mechanical Engineering)',
			'40': 'B.Tech (Electronics & Communication Engineering)',
			'50': 'B.Tech (Computer Science & Engineering)',
			'60': 'B.Tech (Petrochemical Engineering)',
			'70': 'B.Tech (Petroleum Engineering)',
			'11': 'M.Tech (Soil Mechanics & Foundation Engineering)',
			'12': 'M.Tech (Structural Engineering)',
			'13': 'M.Tech (Hydralics and Water Resources)',
			'21': 'M.Tech (Advanced Electrical Power Systems)',
			'22': 'M.Tech (High Voltage Engineering)',
			'23': 'M.Tech (Power Electronics and Drives )',
			'31': 'M.Tech (CAD/CAM)',
			'32': 'M.Tech (Machine Design)',
			'33': 'M.Tech (Thermal Engineering)',
			'41': 'M.Tech (Instrumentation & Control Systems)',
			'42': 'M.Tech (Computers & Communications)',
			'43': 'M.Tech (Communication&Signal Processing)',
			'44': 'M.Tech (VLSI&Embedded Systems)',
			'51': 'M.Tech (Computer Science & Engineering)',
			'52': 'M.Tech (Information Technology)',
			'53': 'M.Tech (Cyber Security)',
			'71': 'M.Tech (Petroleum Engineering)',
			'54': 'Master of Computer Applications (MCA)'
		};
		return courses[c];
	}

	getData(data: any) {
		let query: string = `select * from students where passed_year = '${data.year}'`;
		this.db.processQuery(query).subscribe((dt) => {
			this.year_data = [];
			if (dt.errno != undefined) {
				window.alert('Error in Connecting Database');
				return;
			}
			if (dt.length === 0) {
				window.alert('No data avaliable');
				return;
			}
			this.year_data = dt;
		});
	}

	getCompany(data: any) {
		let query: string = `select * from companies where year = '${data.year}'`;
		this.db.processQuery(query).subscribe((dt) => {
			this.company_data = [];
			if (dt.errno != undefined) {
				window.alert('Error in Connecting Database');
				return;
			}
			if (dt.length === 0) {
				window.alert('No data avaliable');
				return;
			}
			let set_: any = new Set();
			for (const i of dt) {
				set_.add(i.name);
			}
			this.companies = set_.size;
			this.company_data = dt;
		});
	}

	getStudentCount(data: any) {
		let query: string = `select course, count(*) as count_ from students where passed_year = '${data.year}' group by course`;
		let map_: any = {}
		this.total = 0;
		this.db.processQuery(query).subscribe((dt) => {
			for (let i of dt) {
				map_[i.course] = i.count_;
				this.total -= -i.count_;
			}
			let branches = [10, 20, 30, 40, 50, 60, 70, 11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 44, 51, 52, 53, 71, 54];
			for (let i of branches) {
				this.branchCount.push({ branch: `${i}`, count: (map_[i] || 0) });
			}
		});
	}

}
