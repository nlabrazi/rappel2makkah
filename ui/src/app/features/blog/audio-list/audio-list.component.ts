import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ArticleService } from "../../../core/services/article.service";
import { Article } from "../../../core/interfaces/article.interface";

@Component({
  selector: "app-audio-list",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: "./audio-list.component.html",
  styleUrl: "./audio-list.component.scss",
})
export class AudioListComponent implements OnInit {
  audios: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getAll().subscribe((articles) => {
      this.audios = articles.filter((article) => article.audioUrl);
    });
  }

  shareAudio(audio: Article) {
    const shareText = `Écoutez ce rappel : ${audio.title} - ${audio.audioUrl}`;
    if (navigator.share) {
      navigator.share({
        title: audio.title,
        text: shareText,
        url: audio.audioUrl,
      });
    } else {
      alert("Le partage n'est pas supporté sur ce navigateur.");
    }
  }
}
