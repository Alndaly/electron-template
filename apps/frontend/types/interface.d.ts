interface Window {
    systemApi: {
        openUrl: (url: string) => void,
    },
    electronApi: {
        windowManager: {
            getMainWindowViews: () => Promise<{ active: string, views: { title: string, id: string }[] }>,
            addView: (view: { title: string, path: string, query?: { [key: string]: string } }) => void,
            deleteView: (id: string) => void,
            switchView: (id: string) => void,
            onMainViewsChange: (callback: (viewsData: {
                views: { title: string, id: string }[];
                active: string;
            }) => void) => void,
            getViewQuery: () => Promise<{ [key: string]: string }>
        }
    }
}