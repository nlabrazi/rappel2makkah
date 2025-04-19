import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ArticleService} from '../../../core/services/article.service';
import {Article} from '../../../core/interfaces/article.interface';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article?: Article;
  nextArticle?: Article;
  previousArticle?: Article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          const id = Number(params['id']);
          return this.articleService.getOne(id);
        })
      )
      .subscribe((article) => {
        if (article) {
          this.article = article;
          this.loadAdjacentArticles(article.id!);
        }
      });
  }

  private async loadAdjacentArticles(currentId: number) {
    // Pour l'instant, chargeons tous les articles et gérons la navigation
    this.articleService.getAll().subscribe((articles) => {
      const currentIndex = articles.findIndex((a) => a.id === currentId);
      this.previousArticle =
        currentIndex > 0 ? articles[currentIndex - 1] : undefined;
      this.nextArticle =
        currentIndex < articles.length - 1
          ? articles[currentIndex + 1]
          : undefined;
    });
  }

  navigateToArticle(articleId: number) {
    this.router.navigate(['/article', articleId]);
  }
}
