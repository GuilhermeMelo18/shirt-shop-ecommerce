import { Component, OnInit } from '@angular/core';
import { User } from '../../entidades/user';
import { UsuarioService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userSave: User

  constructor(private userService: UsuarioService) { }

  ngOnInit() {

  }


}
