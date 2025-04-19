import {TestBed} from '@angular/core/testing';
import {ArticleService} from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ArticleService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
