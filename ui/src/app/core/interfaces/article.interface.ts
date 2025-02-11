export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  audioUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  excerpt?: string;
  audioUrl?: string;
}

export interface UpdateArticleDto extends Partial<CreateArticleDto> {}
