import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';

interface UploadFile {
  file: File;
  name: string;
  size: number;
  progress?: number;
  uploading?: boolean;
  previewUrl?: string;
}

@Component({
  selector: 'app-audio-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule
  ],
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.scss']
})
export class AudioUploadComponent {
  uploadedFiles: UploadFile[] = [];
  isDragging = false;
  isUploading = false;

  constructor(private router: Router) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.handleFiles(files);
    }
  }

  handleFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('audio/')) {
        const uploadFile: UploadFile = {
          file,
          name: file.name,
          size: file.size
        };

        // Créer une URL de prévisualisation
        uploadFile.previewUrl = URL.createObjectURL(file);
        this.uploadedFiles.push(uploadFile);
      }
    });
  }

  removeFile(index: number) {
    const file = this.uploadedFiles[index];
    if (file.previewUrl) {
      URL.revokeObjectURL(file.previewUrl);
    }
    this.uploadedFiles.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  uploadFiles() {
    this.isUploading = true;

    // Simuler un upload
    this.uploadedFiles.forEach((file) => {
      file.uploading = true;
      file.progress = 0;

      const interval = setInterval(() => {
        if (file.progress !== undefined && file.progress < 100) {
          file.progress += 10;
        } else {
          clearInterval(interval);
          file.uploading = false;
        }
      }, 500);
    });

    // TODO: Implémenter le véritable upload des fichiers
    setTimeout(() => {
      this.isUploading = false;
      this.router.navigate(['/admin/dashboard']);
    }, 5000);
  }

  cancel() {
    if (this.uploadedFiles.length > 0) {
      if (
        confirm(
          'Êtes-vous sûr de vouloir annuler ? Les fichiers sélectionnés seront perdus.'
        )
      ) {
        this.router.navigate(['/admin/dashboard']);
      }
    } else {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}
