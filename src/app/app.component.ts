import { Component } from '@angular/core';

// Importamos los iconos desde fortawesome
import { faHome, faList, faUsers } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public titulo = 'Red Social Angular';
  public faHome = faHome;
  public faList = faList;
  public faUsers = faUsers;


}
