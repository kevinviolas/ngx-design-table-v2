import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CountryISO } from 'ngx-intl-tel-input';
import { parsePhoneNumber, isValidPhoneNumber, parse } from 'libphonenumber-js';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-phone-display',
    templateUrl: './phone-display.component.html',
    styleUrls: ['./phone-display.component.scss']
})
export class PhoneDisplayComponent implements OnInit, OnChanges {
    @Input() number: string;
    public display: string;
    flag = '';

    constructor(
        private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.display = this.normalize(this.number)

        this.flag = (this.number && this.number != '' && isValidPhoneNumber(this.number) ? parsePhoneNumber(this.number).country : 'FR');
        this.flag = !this.number ? '': this.flag;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.ngOnInit();
    }

    private normalize(str: string) {
        if (str && isValidPhoneNumber(str)) {
            return parsePhoneNumber(str).formatNational();
        } else if (str) {
            const phone = parsePhoneNumber(str, 'FR');
            if (phone.isValid()) {
                return phone.formatNational();
            } else {
                return '';
            }
        } else {
            return '';
        }
        str = (str || '').replace(/[^\d]/g, "");
        if (str.length == 10) {
            //reformat and return phone number
            return str.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "(+33) $1.$2.$3.$4.$5");
        } else if (str.length > 10 && str.length <= 13) {
            if (str.length === 11) {
                //str = '0'+str;
            }
            //if ( str.length === 13 && str.includes('+')) {
                let tmp = str.slice(2, 3);
                let end = str.slice(3, str.length);
                str = '0' + tmp + end;
            //}
            //return str.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "(+$1) $2.$3.$4.$5.$6");
            return str.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1.$2.$3.$4.$5");
        }

        return null;
    }

}
