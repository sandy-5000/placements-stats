import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { max } from 'd3';
import { ConnectDBService } from '../_services/connect-db.service';

@Component({
	selector: 'app-placement-records',
	templateUrl: './placement-records.component.html',
	styleUrls: ['./placement-records.component.css']
})
export class PlacementRecordsComponent implements OnInit {

	constructor(private db: ConnectDBService) { }

	year_data: any = [];
	place_data: any = [];
	company_data: any = [];
	years: any = [];

	ngOnInit(): void {
		this.drawLegend();
		this.setPies();
		window.addEventListener('resize', event => {
			this.getBars('.offer-bars', this.place_data);
			this.getBars('.placed-bars', this.year_data);
			this.getBars('.company-bars', this.company_data);
		});
	}

	getBars(a: string, arr: number[]) {
		let [x, y] = [0.05 * window.innerWidth, 0];
		let barWidth = 45;
		let width = window.innerWidth - 0.1 * window.innerWidth, heigth = (arr.length + 1) * barWidth;
		let domain = {
			low: 0,
			high: max(arr)
		}

		let widthScale = d3.scaleLinear()
			.domain([0, (domain.high || 100) * 1.3])
			.range([0, width]);

		let color = d3.scaleSequential()
			.domain([0, domain.high || 100])
			.interpolator(d3.interpolatePuRd);

		d3.select(a).select('.data-B').remove();

		let canvas = d3.select(a)
			.append('svg')
			.attr('class', 'data-B')
			.attr('width', width)
			.attr('height', heigth)
			.style('margin', 50)
			.attr('transform', `translate(${x}, ${y})`);

		let bars = canvas.selectAll('rect')
			.data(arr)
			.enter();

		bars.append('rect')
			.attr('height', 25)
			.attr('width', d => widthScale(d))
			.style('fill', d => color(d))
			.attr('y', (d, i) => i * barWidth)

		bars.append('text')
			.text((d, i) => `Year ${this.years[i]}: ${d}`)
			.attr('x', d => 5 + widthScale(d))
			.attr('y', (d, i) => (i) * barWidth + 18);
	}

	drawPie(year: number, values: number[]) {
		let [x, y] = [150, 0];
		let width = 500, height = 500, radius = 200;
		let data = [{ name: '1', value: 0 }];

		for (const [index, value] of values.entries()) {
			data[index] = { 'name': `${index + 1}`, value: value }
		}

		let canvas = d3.select('.pie')
			.append('svg')
			.attr('class', 'pie-c col-lg-5 col-md-10 col-sm-12')
			.attr('width', width)
			.attr('height', height)
			.attr('transform', `translate(${x}, ${y})`);

		let g = canvas.append('g')
			.attr('transform', `translate(${width / 2}, ${height / 2})`);

		let color = d3.scaleOrdinal(d3.schemeDark2);

		let pie = d3.pie();
		let arc: any = d3.arc()
			.innerRadius(radius / 1.9)
			.outerRadius(radius)
			.padAngle(0.01)
			.padRadius(radius);

		let arcs = g.selectAll('arc')
			.data(pie(data.map(x => x.value)))
			.enter().append('g')
			.attr('class', 'arc');

		arcs.append('path')
			.attr('fill', (d, i) => color(data[i].name))
			.attr('d', arc);

		let content = arcs.append('text')
			.attr('x', d => arc.centroid(d)[0] - 5)
			.attr('y', d => arc.centroid(d)[1])
			.attr('class', 'pie-text')
			.text(d => `${d.data}`)
			.attr('fill', 'white');

		arcs.append('text').text(`${year}`).attr('transform', 'translate(-18, 5)');

	}

	drawLegend() {
		let color = d3.scaleOrdinal(d3.schemeDark2);
		let names = [
			'Civil Engineering',
			'Electrical and Electronic Engineering',
			'Mechanical Engineering',
			'Electronic and Communication Engineering',
			'Computer Science and Engineering',
			'Chemical Engineering',
			'Petroleum Engineering'
		];
		let canvas = d3.select('.legend').append('svg')
			.attr('width', 400).attr('height', 200).attr('transform', 'translate(200, 0)');
		let legend = canvas.selectAll('rect').data(names).enter();
		legend.append('rect').attr('height', 20).attr('width', 20)
			.attr('fill', d => color(d + '')).attr('y', (d, i) => i * 25).attr('x', 50);
		legend.append('text').text((d, i) => `${names[i]}`).attr('y', (d, i) => i * 25 + 15).attr('x', 80);
	}

	getData(year: string) {
		return new Promise((resolve, reject) => {
			this.db.processQuery(`select count(distinct(roll)) as ct, course from students where passed_year = '${year}' group by course - mod(course, 10)`).subscribe(dt => {
				let memo: any = {},
					a = dt.map((x: any) => x.ct),
					count = 0;
				for (const i of a) count += +i;
				memo.count = count;
				this.drawPie(+year, a);
				resolve(count);
			});
		});
	}


	getBarData() {
		return new Promise((resolve, reject) => {
			this.db.processQuery(`select sum(no_of_offers) as ct, year from companies group by year order by year desc`).subscribe(dt => {
				resolve(dt);
			});
		});
	}

	getCompanyData() {
		return new Promise((resolve, reject) => {
			this.db.processQuery(`select count(distinct(name)) as ct, year from companies group by year order by year desc`).subscribe(dt => {
				resolve(dt);
			});
		});
	}

	async setPies() {
		this.year_data = [];
		this.company_data = [];
		this.years = [];
		let prom = [this.getData('2022'), this.getData('2021'), this.getData('2020'), this.getData('2019'), this.getData('2018'), this.getData('2017')];
		await Promise.all(prom).then(values => {
			this.getBarData().then((list: any) => {
				for (let [i, val] of values.entries()) {
					this.year_data[i] = val;
				}
				this.years = list.map((x: any) => x.year);
				this.place_data = list.map((x: any) => x.ct);
				this.getCompanyData().then((comp: any) => {
					this.company_data = comp.map((x: any) => x.ct);
					this.getBars('.placed-bars', this.year_data);
					this.getBars('.offer-bars', this.place_data);
					this.getBars('.company-bars', this.company_data);
				});
			});
		})
	}

}
