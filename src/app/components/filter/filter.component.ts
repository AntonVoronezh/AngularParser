import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RepositoriesData } from '../../utils/repositories-data';
import { IGithubRepositoryList } from '../../models/github-repositorie';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() repositoriesData: RepositoriesData;
  @Output() filteredRepositories = new EventEmitter<IGithubRepositoryList[]>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToFormChanges();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      row: ['login'],
      query: [null],
    });
  }

  onRadioClick(button: string): void {
    this.form.get('row').setValue(button);
  }

  subscribeToFormChanges(): void {
    this.form.valueChanges.subscribe(({ row, query }) => {
      if (this.repositoriesData.isData) {
        this.filteredRepositories.emit(this.repositoriesData.getFilterByQueryAndRow(row, query + ''));
      }
    });
  }

  onResetFormHandler(): void {
    this.form.reset();
    this.filteredRepositories.emit(this.repositoriesData.getDataForPanels());
  }
}
