import { ComponentFixture, TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { QuestionInput } from './question-input';

describe('QuestionInput', () => {
  let fixture: ComponentFixture<QuestionInput>;
  let component: QuestionInput;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionInput],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionInput);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reject empty questions', () => {
    component.questionControl.setValue('');

    expect(component.questionForm.invalid).toBe(true);
  });

  it('should reject whitespace-only questions', () => {
    component.questionControl.setValue('          ');

    expect(component.questionControl.invalid).toBe(true);

    expect(component.questionControl.hasError('meaningfulMinLength')).toBe(true);
  });

  it('should accept a valid question', () => {
    component.questionControl.setValue('Explain the architecture of RAG');

    component.topKControl.setValue(2);

    expect(component.questionForm.valid).toBe(true);
  });

  it('should reject topK outside the range', () => {
    component.questionControl.setValue('Explain the architecture of RAG');

    component.topKControl.setValue(5);

    expect(component.questionForm.invalid).toBe(true);
  });

  it('should emit a typed RagRequest', () => {
    const listener = vi.fn();

    const subscription = component.questionSubmitted.subscribe(listener);

    component.questionControl.setValue('  Explain semantic search  ');

    component.topKControl.setValue(2);

    component.onSubmit();

    expect(listener).toHaveBeenCalledWith({
      question: 'Explain semantic search',
      topK: 2,
    });

    expect(component.questionControl.value).toBe('');

    subscription.unsubscribe();
  });
});
