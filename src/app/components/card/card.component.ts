import {Component, Input} from '@angular/core';

import { IGithubRepositoryList } from '../../models/github-repositorie';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() repository: IGithubRepositoryList;
}
