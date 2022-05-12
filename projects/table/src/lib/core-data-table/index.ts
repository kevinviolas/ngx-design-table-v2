import {BehaviorSubject, from, Observable, Subject} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {debounceTime, pluck, share, switchMap} from "rxjs/operators";
import {DataSource} from "@angular/cdk/collections";

export interface Sort {
  active: string;
  direction: 'asc' | 'desc';
}

export interface PageRequest {
  page: number;
  size: number;
  sort?: Sort;
}

export interface Page {
  content: any;
}

export interface CoreMatTableInterface {
  page$: Observable<any>;
  totalElements: number;
  paginator: MatPaginator;
  number: number;
  data: any[];
  size: number;
  fetch: (page: any) => void;
  connect: () => void;
  disconnect: () => void;
  sort: MatSort;
  sortIt: (sortidea: any) => void;
  filter: (myFilter: any) => void;
  filterData : (data:any, filter:any) => void
  filterDate: (dateFilter: FilterDateInterface) => void;
  pageNumber: Subject<number>;
  startWith: number;
}


export interface FilterDateInterface {
  active: string;
  valueStart: Date;
  valueEnd: Date;
}


export class CoreMatTable extends DataSource<Element> {
  public page$: Observable<Page>;
  public totalElements = 0;
  public number = 0;
  public size: any;
  public sort: MatSort;
  public paginator: MatPaginator;
  public data: any;
  public pageNumber: BehaviorSubject<number>;
  public startWith = 0;
  private pageSort: BehaviorSubject<Sort>;
  private pageFilter: BehaviorSubject<any>;
  private pageFilterDate: BehaviorSubject<FilterDateInterface>;
  private _totalElements = new BehaviorSubject(0);
  private backUpData: any;
  private emptyRow = false;
  private filterTable = {};
  private dataAfterSearch;

  constructor(data: any, sortRules: Sort,
              rangeRules: FilterDateInterface, size = 20, detailRaws: boolean = true,
              emptyRow: boolean = false, filterT: any = {}) {
    super();
    this.size = size;
    this.data = [...data];
    this.dataAfterSearch = [];
    this.backUpData = [...data];
    //this.totalElements = data.length;
    this.emptyRow = emptyRow;
    this.filterTable = filterT;
    this.pageSort = new BehaviorSubject<Sort>(sortRules);
    this.pageFilterDate = new BehaviorSubject<FilterDateInterface>(null);
    this.pageFilter = new BehaviorSubject<any>('');
    this.pageNumber = new BehaviorSubject<number>(this.startWith);
    this._totalElements.subscribe((page:number) => this.totalElements = page);

    this.page$ = this.pageSort.pipe(
      switchMap(sortAction => this.pageFilter.pipe(debounceTime(500))
        .pipe(
          switchMap(filter => this.pageFilterDate.pipe(
            switchMap(range => this.pageNumber.pipe(
              switchMap(page => from([{
                content: this.slice(
                  this.sortData(
                    this.filterDataObject(
                    this.filterData(
                      this.filterDateRange(
                        this.data, range
                      ), filter
                    ), this.filterTable), sortAction
                  ), page, this.size, detailRaws)
              }])), share())
            ))
          ))))



   /* if (Object.keys(this.filterTable).length > 0) {
      this.page$ = this.page$.pipe(
        switchMap(sortAction2 => this.pageFilter.pipe(debounceTime(500))
          .pipe(
            switchMap(filter => this.pageFilterDate.pipe(
              switchMap(range2 => this.pageNumber.pipe(
                switchMap(page2 => from([{
                  content: this.slice(
                    this.sortData(
                      this.filterDataObject(
                        this.filterDateRange(
                          this.dataAfterSearch, range2
                        ), this.filterTable
                      ), sortAction2
                    ), page2, this.size, detailRaws)
                }])), share())
              ))
            ))));
    }

    /*

    (likes: any[]) => {
       return likes.length === 0 ?
         Observable.of(likes) :
         Observable.combineLatest(
           likes.map(like => this.af.database.object("/citations/" + like.$key))
       )
     }

    this.page$ = this.pageFilterDate.pipe(
       startWith(rangeRules),
       switchMap(range => this.pageFilter.pipe(debounceTime(500)).pipe(
         startWith(''),
         switchMap(filter => this.pageSort.pipe(
           startWith(sortRules),
           switchMap(sortAction => this.pageNumber.pipe(
             startWith(this.startWith),
             switchMap(page => from([{
               content: this.slice(
                 this.sortData(
                   this.filterData(
                     this.filterDateRange(
                       this.data, range
                     ), filter
                   ), sortAction
                 ), page, this.size, detailRaws)
             }])),
             share()
           ))))
       )));*/
  }

  filterDateRange(data: any, range: FilterDateInterface) {
    if (!range || (!range.valueStart && !range.valueEnd)) {
      return data;
    } else if (data && data.length) {
      return data.filter((e: any) => {
        if (range.valueStart && range.valueEnd) {
          return new Date(e[range.active]) >= new Date(range.valueStart)
            && new Date(e[range.active]) <= new Date(range.valueEnd);
        } else if (range.valueStart && !range.valueEnd) {
          return new Date(e[range.active]) >= new Date(range.valueStart);
        } else if (!range.valueStart && range.valueEnd) {
          return new Date(e[range.active]) <= new Date(range.valueEnd);
        }
      });
    } else {
      return this.data;
    }
  }

