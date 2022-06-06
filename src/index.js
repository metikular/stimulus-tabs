import { Controller } from "@hotwired/stimulus";
import Store from "./store";

export default class extends Controller {
  static targets = ["tabs"];
  static values = {
    storeKey: String,
    hiddenClass: { type: String, default: "hidden" },
    currentClass: { type: String, default: "current" },
  };

  get tabs() {
    return Array.from(this.tabsTarget.querySelectorAll("[data-tab-id]"));
  }

  get currentTab() {
    return this.tabsTarget.querySelector("[data-tabs-current]");
  }

  connect() {
    this.store = new Store(this);
    this.store.load();

    this.tabs.forEach((tab) => {
      tab.dataset.action = "click->tabs#show";
    });

    if (!this.currentTab && this.tabs.length > 0) {
      this.open(this.tabs[0]);
    }
  }

  show(event) {
    event.preventDefault();

    const tabToOpen = event.target;

    if (this.currentTab === tabToOpen) return;

    this.close(this.currentTab);
    this.open(tabToOpen);
  }

  open(tab) {
    let pane = this.findPane(tab);
    this.togglePane(tab, pane, true);
    this.dispatch("opened", { detail: { tab, pane } });
    this.store.save();
  }

  close(tab) {
    if (!tab) return;

    let pane = this.findPane(tab);
    this.togglePane(tab, pane, false);
    this.dispatch("closed", { detail: { tab, pane } });
    this.store.save();
  }

  togglePane(tab, pane, flag) {
    if (flag) {
      tab.dataset.tabsCurrent = "true";
      pane.classList.remove(this.hiddenClassValue);
    } else {
      delete tab.dataset.tabsCurrent;
      pane.classList.add(this.hiddenClassValue);
    }

    tab.classList.toggle("tab--current", flag);
  }

  findPane(tab) {
    let id = this.getTabID(tab);

    return this.element.querySelector(`[data-pane-id="${id}"]`);
  }

  getTabID(tab) {
    return tab?.dataset?.tabId;
  }
}
