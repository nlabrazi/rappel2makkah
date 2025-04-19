import {Routes} from '@angular/router';

export const routes: Routes = [
  // Routes publiques
  {
    path: '',
    loadComponent: () =>
      import('./features/blog/article-list/article-list.component').then(
        (m) => m.ArticleListComponent
      )
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      )
  },
  {
    path: 'articles', // Nouvelle route
    loadComponent: () =>
      import('./features/blog/article-list/article-list.component').then(
        (m) => m.ArticleListComponent
      )
  },
  {
    path: 'audios', // Nouvelle route
    loadComponent: () =>
      import('./features/blog/audio-list/audio-list.component').then(
        (m) => m.AudioListComponent
      )
  },
  {
    path: 'article/:id',
    loadComponent: () =>
      import('./features/blog/article-detail/article-detail.component').then(
        (m) => m.ArticleDetailComponent
      )
  },

  // Routes admin
  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          )
      },
      {
        path: 'article/new',
        loadComponent: () =>
          import(
            './features/admin/article-editor/article-editor.component'
          ).then((m) => m.ArticleEditorComponent)
      },
      {
        path: 'article/edit/:id',
        loadComponent: () =>
          import(
            './features/admin/article-editor/article-editor.component'
          ).then((m) => m.ArticleEditorComponent)
      },
      {
        path: 'audio/upload',
        loadComponent: () =>
          import('./features/admin/audio-upload/audio-upload.component').then(
            (m) => m.AudioUploadComponent
          )
      }
    ]
  }
];
