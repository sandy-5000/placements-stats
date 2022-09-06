import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementRecordsComponent } from './placement-records.component';

describe('PlacementRecordsComponent', () => {
	let component: PlacementRecordsComponent;
	let fixture: ComponentFixture<PlacementRecordsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PlacementRecordsComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PlacementRecordsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
