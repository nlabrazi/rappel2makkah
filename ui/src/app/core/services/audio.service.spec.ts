import {TestBed} from '@angular/core/testing';
import {AudioService} from './audio.service';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new AudioService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
