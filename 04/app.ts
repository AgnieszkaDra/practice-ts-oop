abstract class PluginNew {
    private static activePlugins: PluginNew[] = [];

    constructor() {
        this.install();
    }

    install(): void {
        PluginNew.activePlugins.push(this);
    }

    uninstall(): void {
        PluginNew.activePlugins = PluginNew.activePlugins.filter(plugin => plugin !== this);
    }

    static showActivePlugins(): void {
        PluginNew.activePlugins.forEach((plugin) => {
            if (isLogger(plugin)) { 
                plugin.print();
            }
        });
    }
}

interface Logger extends PluginNew {
    add(message: string): void;
    print(): void;
}

function isLogger(plugin: PluginNew): plugin is Logger {
    return "print" in plugin;
}

class Writter extends PluginNew implements Logger {
    private messages: string[] = [];

    add(message: string): void {
        this.messages.push(message);
    }

    print(): void {
        console.log(this.messages.join('\n'));
        this.messages = [];
    }
}

class Messager extends PluginNew implements Logger {
    private messages: string[] = [];

    add(message: string): void {
        this.messages.push(message);
    }

    print(): void {
        alert(this.messages.join('\n'));
        this.messages = [];
    }
}

const writter = new Writter();
writter.add("Message from Writter");

const messager = new Messager();
messager.add("Message from Messager");

PluginNew.showActivePlugins();