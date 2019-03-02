! function () {
  var view = document.querySelector('section.message')

  var model = {
    //获取数据
    init: function(){
      var APP_ID = 'PllXfBxCtEhV2ddWHcWsHJTq-gzGzoHsz'
      var APP_KEY = '68oRRncmKCc14JsXXPoJiyaj'
    
      AV.init({ appId: APP_ID,appKey: APP_KEY });
    },
    // 获取数据
    fetch: function(){
      var query = new AV.Query('Message');
      return query.find()   // Pormise对象
    }, 
    // 创建数据
    save: function(name, content){
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({   // Pormise对象
        'name': name,
        'content': content
      })
    }
  }

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function(view){
      this.view = view
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('#postMessageForm')
      this.model = model
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function(){
      this.model.fetch().then(
          (messages)=> {
            let array = messages.map((item) => item.attributes)
            array.forEach((item) => {
              let li = document.createElement('li')
              li.innerText = `${item.name}: ${item.content}`
              this.messageList.appendChild(li)
            })
          },
          (error)=> {
            alert('提交失败，请改天来留言')
            // 异常处理
          })
      },
      bindEvents: function(){
        this.form.addEventListener('submit', function (e) {
          e.preventDefault()
          this.saveMessage()
        }.bind(this))
      },
      saveMessage: function(){
        let myForm = this.form
        let content = myForm.querySelector('input[name=content]').value
        let name = myForm.querySelector('input[name=name]').value
        this.model.save(name, content).then(function (object) {
          let li = document.createElement('li')
          li.innerText = `${object.attributes.name}: ${object.attributes.content}`
          let messageList = document.querySelector('#messageList')
          messageList.appendChild(li)
          myForm.querySelector('input[name=content]').value = ''
        })
      }
  }
  controller.init(view, model)

}.call()