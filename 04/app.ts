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
            if (plugin instanceof Logger) {
                plugin.print();
            }
        });
    }
}

abstract class Logger extends PluginNew {
    abstract add(message: string): void;
    abstract print(): void;
}

class Writter extends Logger {
    private messages: string[] = [];

    add(message: string): void {
        this.messages.push(message);
    }

    print(): void {
        console.log(this.messages.join('\n'));
        this.messages = [];
    }
}

class Messager extends Logger {
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