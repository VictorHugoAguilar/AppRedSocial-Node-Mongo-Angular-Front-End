import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

// Importamos los servicios
import { UserService } from './services/user.service';

// Importamos los iconos desde fortawesome
import { faHome, faList, faUsers, faSignInAlt, faSignOutAlt, faEdit, faCaretDown, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public titulo: string;
  public faHome = faHome;
  public faList = faList;
  public faUsers = faUsers;
  public faSignInAlt = faSignInAlt;
  public faSignOutAlt = faSignOutAlt;
  public faEdit = faEdit;
  public faCaretDown = faCaretDown;
  public faUser = faUser;
  public faCog = faCog;


  public identity;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.titulo = 'Red Social Angular';
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
  }

  logout(): void {
    console.log("Saliendo de la app");
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }
}
