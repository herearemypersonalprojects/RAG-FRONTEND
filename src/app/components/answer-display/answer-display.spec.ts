import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerDisplay } from './answer-display';

describe('AnswerDisplay', () => {
  let component: AnswerDisplay;
  let fixture: ComponentFixture<AnswerDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(AnswerDisplay);
    fixture.componentRef.setInput('answer', 'The capital of France is Paris.');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
