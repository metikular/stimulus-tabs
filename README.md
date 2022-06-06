# Stimulus Tabs

A stimulus controller for tabs.

## Installation

Install from npm:

```bash
$ yarn add stimulus-tabs
```

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import Tabs from 'stimulus-tabs';

const application = Application.start();
application.register('tabs', Tabs);
```

In your view:

```html
<div data-controller="tabs">
  <ul data-tabs-target="tabs">
    <li><a href="#tab1">Tab 1</a></li>
    <li><a href="#tab2">Tab 2</a></li>
  </ul>
  <div>
    <div data-pane-id="tab1">
      <p>Tab1 content</p>
    </div>
    <div data-pane-id="tab2">
      <p>Tab2 content</p>
    </div>
  </div>
</div>
```

### Options

#### store-key

Save tab state to `sessionStorage`:

```html
<div data-controller="tabs"
     data-tabs-store-key-value="YOUR_KEY">
</div>
```

### Callbacks

```javascript
let element = document.querySelector('[data-controller="tabs"]')
element.addEventListener('tabs:opened', (e) => {
  console.log(e.detail.tab);
  console.log(e.detail.pane);
});
element.addEventListener('tabs:closed', (e) => {
  console.log(e.detail.tab);
  console.log(e.detail.pane);
});
```

## License

This project is released under the [MIT License](http://opensource.org/licenses/MIT).
