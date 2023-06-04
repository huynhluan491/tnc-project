import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutAPIService } from '../../shared/services/layout-api.service';
import { DTOBrand } from '../../shared/dto/DTOBrand';
import { Subscription } from 'rxjs';
import { Ps_UtilObjectService } from 'src/app/p-lib/ultilities/ulity.object';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
    //Declare variables
    brandList: DTOBrand[] = []

    //Subscription
    getBrandList_sst: Subscription;

    constructor(private readonly layoutAPIService: LayoutAPIService) { }

    ngOnInit(): void {
        this.getBrandList()
    }

    getBrandList() {
        this.getBrandList_sst = this.layoutAPIService.GetBrands().subscribe((res: any) => {
            if (Ps_UtilObjectService.hasValue(res) && res.code == 200) {
                this.brandList = [...res.data.brands]
                console.log(this.brandList);
            }
        })
    }

    ngOnDestroy(): void {
        this.getBrandList_sst?.unsubscribe();
    }
}