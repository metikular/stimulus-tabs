var t=require("@hotwired/stimulus");require("@kanety/stimulus-static-actions");class e{constructor(t){this.controller=t}get tabs(){return this.controller.tabs}get currentTabs(){return this.controller.currentTabs}get key(){return this.controller.storeKeyValue}load(){var t=this.constructor.load(this.key);if(t){var e=new Set(t);this.tabs.forEach(t=>{e.has(this.controller.getTabID(t))?this.controller.open(t):this.controller.close(t)})}}save(){var t=this.currentTabs.map(t=>this.controller.getTabID(t));this.constructor.save(this.key,t)}static load(t){if(t){var e=sessionStorage.getItem(t);try{return JSON.parse(e)}catch(t){return null}}}static save(t,e){t&&sessionStorage.setItem(t,JSON.stringify(e))}}class s extends t.Controller{get tabs(){return Array.from(this.tabsTarget.children)}get currentTabs(){return this.tabs.filter(t=>t.matches(".st-tabs__tab--current"))}connect(){this.store=new e(this),this.store.load()}show(t){t.target.matches("a[href]")&&(this.currentTabs.forEach(t=>this.close(t)),this.open(t.target.parentNode),t.preventDefault())}open(t){var e=this.findPane(t);this.toggleClass(t,e,!0),this.dispatch("opened",{detail:{tab:t,pane:e}}),this.store.save()}close(t){var e=this.findPane(t);this.toggleClass(t,e,!1),this.dispatch("closed",{detail:{tab:t,pane:e}}),this.store.save()}toggleClass(t,e,s){t.classList.toggle("st-tabs__tab--current",s),e.style.display=s?"":"none",e.classList.toggle("st-tabs__pane--visible",s)}findPane(t){var e=this.getTabID(t);return this.element.querySelector('[data-pane-id="'+e+'"]')}getTabID(t){return t.querySelector("a[href]").getAttribute("href").replace(/^#/,"")}}s.targets=["tabs"],s.values={storeKey:String},s.actions=[["tabs","click->show"]],module.exports=s;
//# sourceMappingURL=index.js.map
