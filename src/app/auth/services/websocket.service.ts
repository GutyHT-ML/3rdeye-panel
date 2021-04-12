import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";
import Ws from '@adonisjs/websocket-client';
import { NotificationService } from 'src/app/main/pages/views/services/notification.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  ws!: any;

constructor(private dataSvc: DataService) { }
  subscribeImages(): any{
    this.ws = Ws(environment.WS_URL);
    this.ws.connect();
    const username = this.dataSvc.onGetCookie('username');
    const socket = this.ws.subscribe("images:" + username);
    return socket;
  }

  subscribeValues(): any{
    this.ws = Ws(environment.WS_URL);
    this.ws.connect();
    const username = this.dataSvc.onGetCookie('username');
    const socket = this.ws.subscribe("values:" + username);
    return socket;
  }

  subscribeVideoFeed(): any{
    this.ws = Ws(environment.WS_URL);
    this.ws.connect();
    const username = this.dataSvc.onGetCookie('username');
    const socket = this.ws.subscribe("video:" + username);
    return socket;
  }
}
