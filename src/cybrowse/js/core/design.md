

render(container, createApp){
  createApp(container,renderView){
    renderView(getManager(),renderView2){
      renderView2(container,manager,getData){
        getData(data, render) {
          render(container, data, eventBind) {
            Promise.resolve()
            .then render toolbar data
            .then render aside, data
            .then render content, data
            .then eventBind toolbar aside content
          }
        }
      }
    }
  }
}

onClick<-paint<-container<-manager<-data&&config
    app(){
      def manager
      def data
      def config
      def context=base
      def compute = (data, config, context, observer, cb)=>{
        new app2(data,config,context,observer)
      }
      compute(data,config,manager)
    }
    app2(){
      def computedData(data(),config())

    }
