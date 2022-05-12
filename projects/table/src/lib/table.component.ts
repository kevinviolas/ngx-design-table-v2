import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CellsComponentList} from "./setting/CellsComponentRegistry";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CoreMatTable, CoreMatTableInterface, FilterDateInterface, Page, PageRequest, Sort} from "./core-data-table";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute, Router} from "@angular/router";
import {TableService} from "./table.service";
import {TranslateService} from './translate.service';


interface displayColumnsConfig {
  sizeIcon?: number;
  displayYes?: boolean;
  displayNo?: boolean;
}

interface displayedColumnsInterface {
  key: string; // object key
  value: string; // display column values
  ratio?: number;
  order?: number; // sort column
  class?: string; // css class
  module?: CellsComponentList;
  override?: string | string[]; // for building url or avatar name
  display?: string; // force displaying other stuff than element[focus]
  align?: string; // cell content align 'left center right'
  sort?: boolean; // 'sortable column'
  clickable?: boolean; // enable clickable column when sorting is disable
  statement?: boolean; // by default statement is false and is used with 'clickable' options
  valueStatement?: string[];
  config?: displayColumnsConfig;
  valueOverride?: {
    [key: string]: string
  };
  fontSize?: string;
}

@Component({
  selector: 'ngx-design-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ])],
  encapsulation: ViewEncapsulation.None
})
class TableComponent implements OnInit, OnChanges {
  @ViewChild('MatPaginatorCurrent', {static: true}) paginatorCurrent: MatPaginator;
  @ViewChild('table', {static: true}) sortCurrent: MatSort;

  @Input() columnDefinitions: [displayedColumnsInterface];
  @Input() displayDetail: boolean = false;
  @Input() displayComponent: string;
  @Input() data: CoreMatTableInterface;
  @Input() lang: string;
  @Input() btnOverride = false;
  @Output() callFunction: EventEmitter<any> = new EventEmitter<any>();
  @Input() inputSearch = '';
  @Input() EmptyRow = false;
  @Input() blockDetails = false;
  @Output() clicked: EventEmitter<{ key: string, statement: boolean }> = new EventEmitter();

  public columnsToDisplay: string[];
  public filter: Array<string> = [];
  public displayedColumns: any;
  public expandedElement: any;
  public index = 0;
  public open = '';
  public search = '';
  public cancelSearch = '';
  public noResult = '';
  public details = '';
  public showTable = false;
  private PrivateColumnDefinitions: [displayedColumnsInterface];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: TableService,
              private detector: ChangeDetectorRef,
              private translate: TranslateService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  expand(element) {
    if (this.blockDetails) {
      return;
    }
    if (this.expandedElement === element) {
      this.expandedElement = null;
    } else {
      this.expandedElement = element
    }
    console.log(this.expandedElement);
  }

  ngOnInit(): void {
    this.service.emptyRow = this.EmptyRow;
    this.open = this.translate.translate(this.lang, 'OPEN');
    this.search = this.translate.translate(this.lang, 'SEARCH');
    this.cancelSearch = this.translate.translate(this.lang, 'CANCEL_SEARCH');
    this.noResult = this.translate.translate(this.lang, 'NO_RESULT');
    this.details = this.translate.translate(this.lang, 'DETAILS');

    if (this.data) {
      this.expandedElement = false;
      this.data.paginator = this.paginatorCurrent;
      this.data.sort = this.sortCurrent;

      this.data.pageNumber.subscribe((newpage: number) => {
        console.log('newpage console : ',newpage);
        if (newpage > 0) {
          this.router.navigate(
            [],
            {
              relativeTo: this.route,
              queryParams: {page: newpage + 1},
              queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
        } else if (newpage === 0) {
          this.router.navigate(
            [],
            {
              relativeTo: this.route,
              queryParams: {page: null},
              queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
            this.changeDetectorRef.markForCheck();
            //console.log('on passe dans la ligne 142');
        }
        if (this.data && this.data.paginator && this.data.paginator.pageIndex !== newpage) {
          this.data.paginator.pageIndex = newpage;
          this.changeDetectorRef.markForCheck();
          //onsole.log('on passe dans la ligne 146')
        }
      });
      const page = this.route.snapshot.queryParams["page"];
      if (page) {
        const currentPage: number = Number(page) - 1;
        this.data.startWith = currentPage;
        this.data.fetch(currentPage);
        this.data.number = currentPage;
      }
      this.PrivateColumnDefinitions = this.columnDefinitions;
      this.buildHeaders().catch((err: any) => console.log('Error build table', err));
      this.service.updateHeader.subscribe((status: boolean) => {
        if (status === true) {
          this.displayedColumns = null;
          this.columnsToDisplay = null;
          this.PrivateColumnDefinitions = this.service.displayColumn;
          console.log('Module table -> New column definitions', this.PrivateColumnDefinitions);
          this.buildHeaders().catch((err: any) => console.log('Error build table', err));
          this.detector.detectChanges();
        }
      });
    }
  }

  ngAfterViewChecked() {
    this.showTable = true;
  }

  async buildHeaders() {
    this.displayedColumns = await this.sort();
    if (this.displayedColumns) {
      const tmp: any = [];
      for (let k of this.displayedColumns) {
        tmp.push(k.key);
      }
      this.columnsToDisplay = [...tmp];
    }
    //console.log('Module Table New Update Column Definition',  this.columnsToDisplay);
  }

  generateClass(Class: string[]) {
    const MyClass: string[] = ['default-table-class'];
    for (let c of Class) {
      if (c && c !== '') {
        MyClass.push(c);
      }
    }
    return MyClass;
  }

  async sort() {
    const compare = (a: any, b: any) => {
      return (a.order < b.order ? -1 : (a.order > b.order ? 1 : 0))
    };
    if (this.PrivateColumnDefinitions) {
      return [...this.PrivateColumnDefinitions.sort(compare)];
    }
  }

  public buildLink(override: string[], element) {
    if (override.length >= 2) {
      let basePath: string = override[0];
      for (let i = 1; i < override.length; i++) {
        basePath += '/' + element[override[i]];
      }
      return basePath;
    }
  }

  public Join(elem: any, override: string[], joinKey: string = '\n'): string {
    const value: string[] = [];
    for (let x in elem) {
      if (override.indexOf(x) > -1) {
        value.push(elem[x]);
      }
    }
    return value.join(joinKey)
  }

  reset() {
    this.data.filter({
      target: {
        value: ''
      }
    });
    return true;
  }

  expandShow(template: string) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if ((this.inputSearch.length > 1 || this.inputSearch.length === 0)
      && this.inputSearch.length < 200) {
      if (this.data) {
        this.data.filter(this.inputSearch);
        this.data.pageNumber.next(0)
        this.data.fetch(0);
        this.data.number = 0;
        this.changeDetectorRef.markForCheck();
      }
    }

    this.ngOnInit();
  }

}

export {
  CoreMatTable,
  FilterDateInterface,
  CoreMatTableInterface,
  Page,
  PageRequest,
  Sort,
  displayedColumnsInterface,
  CellsComponentList,
  TableComponent
}
