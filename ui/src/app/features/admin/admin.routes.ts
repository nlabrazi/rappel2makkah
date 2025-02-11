import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ArticleEditorComponent } from "./article-editor/article-editor.component";
import { AudioUploadComponent } from "./audio-upload/audio-upload.component";

export const ADMIN_ROUTES: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
  {
    path: "article/new",
    component: ArticleEditorComponent,
  },
  {
    path: "article/edit/:id",
    component: ArticleEditorComponent,
  },
  {
    path: "audio/upload",
    component: AudioUploadComponent,
  },
];