  ponderation(str: string, searchKey: string) {
    let stack: string[] = str.split(' ');
    let pond: number = 0;
    for (let s of stack) {
      let search: string = s.replace(new RegExp(' ', 'g'), '')
      if (search && search.includes(searchKey)) {
        pond++;
      }
    }
    return pond;
  }

  filterData(data: any, filter: any) {
    if (this.pageNumber.getValue() > 0) {
      this.pageNumber.next(0);
      this.number = 0;
      //console.log('filterData log');
    }
    /*if (data.length === 0 && this.data) {
      data = this.data;
    }*/
    const result: any[] = [];
    if (typeof filter === "object") {
      return this.filterDataObject(data, filter);
    } else if (filter && filter.replace(/[^a-zA-Z ]/g, " ")) {
      for (let e of data) {
        e.pond = 0;
        const dataRaw: string = JSON.stringify(e).toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, " ");
        const stack: string[] = filter.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, " ")
          .split(' ');
        let combination: number = 0;
        for (let k of stack) {
          if (dataRaw.includes(k)) {
            const pond: number = this.ponderation(dataRaw, k);
            if (!e.pond) {
              e.pond = 0;
            }
            e.pond += pond;
            combination++;
          }
        }
        if (e.pond && combination === stack.length) {
          result.push(e)
        }

      }
      this.dataAfterSearch = result.filter((e => e.pond)).sort((a, b) => a > b ? 1 : (a < b ? -1 : 0));
      return result.filter((e => e.pond)).sort((a, b) => a > b ? 1 : (a < b ? -1 : 0));
    } else {
      this.dataAfterSearch = data;
      return data;
    }
  }

  filterDataObject(data: any, filter: any) {
    if (this.pageNumber.getValue() > 0) {
      this.pageNumber.next(0);
      this.number = 0;
      //console.log('filterDataObject log')
    }
    if (data.length === 0 && this.data) {
      //data = this.data;
      return data;
    }
    const result: any[] = [];
    if (filter && Object.keys(filter).length > 0) {
      for (let e of data) {
        let ok = true;
        e.pond = 0;
        Object.keys(filter).forEach(key => {
          if (filter[key].includes(e[key])) {
            //e.pond += 1;
          } else {
            //e.pond = 0;
            ok = false;
          }
        });
        //if (e.pond) {
        if (ok) {
          result.push(e)
        }
      }
      return result;
      //return result.filter((e => e.pond)).sort((a, b) => a > b ? 1 : (a < b ? -1 : 0));
    } else {
      return data;
    }
  }

  sortData(data: any, sortAction: any) {
    if (sortAction.direction !== '') {
      return data.sort((a: any, b: any) => {
        if (a === 'empty' || b === 'empty') {
          return 0;
        }
        return this.compare(a[sortAction.active], b[sortAction.active], sortAction.direction === 'asc');
      });
    } else {
      return data;
    }
  }

  compare(a: number | string | any[], b: number | string | any[], isAsc: boolean) {
    if (!a) {
      a = null;
    }
    if (!b) {
      b = null;
    }
    return (((Array.isArray(a) ? a.length : a) > ((Array.isArray(b) ? b.length : b)) ? -1 : ((Array.isArray(b) ? b.length : b)) > ((Array.isArray(a) ? a.length : a)) ? 1 : 0 ) * (isAsc ? -1 : 1));
  }

  fetch(page: number): void {
    this.pageNumber.next(page);
  }

  sortIt(sortidea: any): void {
    this.pageSort.next(sortidea);
  }

  filter(myFilter: any): void {
    if (!myFilter && this.data || !myFilter.trim() && this.data) {
      this._totalElements.next(this.data.length);
    }
    this.pageFilter.next(myFilter.toString());
    /*if (!myFilter.target.value || !myFilter.target.value.trim()) {
      this.totalElements = this.data.length;
    }
    this.pageFilter.next(myFilter.target.value);*/
  }

  filterDate(dateFilter: FilterDateInterface): void {
    this.pageFilterDate.next(dateFilter);
  }

  connect(): Observable<any> {
    return this.page$.pipe(pluck('content'));
  }

  disconnect(): void {
  }

  slice(data: any[], start: number = 0, end: number = 20, detailRow: boolean = true): any {
    const rows = [];
    this._totalElements.next(data.length);
    if (data.length) {
      data = data.slice(start * end, (start * end) + end);

      if (this.emptyRow) {
        data.forEach((d) => {
          rows.push('empty');
          rows.push(d);
        });
        return rows;
      }
      return data;
    } else {
      data = data.slice(start * end, (start * end) + end);
      if (this.emptyRow) {
        data.forEach((d) => {
          rows.push('empty');
          rows.push(d);
        });
        return rows;
      }
      return rows;
    }
  }
}
