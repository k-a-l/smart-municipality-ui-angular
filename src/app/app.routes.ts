// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CitizenComponent } from './Admin/citizen/citizen.component';
import { ReviewComponent } from './Admin/citizen/review/review.component';
import { authGuard } from './auth.guard';
import {CitizenFormComponent} from './citizen-form/citizen-form.component';
import {CitizenViewComponent} from './Citizen/citizen-view/citizen-view.component';
import {SuperAdminDashboardComponent} from './Admin/super-admin-dashboard/super-admin-dashboard.component';
import {StaffDasboardComponent} from './Admin/staff-dasboard/staff-dasboard.component';
import {CitizenProfileComponent} from './Citizen/citizen-profile/citizen-profile.component';
import {
  BirthCertificateFormComponent
} from './birthCertificate/form/birth-certificate-form/birth-certificate-form.component';
import {
  BirthCertificateRequestListComponent
} from './birthCertificate/requestList/birth-certificate-request-list/birth-certificate-request-list.component';
import {
  BirthCertificateReviewComponent
} from './birthCertificate/requestList/birth-certificate-review/birth-certificate-review.component';
import {AddAdminComponent} from './Admin/ManageAdmin/add-admin/add-admin.component';
import {ListAdminComponent} from './Admin/ManageAdmin/list-admin/list-admin.component';
import {VerifyComponent} from './birthCertificate/verify/verify.component';
import {
  DeathCertificateFormComponent
} from './deathCertificate/death-certificate-form/death-certificate-form.component';
import {
  DeathCertificateListComponent
} from './deathCertificate/death-certificate-list/death-certificate-list.component';
import {
  MarriageCertificateRequestComponent
} from './marriageCertificate/form/marriage-certificate-request/marriage-certificate-request.component';
import {
  MarriageCertificateRequestListComponent,
} from './marriageCertificate/marriage-certificate-list/marriage-certificate-list.component';
import {
  MarriageCertificateReviewComponent
} from './marriageCertificate/marriage-certificate-review/marriage-certificate-review.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: StaffDasboardComponent, canActivate: [authGuard] },
  { path: 'citizens', component: CitizenComponent, canActivate: [authGuard] },
  { path: 'citizen/review/:id', component: ReviewComponent, canActivate: [authGuard] },
  { path: 'citizen-view', component: CitizenViewComponent, canActivate: [authGuard] },
  {path: 'citizen-form' ,component: CitizenFormComponent  },
  {path: 'super-admin-dashboard', component: SuperAdminDashboardComponent},
  {path:'citizen-profile', component: CitizenProfileComponent},
  {path:'apply/birth-certificate-form', component: BirthCertificateFormComponent},
  {path: 'apply/death-certificate-form', component: DeathCertificateFormComponent},
  {path: 'apply/marriage-certificate-form', component:MarriageCertificateRequestComponent},// Assuming same form for death certificate
  {path: 'view/birth-certificate-request-list', component: BirthCertificateRequestListComponent},
  {path: 'view/death-certificate-request-list', component: DeathCertificateListComponent}, // Assuming same list for death certificate
  {path: 'birth-certificate-review/:id', component: BirthCertificateReviewComponent},
  {path: 'marriage-certificate-review/:id', component: MarriageCertificateReviewComponent}, // Assuming same review for marriage certificate
  {path: 'staff/add-admin', component: AddAdminComponent},
  {path: 'staff/manage', component: ListAdminComponent},
  {path:'digital-signature/verify', component: VerifyComponent},
  {path: 'view/marriage-certificate-request-list', component: MarriageCertificateRequestListComponent},
  {path: 'update/citizen/:id', component: CitizenFormComponent},


];
