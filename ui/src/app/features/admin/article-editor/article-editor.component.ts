import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ArticleService} from '../../../core/services/article.service';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  articleForm: FormGroup;
  isEditMode = false;
  submitting = false;
  currentAudioUrl?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      excerpt: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      // TODO: Charger l'article existant
    }
  }

  onAudioSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // TODO: Gérer l'upload du fichier audio
      console.log('Audio file selected:', file);
    }
  }

  formatText(command: string) {
    // TODO: Implémenter le formatage du texte
    console.log('Format command:', command);
  }

  insertList(type: 'bullet' | 'number') {
    // TODO: Implémenter l'insertion de liste
    console.log('Insert list:', type);
  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.submitting = true;
      const articleData = this.articleForm.value;

      // TODO: Sauvegarder l'article
      console.log('Saving article:', articleData);

      this.router.navigate(['/admin/dashboard']);
    }
  }

  cancel() {
    if (
      confirm(
        'Êtes-vous sûr de vouloir annuler ? Les modifications non sauvegardées seront perdues.'
      )
    ) {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}
