import { Component, Input } from "@angular/core";
import { BreadCrumbItem } from "@progress/kendo-angular-navigation";
import { homeIcon } from "@progress/kendo-svg-icons";

const defaultItems: BreadCrumbItem[] = [
    {
        text: "",
        title: "laptop",
        icon: "icon_home.svg",
    },
    {
        text: "Trang chủ",
        title: "laptop",
        icon: ""
    },
    {
        text: "test",
    }
];

@Component({
    selector: "app-breadcrumb",
    templateUrl: './breadcrumb.component.html',
    styleUrls: ["./breadcrumb.component.scss"]
})
export class BreadcrumbComponent {
    public items: BreadCrumbItem[] = [...defaultItems];

    // @Input()
}