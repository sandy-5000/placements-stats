import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ConnectDBService {

	// http://localhost:80/_placement/connect.php
	constructor(private httpClient: HttpClient) { }
	processQuery(query: string): Observable<any> {
		const formData: FormData = new FormData();
		formData.append('query', query);
		return this.httpClient.post<any>('https://www.jntucek.ac.in/placements_/connect.php', formData);
	}

}
