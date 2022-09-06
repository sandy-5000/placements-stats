import { TestBed } from '@angular/core/testing';

import { ConnectDbService } from './connect-db.service';

describe('ConnectDbService', () => {
	let service: ConnectDbService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ConnectDbService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
