import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AudioService {
  constructor() {
    console.log("🔊 AudioService ready");
  }
}
