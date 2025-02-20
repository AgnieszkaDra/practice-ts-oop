"use strict";
class PluginNew {
    constructor() {
        this.install();
    }
    install() {
        PluginNew.activePlugins.push(this);
    }
    uninstall() {
        PluginNew.activePlugins = PluginNew.activePlugins.filter(plugin => plugin !== this);
    }
    static showActivePlugins() {
        PluginNew.activePlugins.forEach((plugin) => {
            if (plugin instanceof Logger) {
                plugin.print();
            }
        });
    }
}
PluginNew.activePlugins = [];
class Logger extends PluginNew {
}
class Writter extends Logger {
    constructor() {
        super(...arguments);
        this.messages = [];
    }
    add(message) {
        this.messages.push(message);
    }
    print() {
        console.log(this.messages.join('\n'));
        this.messages = [];
    }
}
class Messager extends Logger {
    constructor() {
        super(...arguments);
        this.messages = [];
    }
    add(message) {
        this.messages.push(message);
    }
    print() {
        alert(this.messages.join('\n'));
        this.messages = [];
    }
}
const writter = new Writter();
writter.add("Message from Writter");
const messager = new Messager();
messager.add("Message from Messager");
PluginNew.showActivePlugins();
