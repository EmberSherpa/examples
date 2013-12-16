define('appkit/templates/application', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("<h2 id='title'>Welcome to Ember.js</h2>\n\n{{outlet}}\n"); });

define('appkit/templates/component-test', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("{{#each}}\n  {{pretty-color name=this}}\n{{/each}}\n"); });

define('appkit/templates/components/pretty-color', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("Pretty Color: {{name}}\n"); });

define('appkit/templates/group-by', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("<h2>groupBy Computed Property Example</h2>\n\n<h3>Original content</h3>\n\n<ul>\n  {{#each}}\n      <li>{{name}} ({{type}})</li>\n  {{/each}}\n</ul>\n\n<h3>groupBy('type')</h3>\n<ul>\n    {{#each grouped}}\n        <li>\n          <h4>{{group}}</h4>\n            <ul>\n            {{#each content}}\n                <li>{{name}}</li>\n            {{/each}}\n            </ul>\n        </li>\n    {{/each}}\n</ul>\n"); });

define('appkit/templates/helper-test', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("<h3>My name is {{reverse-word name}}.</h3>\n"); });

define('appkit/templates/index', ['exports'], function(__exports__){ __exports__['default'] = Ember.Handlebars.compile("<ul>\n{{#each}}\n  <li>{{this}}</li>\n{{/each}}\n</ul>\n"); });