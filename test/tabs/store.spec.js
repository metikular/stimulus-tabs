import { Application } from "@hotwired/stimulus";
import TabsController from "index";

const application = Application.start();
application.register("tabs", TabsController);

describe("index", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="tabs" data-tabs-store-key-value="tabs">
        <ul data-tabs-target="tabs">
          <li><a data-tab-id="tab1">Tab1</a></li>
          <li><a data-tab-id="tab2">Tab2</a></li>
        </ul>
        <div>
          <div class="hidden" data-pane-id="tab1">
            <p>tab1 content</p>
          </div>
          <div class="hidden" data-pane-id="tab2">
            <p>tab2 content</p>
          </div>
        </div>
      </div>
    `;
  });

  it("saves states", () => {
    // First tab is automatically opened
    expect($('[data-pane-id="tab1"]').classList.contains("hidden")).toBe(false);
    expect($('[data-pane-id="tab2"]').classList.contains("hidden")).toBe(true);

    $('a[data-tab-id="tab2"]').click();
    expect($('[data-pane-id="tab1"]').classList.contains("hidden")).toBe(true);
    expect($('[data-pane-id="tab2"]').classList.contains("hidden")).toBe(false);
  });

  it("loads states", () => {
    expect($('[data-pane-id="tab1"]').classList.contains("hidden")).toBe(true);
    expect($('[data-pane-id="tab2"]').classList.contains("hidden")).toBe(false);
  });
});
