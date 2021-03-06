// Type definitions for webpack-dev-server 3.9
// Project: https://github.com/webpack/webpack-dev-server
// Definitions by: maestroh <https://github.com/maestroh>
//                 Dave Parslow <https://github.com/daveparslow>
//                 Zheyang Song <https://github.com/ZheyangSong>
//                 Alan Agius <https://github.com/alan-agius4>
//                 Artur Androsovych <https://github.com/arturovt>
//                 Dave Cardwell <https://github.com/davecardwell>
//                 Katsuya Hino <https://github.com/dobogo>
//                 Billy Le <https://github.com/billy-le>
//                 Chris Paterson <https://github.com/chrispaterson>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import * as webpack from 'webpack';
import * as httpProxyMiddleware from 'http-proxy-middleware';
import * as express from 'express';
import * as serveStatic from 'serve-static';
import * as https from 'https';
import * as http from 'http';
import * as connectHistoryApiFallback from 'connect-history-api-fallback';

declare namespace WebpackDevServer {
    interface ListeningApp {
        address(): { port?: number };
    }

    interface ProxyConfigMap {
        [url: string]: string | httpProxyMiddleware.Config;
    }

    type ProxyConfigArrayItem = {
        path?: string | string[];
        context?: string | string[] | httpProxyMiddleware.Filter;
    } & httpProxyMiddleware.Config;

    type ProxyConfigArray = ProxyConfigArrayItem[];

