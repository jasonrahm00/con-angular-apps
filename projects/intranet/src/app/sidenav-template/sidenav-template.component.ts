import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav-template',
  templateUrl: './sidenav-template.component.html',
  styleUrls: ['./sidenav-template.component.css']
})
export class SidenavTemplateComponent implements OnInit {

  activeParent;
  active = false;
  navOpen: boolean;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.navOpen = !this.mobileQuery.matches;
  }

  toggleActive(x) {
    if(this.activeParent === x) {
      this.active = !this.active;
    } else {
      this.activeParent = x;
      this.active = true;
    }
  }

}
