import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SkipSelf,
} from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
})
export class MainTableComponent implements OnInit {
  #subscription: Subscription = new Subscription();

  constructor(@SkipSelf() private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  tableName: string = 'Table name';
  checkedList: number[] = [];
  pageSize: number = 9;
  page: number = 1;
  totalPages: number = 0;
  data: any = [];
  @Output() toggleSubTable: EventEmitter<void> = new EventEmitter<void>();
  loading: boolean = false;

  fetchData() {
    this.loading = true;

    setTimeout(() => {
      this.dataService.getData(this.page, this.pageSize).subscribe((res) => {
        console.log(res);
        this.data = res.data;
        this.pageSize = res.pageSize;
        this.totalPages = res.totalPages;
        this.loading = false;
      });
    }, 300);
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj[0]);
  }

  getObjectValues(obj: any): string[] {
    return Object.values(obj);
  }

  onToggleSubTable() {
    this.toggleSubTable.emit();
  }

  formatPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  handleCheckAll(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checkedList = target.checked
      ? this.data.map((item: any) => item.id)
      : (this.checkedList = []);
  }

  toggleCheckbox(id: number): void {
    if (this.checkedList.includes(id)) {
      this.checkedList = this.checkedList.filter((itemId) => itemId !== id);
    } else {
      this.checkedList.push(id);
    }
  }

  getPagination(): string[] {
    if (this.totalPages > 0) {
      const pagination: string[] = [];
      const totalPages = this.totalPages;
      const currentPage = this.page;

      const maxVisiblePages = 6;

      pagination.push('1');

      if (currentPage <= 3) {
        for (let i = 2; i <= Math.min(maxVisiblePages - 2, totalPages); i++) {
          pagination.push(i.toString());
        }
        if (totalPages > maxVisiblePages) {
          pagination.push('...', totalPages.toString());
        }
      } else if (currentPage >= totalPages - 3) {
        if (totalPages > maxVisiblePages) {
          pagination.push('...', (totalPages - maxVisiblePages + 3).toString());
        }
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pagination.push(i.toString());
        }
      } else {
        pagination.push(
          '...',
          (currentPage - 1).toString(),
          currentPage.toString(),
          (currentPage + 1).toString(),
          '...'
        );
      }
      if (!pagination.includes(this.totalPages.toString()) && totalPages > 1) {
        pagination.push(this.totalPages.toString());
      }

      return pagination;
    } else return [''];
  }

  getHeight(items: number): string {
    return ((this.pageSize - items) * 100) / this.pageSize + '%';
  }

  setPage(value: any) {
    const newPage = parseInt(value);
    if (!isNaN(newPage)) {
      this.page =
        newPage * this.pageSize - this.data.length > this.pageSize ||
        newPage <= 0
          ? this.page
          : newPage;
    }
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.#subscription.unsubscribe();
  }
}
