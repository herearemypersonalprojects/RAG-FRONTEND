import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionDisplay } from './question-display';

describe('QuestionDisplay', () => {
  let component: QuestionDisplay;
  let fixture: ComponentFixture<QuestionDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionDisplay);
    fixture.componentRef.setInput('lastQuestion', 'What is the capital of France?');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
