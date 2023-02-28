import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: 'server.component.html'
})

export class ServerComponent {
  serverId = 10
  serverStatus = 'offline'
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'Online': 'Offline'
    setTimeout(() =>     this.serverStatus = Math.random() > 0.5 ? 'Online': 'Offline', 4000)
  }

  getId() {
    return this.serverId
  }
  getColor(){
    return this.serverStatus === 'Online'? 'green' :'red'
  }
}
