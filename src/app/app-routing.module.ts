import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { PlacementRecordsComponent } from './placement-records/placement-records.component';
import { RecruitersComponent } from './recruiters/recruiters.component';
import { TeamComponent } from './team/team.component';
import { YearRecordsComponent } from './year-records/year-records.component';

const routes: Routes = [
	{ path: '', redirectTo: "/home", pathMatch: "full" },
	{ path: 'home', component: HomeComponent },
	{ path: 'placementRecords', component: PlacementRecordsComponent },
	{ path: 'yearRecords', component: YearRecordsComponent },
	{ path: 'aboutus', component: AboutUsComponent },
	{ path: 'recruiters', component: RecruitersComponent },
	{ path: 'team', component: TeamComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
