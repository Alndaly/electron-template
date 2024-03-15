import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("systemApi", {
    openUrl: (url: string) => {
        ipcRenderer.invoke('open-url', url)
    },
})

contextBridge.exposeInMainWorld("electronApi", {
    windowManager: {
        getMainWindowViews: async () => {
            const ret = await ipcRenderer.invoke('get-main-window-views');
            return ret
        },
        addView: ({ title, path, query }: { title: string, path: string, query?: { [key: string]: string } }) => {
            ipcRenderer.invoke('add-view', { title, path, query });
        },
        deleteView: (id: string) => {
            ipcRenderer.invoke('delete-view', id);
        },
        switchView: (id: string) => {
            ipcRenderer.invoke('switch-view', id);
        },
        getViewQuery: async () => {
            const ret = await ipcRenderer.invoke('get-view-query');
            return ret
        },
        onMainViewsChange: (callback: (viewsData: {
            views: { title: string, id: string }[];
            active: string;
        }) => void) => {
            const cb = (_: any, viewsData: {
                views: { title: string, id: string }[];
                active: string;
            }) => {
                callback(viewsData)
            }
            ipcRenderer.on('views-change', cb);
        },
    }
});