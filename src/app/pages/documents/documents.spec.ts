import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DocumentsPage } from './documents';

describe('DocumentsPage', () => {
  let component: DocumentsPage;
  let fixture: ComponentFixture<DocumentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
