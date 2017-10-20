
export declare global {

    export interface CytoscapeD {

        // Graph manipulation
        add(args?: any)
        remove(args?: any)
        collection(args?: any)
        getElementById(args?: any)
        $(args?: any)
        batch(args?: any)
        destroy(args?: any)
        scratch(args?: any)
        removeScratch(args?: any)

        // Events
        on(args?: any)
        promiseOn(args?: any)
        one(args?: any)
        removeListener(args?: any)
        emit(args?: any)
        ready(args?: any)

        // Viewport manipulation
        container(args?: any)
        center(args?: any)
        fit(args?: any)
        reset(args?: any)
        pan(args?: any)
        panBy(args?: any)
        panningEnabled(args?: any)
        userPanningEnabled(args?: any)
        zoom(args?: any)
        zoomingEnabled(args?: any)
        userZoomingEnabled(args?: any)
        minZoom(args?: any)
        maxZoom(args?: any)
        viewport(args?: any)
        boxSelectionEnabled(args?: any)
        width(args?: any)
        height(args?: any)
        extent(args?: any)
        autolock(args?: any)
        autoungrabify(args?: any)
        autounselectify(args?: any)
        forceRender(args?: any)
        resize(args?: any)

        // Animation
        animated(args?: any)
        animate(args?: any)
        animation(args?: any)
        delay(args?: any)
        delayAnimation(args?: any)
        stop(args?: any)
        clearQueue(args?: any)

        // Layout
        layout(args?: any)

        // Style
        style(args?: any)

        // Export
        png(args?: any)
        jpg(args?: any)
        json(args?: any)
    }
}