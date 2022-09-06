import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearRecordsComponent } from './year-records.component';

describe('YearRecordsComponent', () => {
	let component: YearRecordsComponent;
	let fixture: ComponentFixture<YearRecordsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [YearRecordsComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(YearRecordsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
