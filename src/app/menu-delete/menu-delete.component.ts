import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menu-delete',
  templateUrl: './menu-delete.component.html',
  styleUrls: ['./menu-delete.component.css']
})
export class MenuDeleteComponent {
  
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['admin/product-control']);
  }
}
