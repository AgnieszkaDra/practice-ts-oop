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
            if (isLogger(plugin)) {
                plugin.print();
            }
        });
    }
}
PluginNew.activePlugins = [];
function isLogger(plugin) {
    return "print" in plugin;
}
class Writter extends PluginNew {
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
class Messager extends PluginNew {
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
