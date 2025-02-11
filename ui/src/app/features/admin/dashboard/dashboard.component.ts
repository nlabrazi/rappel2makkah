import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { ArticleService } from "../../../core/services/article.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  recentArticles = [
    { id: 1, title: "Les fondements de la foi", date: new Date() },
    { id: 2, title: "L'importance de la prière", date: new Date() },
  ];

  recentAudios = [
    { id: 1, title: "Cours sur la foi", date: new Date() },
    { id: 2, title: "Leçon sur la prière", date: new Date() },
  ];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    console.log("🔥 Chargement du dashboard");
  }

  deleteArticle(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      // TODO: Implémenter la suppression
      console.log("Suppression article:", id);
    }
  }

  deleteAudio(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet audio ?")) {
      // TODO: Implémenter la suppression
      console.log("Suppression audio:", id);
    }
  }
}