    interface Configuration {
        /**
         * Provides the ability to execute custom middleware after all other
         * middleware internally within the server.
         */
        after?: (app: express.Application, server: WebpackDevServer, compiler: webpack.Compiler) => void;
        /**
         * This option allows you to whitelist services that are allowed to
         * access the dev server.
         */
        allowedHosts?: string[];
        /**
         * Provides the ability to execute custom middleware prior to all
         * other middleware internally within the server.
         */
        before?: (app: express.Application, server: WebpackDevServer, compiler: webpack.Compiler) => void;
        /**
         * This option broadcasts the server via ZeroConf networking on start.
         */
        bonjour?: boolean;
        /**
         * When using inline mode, the console in your DevTools will show you
         * messages e.g. before reloading, before an error or when Hot Module
         * Replacement is enabled. This may be too verbose.
         *
         * 'none' and 'warning' are going to be deprecated at the next major
         * version.
         */
        clientLogLevel?: 'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'none' | 'warning';
        /**
         * Enable gzip compression for everything served.
         */
        compress?: boolean;
        /**
         * Tell the server where to serve content from. This is only necessary
         * if you want to serve static files. devServer.publicPath will be used
         * to determine where the bundles should be served from, and takes
         * precedence.
         */
        contentBase?: boolean | string | string[] | number;
        /**
         * When set to true this option bypasses host checking.  THIS IS NOT
         * RECOMMENDED as apps that do not check the host are vulnerable to DNS
         * rebinding attacks.
         */
        disableHostCheck?: boolean;
        /**
         * This option lets you reduce the compilations in lazy mode.
         * By default in lazy mode, every request results in a new compilation.
         * With filename, it's possible to only compile when a certain file is requested.
         */
        filename?: string;
        /** Adds headers to all responses. */
        headers?: {
            [key: string]: string;
        };
        /**
         * When using the HTML5 History API, the index.html page will likely
         * have to be served in place of any 404 responses.
         */
        historyApiFallback?: boolean | connectHistoryApiFallback.Options;
        /**
         * Specify a host to use. By default this is localhost.
         */
        host?: string;
        /**
         * Enable webpack's Hot Module Replacement feature.
         * Note that webpack.HotModuleReplacementPlugin is required to fully
         * enable HMR. If webpack or webpack-dev-server are launched with the
         * --hot option, this plugin will be added automatically, so you may
         * not need to add this to your webpack.config.js.
         */
        hot?: boolean;
        /**
         * Enables Hot Module Replacement (see devServer.hot) without page
         * refresh as fallback in case of build failures.
         */
        hotOnly?: boolean;
        /**
         * Serve over HTTP/2 using spdy. This option is ignored for Node 10.0.0
         * and above, as spdy is broken for those versions. The dev server will
         * migrate over to Node's built-in HTTP/2 once Express supports it.
         */
        http2?: boolean;
        /**
         * By default dev-server will be served over HTTP. It can optionally be
         * served over HTTP/2 with HTTPS.
         */
        https?: boolean | https.ServerOptions;
        /**
         * The filename that is considered the index file.
         */
        index?: string;
        /**
         * Tells devServer to inject a client. Setting devServer.injectClient
         * to true will result in always injecting a client. It is possible to
         * provide a function to inject conditionally
         */
        injectClient?: boolean | ((compilerConfig: webpack.Compiler) => boolean);
        /**
         * Tells devServer to inject a Hot Module Replacement. Setting
         * devServer.injectHot to true will result in always injecting. It is
         * possible to provide a function to inject conditionally
         */
        injectHot?: boolean | ((compilerConfig: webpack.Compiler) => boolean);
        /**
         * Toggle between the dev-server's two different modes.  By default the
         * application will be served with inline mode enabled.  This means
         * that a script will be inserted in your bundle to take care of live
         * reloading, and build messages will appear in the browser console.
         */
        inline?: boolean;
        /**
         * When lazy is enabled, the dev-server will only compile the bundle
         * when it gets requested.  This means that webpack will not watch any
         * file changes.
         */
        lazy?: boolean;
        /**
         * By default, the dev-server will reload/refresh the page when file
         * changes are detected. devServer.hot option must be disabled or
         * devServer.watchContentBase option must be enabled in order for
         * liveReload to take effect. Disable devServer.liveReload by setting
         * it to false
         */
        liveReload?: boolean;
        /**
         * The object is passed to the underlying webpack-dev-middleware. See
         * [documentation](https://github.com/webpack/webpack-dev-middleware#mimetypes)
         * for usage notes.
         */
        mimeTypes?:
            | {
                  [key: string]: string[];
              }
            | {
                  typeMap?: {
                      [key: string]: string[];
                  } & {
                      force: boolean;
                  };
              };
        /**
         * With noInfo enabled, messages like the webpack bundle information
         * that is shown when starting up and after each save,will be hidden.
         * Errors and warnings will still be shown.
         */
        noInfo?: boolean;
        /**
         * Provides an option to execute a custom function when
         * webpack-dev-server starts listening for connections on a port.
         */
        onListening?: (server: WebpackDevServer) => void;
        /** When open is enabled, the dev server will open the browser. */
        open?: boolean | string;
        /** Specify a page to navigate to when opening the browser. */
        openPage?: string | string[];
        /**
         * Shows a full-screen overlay in the browser when there are compiler
         * errors or warnings. Disabled by default.
         */
        overlay?:
            | boolean
            | {
                  warnings?: boolean;
                  errors?: boolean;
              };
        /**
         * When used via the CLI, a path to an SSL .pfx file. If used in
         * options, it should be the bytestream of the .pfx file.
         */
        pfx?: string;
        /** The passphrase to a SSL PFX file. */
        pfxPassphrase?: string;
        /** Specify a port number to listen for requests on. */
        port?: number;
        /**
         * Proxying some URLs can be useful when you have a separate API
         * backend development server and you want to send API requests on the
         * same domain.
         *
         * The dev-server makes use of the powerful http-proxy-middleware
         * package. Check out its
         * [documentation](https://github.com/chimurai/http-proxy-middleware#options)
         * for more advanced usages. Note that some of http-proxy-middleware's
         * features do not require a target key, e.g. its router feature, but
         * you will still need to include a target key in your config here,
         * otherwise webpack-dev-server won't pass it along to
         * http-proxy-middleware).
         */
        proxy?: ProxyConfigMap | ProxyConfigArray;
        /**
         * When using inline mode and you're proxying dev-server, the inline
         * client script does not always know where to connect to.  It will try
         * to guess the URL of the server based on window.location, but if that
         * fails you'll need to use this.
         */
        public?: string;
        /**
         * The bundled files will be available in the browser under this path.
         * default is '/'
         */
        publicPath?: string;
        /**
         * With quiet enabled, nothing except the initial startup information
         * will be written to the console.  This also means that errors or
         * warnings from webpack are not visible.
         */
        quiet?: boolean;
        /**
         * Tells dev-server to use serveIndex middleware when enabled.
         *
         * serveIndex middleware generates directory listings on viewing
         * directories that don't have an index.html file.
         */
        serveIndex?: boolean;
        /**
         * @deprecated This option is deprecated in favor of devServer.before
         * and will be removed in v3.0.0. Here you can access the Express app
         * object and add your own custom middleware to it.
         */
        setup?: (app: express.Application, server: WebpackDevServer) => void;
        /** The Unix socket to listen to (instead of a host). */
        socket?: string;
        /**
         * Tells clients connected to devServer to use provided socket host.
         */
        sockHost?: string;
        /**
         * The path at which to connect to the reloading socket. Default is
         * '/sockjs-node'
         */
        sockPath?: string;
        /**
         * Tells clients connected to devServer to use provided socket port.
         */
        sockPort?: string | number;
        /**
         * It is possible to configure advanced options for serving static
         * files from contentBase.
         *
         * This only works when using devServer.contentBase as a string.
         */
        staticOptions?: serveStatic.ServeStaticOptions;
        /**
         * This option lets you precisely control what bundle information gets
         * displayed.  This can be a nice middle ground if you want some bundle
         * information, but not all of it.
         */
        stats?: webpack.Options.Stats;
        /**
         * transportMode is an experimental option, meaning its usage could
         * potentially change without warning.
         *
         * Providing a string to devServer.transportMode is a shortcut to
         * setting both devServer.transportMode.client and
         * devServer.transportMode.server to the given string value.
         *
         * This option allows us either to choose the current devServer
         * transport mode for client/server individually or to provide custom
         * client/server implementation. This allows to specify how browser or
         * other client communicates with the devServer.
         *
         * The current default mode is 'sockjs'. This mode uses SockJS-node as
         * a server, and SockJS-client on the client.
         *
         * 'ws' mode will become the default mode in the next major devServer
         * version. This mode uses ws as a server, and native WebSockets on the
         * client.
         */
        transportMode?:
            'sockjs'
            | 'ws'
            | {
              client: object,
              server: 'ws',
            }
            | {
              client: 'ws',
              server: object,
            }
            | {
              client: object,
              server: object,
            };
        /** This option lets the browser open with your local IP. */
        useLocalIp?: boolean;
        /**
         * Tell the server to watch the files served by the
         * devServer.contentBase option. File changes will trigger a full page
         * reload.
         */
        watchContentBase?: boolean;
        /** Control options related to watching the files. */
        watchOptions?: webpack.WatchOptions;
        /** Tells devServer to write generated assets to the disk. */
        writeToDisk?: boolean | ((filePath: string) => boolean);
    }
}

declare module 'webpack' {
    interface Configuration {
        /**
         * Can be used to configure the behaviour of webpack-dev-server when
         * the webpack config is passed to webpack-dev-server CLI.
         */
        devServer?: WebpackDevServer.Configuration;
    }
}

declare class WebpackDevServer {
    constructor(webpack: webpack.Compiler | webpack.MultiCompiler, config?: WebpackDevServer.Configuration);

    static addDevServerEntrypoints(
        webpackOptions: webpack.Configuration | webpack.Configuration[],
        config: WebpackDevServer.Configuration,
        listeningApp?: WebpackDevServer.ListeningApp,
    ): void;

    listen(port: number, hostname: string, callback?: (error?: Error) => void): http.Server;

    listen(port: number, callback?: (error?: Error) => void): http.Server;

    close(callback?: () => void): void;
}

export = WebpackDevServer;
