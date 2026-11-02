import { Component, computed, inject } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { DocumentInfo } from '../../models/document.model';

@Component({
  selector: 'app-documents-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './documents.html',
  styleUrl: './documents.scss',
})
export class DocumentsPage {
  private readonly route = inject(ActivatedRoute);

  readonly documents: DocumentInfo[] = [
    {
      id: 'doc-001',
      name: 'rag-guide.pdf',
      type: 'PDF',
      description: 'Introduction to Retrieval Augmented Generation',
    },
    {
      id: 'doc-002',
      name: 'spring-boot.md',
      type: 'Markdown',
      description: 'Spring Boot architecture and REST APIs',
    },
    {
      id: 'doc-003',
      name: 'opensearch-guide.txt',
      type: 'Text',
      description: 'Vector search and OpenSearch indexing',
    },
  ];

  readonly selectedId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))), {
    initialValue: null,
  });

  readonly selectedDocument = computed(() => {
    const id = this.selectedId();

    return this.documents.find((doc) => doc.id === id) ?? null;
  });
}
