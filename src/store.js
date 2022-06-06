export default class Store {
  constructor(controller) {
    this.controller = controller;
  }

  get tabs() {
    return this.controller.tabs;
  }

  get currentTab() {
    return this.controller.currentTab;
  }

  get key() {
    return this.controller.storeKeyValue;
  }

  load() {
    let id = this.constructor.load(this.key);
    if (!id) return;

    this.tabs.forEach((tab) => {
      if (id === this.controller.getTabID(tab)) {
        this.controller.open(tab);
      } else {
        this.controller.close(tab);
      }
    });
  }

  save() {
    const tab = this.controller.currentTab;
    const id = this.controller.getTabID(tab);

    if (id) {
      this.constructor.save(this.key, id);
    }
  }

  static load(key) {
    if (!key) return;

    return sessionStorage.getItem(key);
  }

  static save(key, value) {
    if (!key) return;

    sessionStorage.setItem(key, value);
  }
}
