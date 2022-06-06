import { Application } from '@hotwired/stimulus';
import TabsController from 'index';

const application = Application.start();
application.register('tabs', TabsController);

describe('callbacks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="tabs">
        <ul data-tabs-target="tabs">
          <li><a data-tab-id="tab1">Tab1</a></li>
          <li><a data-tab-id="tab2">Tab2</a></li>
        </ul>
        <div>
          <div style="display: none;" data-pane-id="tab1">
            <p>tab1 content</p>
          </div>
          <div style="display: none;" data-pane-id="tab2">
            <p>tab2 content</p>
          </div>
        </div>
      </div>
    `;
  });

  let messages = [];
  beforeEach(() => {
    $('[data-controller="tabs"]').addEventListener('tabs:opened', (e) => {
      messages.push('opened: ' + e.detail.pane.getAttribute('data-pane-id'));
    });
    $('[data-controller="tabs"]').addEventListener('tabs:closed', (e) => {
      messages.push('closed: ' + e.detail.pane.getAttribute('data-pane-id'));
    });
  });

  it('run callbacks', () => {
    // Although there is an 'opened' event on page load, the event listeners in
    // the tests are connected after it fired
    expect(messages).toEqual([]);

    // Clicking the same tab should not have any effect
    $('a[data-tab-id="tab1"]').click();
    expect(messages).toEqual([]);

    $('a[data-tab-id="tab2"]').click();
    expect(messages).toEqual(['closed: tab1', 'opened: tab2']);
  });
});
