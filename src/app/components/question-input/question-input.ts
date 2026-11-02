import { Component, inject, input, output } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule,
  FormBuilder,
  Validators } from '@angular/forms';

import { RagRequest } from '../../models/rag.model';

import { meaningfulQuestionValidator } from '../../validators/question.validator';

@Component({
  selector: 'app-question-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './question-input.html',
  styleUrl: './question-input.scss',
})
export class QuestionInput {
  readonly loading = input(false);

  readonly questionSubmitted = output<RagRequest>();

  private readonly fb = inject(FormBuilder);

  readonly questionForm = this.fb.nonNullable.group({
    question: ['', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(2000),
        meaningfulQuestionValidator(10),
      ],
    }],
    topK: [3, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(3),
        Validators.pattern(/^[1-3]$/),
      ],
    }],
  });

  get questionControl(): FormControl<string> {
    return this.questionForm.controls.question;
  }

  get topKControl(): FormControl<number> {
    return this.questionForm.controls.topK;
  }

  onSubmit(): void {
    if (this.loading() || this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      return;
    }

    const formValue = this.questionForm.getRawValue();

    const request: RagRequest = {
      question: formValue.question.trim(),
      topK: formValue.topK,
    };

    this.questionSubmitted.emit(request);

    this.questionControl.reset();
  }
}
