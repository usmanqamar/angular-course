import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  allowAddServer = false;
  serverName = '';
  serverCreated = false;
  servers = ['Server 1', 'Server 2'];
  constructor() {
    setTimeout(() => {
      this.allowAddServer = true;
    }, 2000);
  }

  onChange(e: any) {
    console.log(e.target.value);
    this.serverName = e.target.value;
  }
  onServerCreated() {
    console.log(this.serverName);
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }
}
