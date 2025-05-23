import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AudioListComponent} from './audio-list.component';

describe('AudioListComponent', () => {
  let component: AudioListComponent;
  let fixture: ComponentFixture<AudioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AudioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
